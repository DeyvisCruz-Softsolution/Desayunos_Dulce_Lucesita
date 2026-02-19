import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../services/profileService';
import { Link } from 'react-router-dom';
import '../pages/ProfilePage.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar el perfil');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(profile);
      setMessage('✅ Perfil actualizado correctamente.');
    } catch (err) {
      console.error(err);
      setError('❌ Error al actualizar el perfil.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>Mi perfil</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Nombre completo" required />
          <input type="email" name="email" value={profile.email} disabled />
          <input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="Teléfono" required />
          <input type="text" name="address" value={profile.address} onChange={handleChange} placeholder="Dirección" required />
          <input type="text" name="city" value={profile.city} onChange={handleChange} placeholder="Ciudad" required />
          <button type="submit">Guardar cambios</button>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
              <Link to="/order-history" className="order-history-button">
        🧾 Ver historial de compras
      </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
