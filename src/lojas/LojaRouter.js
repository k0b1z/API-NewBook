import express from 'express';
import LojaController from './LojaController'
import LojaMiddleware from './LojaMiddleware'
import LojaRepository from './LojaRepository'
import { client } from '../config'

export default function defineLojaRouter() {

  const lojaRepository = new LojaRepository(client);
  const lojaController = new LojaController(lojaRepository)
  const lojaMiddleware = new LojaMiddleware(lojaRepository)

  const router = express.Router();

  router.route('/')
    .get((req, res) => lojaController.index(req, res))
    .post((req, res) => lojaController.save(req, res))

  router.route('/:id')
    .all((req, res, next) => lojaMiddleware.lojaExiste(req, res, next))
    .get((req, res) => lojaController.show(req, res))
    .put((req, res) => lojaController.update(req, res))
    .delete((req, res) => lojaController.delete(req, res))

  return router;
}