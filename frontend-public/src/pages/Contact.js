import React from 'react';
import ContactForm from '../components/ContactForm';
import { FaMapMarkerAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import './contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-left">
        <h2 className="contact-title">Contáctanos</h2>
        <p>¿Tienes preguntas, sugerencias o simplemente quieres saludar?
        Estamos encantados de escucharte.
        Puedes escribirnos a través del formulario, por WhatsApp o a nuestro correo electrónico.
        Te responderemos lo más pronto posible. 💌</p>
    <div className="contact-info">
      <p><FaEnvelope style={{ marginRight: '8px' }} /> Email: <a href="mailto:dulcelucecitastorevirtual@gmail.com">dulcelucecitastorevirtual@gmail.com</a></p>
      <p><FaWhatsapp style={{ marginRight: '8px' }} /> WhatsApp: <a href="https://wa.me/573202038908" target="_blank" rel="noopener noreferrer">+57 320 203 8908</a></p>
      <p><FaMapMarkerAlt style={{ marginRight: '8px' }} /> Dirección: Piedecuesta, Santander, Colombia</p>
    </div>
        <div className="contact-form">
          <ContactForm />
        </div>
      </div>

      <div className="contact-map">
        <iframe
          title="Ubicación Dulce Lucesita"
          src="https://maps.google.com/maps?q=Piedecuesta,%20Santander&t=p&z=15&output=embed"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
