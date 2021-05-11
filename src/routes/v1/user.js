const express = require('express');

const router = express.Router();
const user = require('../../controller/User');

router.post('/',
  async (req, res, next) => {
    user.create(req.body)
      .then((response) => {
        _handleResponse({
          res,
          statusCode: 201,
          ...(response && { response }),
        });
      })
      .catch((err) => next(err));
  });
router.get('/:id',
  async (req, res, next) => {
    user.getOne(req.params.id)
      .then((response) => {
        _handleResponse({
          res,
          statusCode: 200,
          ...(response && { response }),
        });
      })
      .catch((err) => next(err));
  });
router.get('/',
  async (req, res, next) => {
    user.getAll()
      .then((response) => {
        _handleResponse({
          res,
          statusCode: 200,
          ...(response && { response }),
        });
      })
      .catch((err) => next(err));
  });
router.patch('/:id',
  async (req, res, next) => {
    user.updateOne(req.params.id, req.body)
      .then((response) => {
        _handleResponse({
          res,
          statusCode: 200,
          ...(response && { response }),
        });
      })
      .catch((err) => next(err));
  });
router.delete('/:id',
  async (req, res, next) => {
    user.deleteOne(req.params.id)
      .then((response) => {
        _handleResponse({
          res,
          statusCode: 204,
          ...(response && { response }),
        });
      })
      .catch((err) => next(err));
  });

module.exports = router;
