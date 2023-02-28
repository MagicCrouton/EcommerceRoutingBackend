const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  res.json(await Category.findAll({
    include: [{model: Product}]
  }))
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  res.json(await Category.findByPk(req.params.id , {
    include: [{model: Product}]
  }))
});

router.post('/', async (req, res) => {
  // create a new category
  let newCategory = await Category.create({
    category_name: req.body.category_name
  })
  res.json(newCategory)
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
