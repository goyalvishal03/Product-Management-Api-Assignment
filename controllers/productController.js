const { Op } = require('sequelize');
const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Name, price, and category are required' });
    }
    const product = await Product.create({ name, price, description, category });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    const whereClause = search
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { category: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      items: rows,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const { name, price, description, category } = req.body;
    await product.update({ name, price, description, category });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
