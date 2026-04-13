import React from 'react';

const KpiCard = ({ title, value, color }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff, #f5f7fa)',
      padding: '20px',
      borderRadius: '18px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
      borderLeft: `6px solid ${color}`,
      transition: 'transform 0.2s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <h4 style={{ color: '#666', fontSize: '14px' }}>{title}</h4>
      <h2 style={{ color: '#111', marginTop: '10px', fontSize: '26px' }}>
        {value}
      </h2>
    </div>
  );
};

export default KpiCard;