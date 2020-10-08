import express from 'express';
import LivroController from './LivroController'
import LivroMiddleware from './LivroMiddleware'
import LivroRepository from './LivroRepository'
import { client } from '../config'

export default function defineLivroRouter() {

  const livroRepository = new LivroRepository(client);
  const livroController = new LivroController(livroRepository)
  const livroMiddleware = new LivroMiddleware(livroRepository)

  const router = express.Router();

  router.route('/')
    .get((req, res) => livroController.index(req, res))
    .post((req, res) => livroController.save(req, res))

  router.route('/:id')
    .all((req, res, next) => livroMiddleware.livroExiste(req, res, next))
    .get((req, res) => livroController.show(req, res))
    .put((req, res) => livroController.update(req, res))
    .delete((req, res) => livroController.delete(req, res))

  router.route('/stock/:id')
    .put((req, res) => livroController.stock(req, res))

  return router;
}