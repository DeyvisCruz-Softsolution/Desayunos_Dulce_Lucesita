import React, { useState } from 'react';

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [generalDescription, setGeneralDescription] = useState('');
  const [contents, setContents] = useState([]);
  const [newContent, setNewContent] = useState('');
  const [price, setPrice] = useState(initialData.price || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [image, setImage] = useState(null);

  // Si hay una descripción preexistente, separarla en partes
  React.useEffect(() => {
    if (initialData.description) {
      const [general, ...rest] = initialData.description.split('\n\nContenido:\n');
      setGeneralDescription(general.trim());
      if (rest.length > 0) {
        setContents(rest[0].split('\n').filter(line => line.trim() !== ''));
      }
    }
  }, [initialData.description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullDescription =
      generalDescription.trim() +
      (contents.length
        ? `\n\nContenido:\n${contents.map((item) => `- ${item}`).join('\n')}`
        : '');
    onSubmit({ title, description: fullDescription, price, category, image });
  };

  const handleAddContent = () => {
    if (newContent.trim()) {
      setContents([...contents, newContent.trim()]);
      setNewContent('');
    }
  };

  const handleRemoveContent = (index) => {
    const updated = contents.filter((_, i) => i !== index);
    setContents(updated);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Título"
        required
      />

      <textarea
        value={generalDescription}
        onChange={e => setGeneralDescription(e.target.value)}
        placeholder="Descripción general"
      />

      <div>
        <label><strong>Contenido del artículo:</strong></label>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            placeholder="Agregar sección de contenido"
          />
          <button type="button" onClick={handleAddContent}>Agregar</button>
        </div>
        <ul>
          {contents.map((content, index) => (
            <li key={index} style={{ marginBottom: '0.3rem' }}>
              {content}
              <button
                type="button"
                onClick={() => handleRemoveContent(index)}
                style={{ marginLeft: '0.5rem', color: 'red' }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <input
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
        placeholder="Precio"
        required
      />

      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      >
        <option value="">Selecciona una categoría</option>
        <option value="Todos">Todos</option>
        <option value="Aniversario">Aniversario</option>
        <option value="Mujer">Mujer</option>
        <option value="Hombre">Hombre</option>
        <option value="Infantiles">Infantiles</option>
        <option value="Personalizados">Personalizados</option>
        <option value="Velas">Velas</option>
        <option value="Decoraciones de eventos">Decoraciones de eventos</option>
        <option value="Bandejas Mix">Bandejas Mix</option>
      </select>

      <input
        type="file"
        onChange={e => setImage(e.target.files[0])}
      />

      <button type="submit">Guardar</button>
    </form>
  );
};

export default ProductForm;
