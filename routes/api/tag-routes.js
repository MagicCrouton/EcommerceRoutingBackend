const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  await Tag.findAll({
    include: [{
      model: Product
    }]})
    .then((tagData) => {
      res.json(tagData)
    })
    .catch((err) => {
      res.json(err)
    })
  });

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  await Tag.findByPk(req.params.id, {
    include: [{
      model: Product
    }]})
    .then((tagData) => {
      res.json(tagData)
    })
    .catch((err) => {
      res.json(err)
    })
});

router.post('/', async (req, res) => {
  // create a new tag
  await Tag.create(req.body)
  .then((tagCreate) => {
    res.json(tagCreate)
  })
  .catch((err)=> {
    res.json(err)
  })
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  await Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      tag_id: req.params.id
    }
  })
  .then((newTag) => {
    res.json(newTag)
  })
  .catch((err) => res.json(err))
});

router.delete('/:id', async (req, res) => {
  await Tag.destroy({
    where: {tag_id: req.params.id}
  })
  .then((deletedTag) => {
    res.json(`deleted Tag`)
  })
  .catch((err) => {
    res.json(err)
  })
});

module.exports = router;
