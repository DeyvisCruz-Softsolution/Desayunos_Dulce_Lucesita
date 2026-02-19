import React, { useState } from 'react';

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [price, setPrice] = useState(initialData.price || '');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, price, image });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" />
      <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Precio" required />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ProductForm;
