import React, { useEffect, useState } from 'react';
import {
  fetchProducts,
  fetchProductsByCategory,
} from '../services/productService';
import ProductModal from '../components/ProductModal';
import './shop.css';



const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [category, setCategory] = useState('');
  const [categories] = useState([
"Todos",
"Aniversario",
"Mujer",
"Hombre",
"Infantiles",
"Personalizados",
"Velas",
"Decoraciones de eventos",
"Bandejas Mix"
  ]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (category && category !== 'Todos') {
          const filtered = await fetchProductsByCategory(category);
          setProducts(filtered);
        } else {
          const all = await fetchProducts();
          setProducts(all);
        }
      } catch (err) {
        console.error('Error al cargar productos:', err);
      }
    };

    loadProducts();
  }, [category]);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="shop">
      <h2>Productos disponibles</h2>

      {/* Selector de categoría */}
      <div className="category-selector">
        <label>Filtrar por categoría: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Grilla de productos */}
      <div className="product-grid">
        {products.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() => openModal(product)}
          >
            <img src={product.imageUrl} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button
    className="view-button"
    onClick={(e) => {
      e.stopPropagation(); // Para evitar que se dispare el onClick del contenedor
      openModal(product);
    }}
  >
    Ver más
  </button>
</div>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={closeModal} />}
    </div>
  );
};

export default Shop;
