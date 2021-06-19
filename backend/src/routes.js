const express = require('express');

const StoreController = require('./controllers/StoreController');
const ProductController = require('./controllers/ProductController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/session', SessionController.create);

routes.get('/store', StoreController.index);
routes.post('/store', StoreController.create);


routes.get('/profile', ProfileController.index);

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.create);
routes.delete('/products/:id', ProductController.delete);

module.exports = routes;