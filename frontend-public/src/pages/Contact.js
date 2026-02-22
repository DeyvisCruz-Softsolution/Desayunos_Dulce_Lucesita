// src/pages/Contact.js
import React from 'react';
import ContactForm from '../components/ContactForm';
import { FaMapMarkerAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import './contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Lado izquierdo: Formulario y contacto */}
      <div className="contact-left">
        <h2 className="contact-title">Contáctanos</h2>
        <p>
          ¿Tienes preguntas, sugerencias o simplemente quieres saludar? Estamos encantados de escucharte.
          Puedes escribirnos a través del formulario, por WhatsApp o a nuestro correo electrónico.
          Te responderemos lo más pronto posible. 💌
        </p>

        <div className="contact-info">
          <p>
            <FaEnvelope style={{ marginRight: 8 }} /> Email:{' '}
            <a href="mailto:dulcelucecitastorevirtual@gmail.com">
              dulcelucecitastorevirtual@gmail.com
            </a>
          </p>
          <p>
            <FaWhatsapp style={{ marginRight: 8 }} /> WhatsApp:{' '}
            <a
              href="https://wa.me/573202038908"
              target="_blank"
              rel="noopener noreferrer"
            >
              +57 320 203 8908
            </a>
          </p>
          <p>
            <FaMapMarkerAlt style={{ marginRight: 8 }} /> Dirección: Piedecuesta, Santander, Colombia
          </p>
        </div>

        <div className="contact-form">
          <ContactForm />
        </div>
      </div>

      {/* Lado derecho: Mapa */}
      <div className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7918.235421886169!2d-73.11706190000001!3d7.1123552999999955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sco!4v1771722430082!5m2!1ses-419!2sco"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de Dulce Lucecita"
        ></iframe>

        {/* Opcional: botones de apertura externa */}
        <div className="map-buttons" style={{ marginTop: 10 }}>
          <a
            href="https://www.google.com/maps/search/?api=1&query=7.1123552999999955,-73.11706190000001"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: 10 }}
          >
            📍 Abrir en Google Maps
          </a>
          <a
            href="https://waze.com/ul?ll=7.1123552999999955,-73.11706190000001&navigate=yes"
            target="_blank"
            rel="noopener noreferrer"
          >
            🚗 Abrir en Waze
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;