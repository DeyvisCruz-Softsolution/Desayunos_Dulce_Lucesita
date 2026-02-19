const { Product } = require('../models');
const cloudinary = require('../config/cloudinary');

exports.createProduct = async (req, res) => {
  try {
    let imageUrl = null;

    console.log('📩 Solicitud recibida para crear producto:', req.body);
    console.log('📦 req.file:', req.file);

    if (req.file) {
      console.log('📷 Archivo recibido. Iniciando subida a Cloudinary...');
    
      const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'dulce-lucesita' },
            (error, result) => {
              if (error) {
                console.error('❌ Error al subir a Cloudinary:', error);
                return reject(error);
              }
              console.log('✅ Imagen subida correctamente:', result.secure_url);
              resolve(result.secure_url);
            }
          );
          stream.end(fileBuffer);
        });
      };

      imageUrl = await streamUpload(req.file.buffer);
    } else {
      console.warn('⚠️ No se recibió ningún archivo en la solicitud.');
    }

    console.log('🖼️ URL final de la imagen:', imageUrl);

    const product = await Product.create({ ...req.body, imageUrl });
    console.log('✅ Producto creado exitosamente:', product);

    res.status(201).json(product);
  } catch (error) {
    console.error('❌ Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    console.log('📥 Solicitando todos los productos...');
    const products = await Product.findAll();
    console.log('📦 Productos obtenidos:', products);
    res.json(products);
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.findAll({ where: { category } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar productos' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
  
};
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    console.log('✏️ Intentando actualizar producto ID:', id);
    console.log('📦 Datos recibidos:', updates);
    console.log('📷 Archivo recibido:', req.file);

    // Si hay una nueva imagen, súbela a Cloudinary
    let imageUrl;
    if (req.file) {
      console.log('📤 Subiendo nueva imagen a Cloudinary...');
      const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'dulce-lucesita' },
            (error, result) => {
              if (error) {
                console.error('❌ Error al subir imagen:', error);
                return reject(error);
              }
              console.log('✅ Imagen subida correctamente:', result.secure_url);
              resolve(result.secure_url);
            }
          );
          stream.end(fileBuffer);
        });
      };
      imageUrl = await streamUpload(req.file.buffer);
      updates.imageUrl = imageUrl;
    }

    // Encuentra y actualiza el producto
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await product.update(updates);
    console.log('✅ Producto actualizado:', product);

    res.json({ message: 'Producto actualizado', product });
  } catch (error) {
    console.error('❌ Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};
