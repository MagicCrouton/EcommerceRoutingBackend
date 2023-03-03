const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  await Category.findAll({
    include: [{model: Product}]
  })
  .then((catdata) => {
    res.json(catdata)
  })
  .catch((err) => {
    res.json(err)
  })
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  await Category.findByPk(req.params.id , {
    include: [{model: Product}]
  })
  .then((catdata) => {
    res.json(catdata)
  })
  .catch((err) => {
    res.json(err)
  })
});

router.post('/', async (req, res) => {
  // create a new category
  await Category.create({
    category_name: req.body.category_name
  })
  .then((createData) => {
    res.json(createData)
  })
  .catch((err) => res.json(err));
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      category_id: req.params.id
    }
  })
  .then((update) => {
    res.json(update);
  })
  .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  await Category.destroy({
    where:{
      category_id: req.params.id
    }
  })
  .then((deletedCat) => {
    res.json(deletedCat)
  })
  .catch((err) => res.json(err));
});

module.exports = router;
