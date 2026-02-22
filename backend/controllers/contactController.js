require('dotenv').config();
const axios = require('axios');

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

  // ✅ Ya no enviamos correo desde el backend
  return res.status(200).json({ message: 'reCAPTCHA validado correctamente.' });
};