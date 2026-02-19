import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Logo dinámico antes de las cards */}
      <div className="logo-container">
        <img src="/fondort.png" alt="Dulce Lucesita" className="logo-image" />
      </div>

      <h2 className="about-title">Sobre Nosotros</h2>

      {/* Contenedor de cards con diseño horizontal */}
      <div className="about-cards">
        <div className="about-card">
          <h3>📜 Historia</h3>
          <p>
            En 2017, nació Dulce Lucesita, originalmente conocida como Lobe Boxes, en el departamento de Arauca.
            La idea surgió al identificar una oportunidad única en el mundo de los regalos personalizados: crear
            experiencias memorables a través de detalles cuidadosamente diseñados.
            Con el paso del tiempo y un crecimiento sostenido, la sede principal se trasladó a Santander, específicamente
            en Piedecuesta. Este cambio estratégico permitió ampliar la presencia de la marca y mejorar la logística 
            para atender a más clientes.
            Hoy en día, Dulce Lucesita opera de manera virtual, ofreciendo una amplia variedad de productos personalizados,
            desde desayunos sorpresa hasta velas artesanales y decoraciones exclusivas. Con un enfoque en la calidad y la 
            creatividad, la marca se ha convertido en un referente en el mundo de los regalos emocionales y experiencias inolvidables.
            💖 Cada detalle es pensado para iluminar momentos especiales, reflejando el espíritu innovador que ha caracterizado a Dulce 
            Lucesita desde su creación.
          </p>
        </div>

        <div className="about-card">
          <h3>🎯 Misión</h3>
          <div>
            <p>En Dulce Lucesita, nos comprometemos a transformar momentos cotidianos en experiencias inolvidables a través de regalos personalizados.
            Creemos en la magia de los detalles y en la capacidad de cada obsequio para transmitir emociones auténticas.</p>
            <p>Nuestra misión es brindar productos únicos, cuidadosamente diseñados para alegrar corazones, fomentar conexiones significativas y hacer que cada celebración sea especial. Nos enfocamos en: </p>
            <ul>
              <li>✅ Calidad artesanal, garantizando que cada detalle refleje cuidado y dedicación.</li>
              <li>✅ Personalización, creando obsequios únicos que se adapten a los gustos y emociones de cada persona.</li>
              <li>✅ Experiencia emocional, haciendo que el proceso de selección y entrega sea un momento especial tanto para quien regala como para quien recibe.</li>
            </ul>
            <p>Cada creación en Dulce Lucesita es más que un regalo; es un símbolo de amor, gratitud y alegría.</p>
          </div>
        </div>

        <div className="about-card">
          <h3>🚀 Visión</h3>
          <div>
            <p>Nos proyectamos como líderes en el mercado de regalos personalizados, estableciendo un estándar de excelencia en cada producto y servicio.
            Queremos que Dulce Lucesita sea una marca reconocida por su innovación, creatividad y el impacto emocional que genera en las personas.
            Aspiramos a: </p>
            <ul>
              <li>✅ Expandir nuestra presencia digital, alcanzando clientes en todo el país con una plataforma intuitiva y amigable.</li>
              <li>✅ Mejorar continuamente nuestra oferta, integrando nuevas tendencias en decoración, packaging y experiencias interactivas.</li>
              <li>✅ Crear alianzas estratégicas con diseñadores, artesanos y emprendedores locales para enriquecer nuestra variedad de productos.</li>
              <li>✅ Impulsar una comunidad donde las personas compartan sus historias y emociones a través de nuestros regalos.</li>
            </ul>
           <p> Queremos que cada detalle de Dulce Lucesita se convierta en una experiencia inolvidable que celebre la esencia de cada ocasión especial.</p>
          </div>
        </div>

        <div className="about-card">
          <h3>💳 Pagos y Envíos</h3>
          <div className='about-card-formas-pago'>
            <ul>
            <li>Aceptamos múltiples formas de pago y garantizamos entregas seguras. 
              El pago se puede realizar pago total o un 30% antes de la entrega, 
              en la cual se puede pagar en efectivo o con transferencia bancaria; 
              el saldo restante se paga al recibir el pedido.
              Todos los pedidos se procesan en un máximo de 48 horas. El cliente
              cubre los costos de envío, que varían según la ubicación. 
              Ofrecemos envíos nacionales.
            </li>
            <li>Para pedidos personalizados, el cliente debe comunicarse vía WhatsApp para 
              proporcionar datos de personalización, acuerdo y manera de pago y una dirección de entrega.
            </li>
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
