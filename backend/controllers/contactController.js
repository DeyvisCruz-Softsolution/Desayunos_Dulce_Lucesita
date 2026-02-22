require('dotenv').config();
const axios = require('axios');
const sgMail = require('@sendgrid/mail');

// Configura la API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendContactEmail = async (req, res) => {
  console.log('📥 Petición recibida en /api/contact');
  console.log('📩 Datos recibidos:', req.body);
  const { name, email, subject, message, token } = req.body;

  if (!name || !email || !subject || !message || !token) {
    return res.status(400).json({ error: 'Todos los campos y reCAPTCHA son requeridos.' });
  }

  // Verificación reCAPTCHA
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
      return res.status(400).json({ error: 'reCAPTCHA fallido' });
    }
  } catch (err) {
    console.error('❌ Error verificando reCAPTCHA:', err);
    return res.status(500).json({ error: 'Error en verificación de reCAPTCHA' });
  }

  // Envío con SendGrid API
  const msg = {
    to: process.env.SENDER_EMAIL,
    from: process.env.SENDER_EMAIL,
    subject: `Contacto desde web: ${subject}`,
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje:\n${message}`,
  };

  try {
    await sgMail.send(msg);
    console.log('📤 Email enviado correctamente con SendGrid API');
    return res.status(200).json({ message: 'Email enviado correctamente.' });
  } catch (err) {
    console.error('❌ Error enviando correo con SendGrid API:', err);
    return res.status(500).json({ error: 'Error enviando correo.' });
  }
};