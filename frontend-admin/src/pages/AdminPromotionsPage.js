// frontend/src/pages/AdminPromotionsPage.js
import React, { useEffect, useState } from 'react';
import {
  getPromotions,
  createPromotion,
  deletePromotion,
  updatePromotion,
  togglePromotionActive
} from '../services/promotionService';
import PromotionItem from '../components/PromotionItem';
import '../pages/Styles/adminPromotions.css';

const AdminPromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [form, setForm] = useState({ title: '', message: '', imageUrl: '' });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      const data = await getPromotions();
      setPromotions(data);
    } catch {
      setError('Error al cargar promociones');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.message) {
      setError('Título y mensaje son obligatorios');
      return;
    }

    try {
      const payload = { ...form, file };
      if (editingId) {
        await updatePromotion(editingId, payload);
      } else {
        await createPromotion(payload);
      }

      setForm({ title: '', message: '', imageUrl: '' });
      setFile(null);
      setEditingId(null);
      fetchPromos();
    } catch (err) {
      setError('Error al guardar la promoción');
    }
  };

  const handleEdit = (promo) => {
    setForm({
      title: promo.title,
      message: promo.message,
      imageUrl: promo.imageUrl
    });
    setEditingId(promo.id);
    setFile(null); // no se vuelve a cargar el archivo
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta promoción?')) {
      await deletePromotion(id);
      fetchPromos();
    }
  };

  const handleToggle = async (id, isActive) => {
    await togglePromotionActive(id, isActive);
    fetchPromos();
  };

  return (
    <div className="admin-promotions-container">
      <h2>🎉 Gestión de Promociones</h2>

      <form className="promotion-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título de la promoción"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Mensaje de la promoción"
          value={form.message}
          onChange={handleChange}
          rows={3}
        />
        <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
        <button type="submit">{editingId ? 'Actualizar' : 'Crear promoción'}</button>
        {error && <p className="error">{error}</p>}
      </form>

      <div className="promotion-list">
        {promotions.length === 0 ? (
          <p>No hay promociones registradas.</p>
        ) : (
          promotions.map((promo) => (
            <PromotionItem
              key={promo.id}
              promo={promo}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPromotionsPage;
