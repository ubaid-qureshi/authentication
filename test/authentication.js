const express = require('express');

const router = express.Router();
const Authentication = require('../../controller/Authentication');

router.post('/',
  async (req, res, next) => {
    Authentication.create(req.body)
      .then((response) => {
        _handleResponse({
          res,
          statusCode: 200,
          ...(response && { response }),
        });
      })
      .catch((err) => next(err));
  });
router.get('/:id',
  async (req, res, next) => {
    Authentication.getOne(req.params.id)
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
    Authentication.getAllByQuery()
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
    Authentication.updateOne(req.params.id, req.body)
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
    Authentication.deleteOne(req.params.id)
      .then((response) => {
        _handleResponse({
          res,
          statusCode: 200,
          ...(response && { response }),
        });
      })
      .catch((err) => next(err));
  });

module.exports = router;
