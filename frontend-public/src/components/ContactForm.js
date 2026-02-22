// src/components/ContactForm.js
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';
import API from '../services/api';
import '../pages/contact.css';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [captchaToken, setCaptchaToken] = useState('');
  const [status, setStatus] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleCaptcha = token => setCaptchaToken(token);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!captchaToken) {
      setStatus({ error: 'Por favor verifica que no eres un robot.' });
      return;
    }

    try {
      // 1️⃣ Validar reCAPTCHA en backend
      await API.post('/contact', { ...form, token: captchaToken });

      // 2️⃣ Enviar correo con EmailJS
      const emailParams = {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      };

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        emailParams,
        process.env.REACT_APP_EMAILJS_USER_ID
      );

      setStatus({ success: 'Mensaje enviado correctamente, muchas gracias.' });
      setForm({ name: '', email: '', subject: '', message: '' });
      setCaptchaToken('');

    } catch (err) {
      console.error('❌ Error enviando formulario:', err);
      setStatus({ error: 'Ocurrió un error. Por favor inténtalo más tarde.' });
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre*" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Correo electrónico*" value={form.email} onChange={handleChange} required />
      <input name="subject" placeholder="Asunto*" value={form.subject} onChange={handleChange} required />
      <textarea name="message" placeholder="Mensaje*" rows="4" value={form.message} onChange={handleChange} required />

      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        onChange={handleCaptcha}
      />

      <button type="submit">Enviar mensaje</button>

      {status?.error && <p className="error-msg">{status.error}</p>}
      {status?.success && <p className="success-msg">{status.success}</p>}
    </form>
  );
};

export default ContactForm;