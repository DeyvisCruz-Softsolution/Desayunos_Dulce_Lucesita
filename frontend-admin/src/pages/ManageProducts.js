import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { deleteProduct } from '../services/productService';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error al cargar productos', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Estás seguro que deseas eliminar este producto?');
    if (!confirm) return;

    try {
      await deleteProduct(id);
      fetchProducts(); // Recargar productos después de eliminar
    } catch (err) {
      console.error('Error al eliminar producto', err);
    }
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <Link to="/products/add">
        <button>Agregar Producto</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.available ? 'Sí' : 'No'}</td>
              <td>
                <Link to={`/products/edit/${p.id}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
