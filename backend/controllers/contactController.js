require('dotenv').config();
const axios = require('axios');
const nodemailer = require('nodemailer');

// --- Transporter SendGrid ---
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey', // siempre "apikey"
    pass: process.env.SENDGRID_API_KEY
  }
});

// Verifica conexión con el SMTP al iniciar
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error con el transporter:', error);
  } else {
    console.log('✅ Transporter listo para enviar correos');
  }
});

exports.sendContactEmail = async (req, res) => {
  console.log('📥 Petición recibida en /api/contact');
  console.log('📩 Datos recibidos:', req.body);
  const { name, email, subject, message, token } = req.body;

  if (!name || !email || !subject || !message || !token) {
    console.warn('⚠️ Faltan campos o token reCAPTCHA');
    return res.status(400).json({ error: 'Todos los campos y reCAPTCHA son requeridos.' });
  }

  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );
    console.log('📡 Google verify response:', response.data);
    if (!response.data.success) {
      console.error('❌ reCAPTCHA fallido:', response.data['error-codes']);
      return res.status(400).json({ error: 'reCAPTCHA fallido' });
    }
  } catch (err) {
    console.error('❌ Error verificando reCAPTCHA:', err);
    return res.status(500).json({ error: 'Error en verificación de reCAPTCHA' });
  }

  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL,
      subject: `Contacto desde web: ${subject}`,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje:\n${message}`,
    };
      await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email enviado correctamente.' });
  } catch (err) {
    console.error('❌ Error al enviar correo con SendGrid:', err);
    return res.status(500).json({ error: 'Error enviando correo.' });
  }
};