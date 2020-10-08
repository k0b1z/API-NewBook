import express from 'express';
import UsuarioController from './UsuarioController'
import UsuarioMiddleware from './UsuarioMiddleware'
import UsuarioRepository from './UsuarioRepository'
import { client } from '../config'

export default function defineUsuarioRouter() {

  const usuarioRepository = new UsuarioRepository(client);
  const usuarioController = new UsuarioController(usuarioRepository)
  const usuarioMiddleware = new UsuarioMiddleware(usuarioRepository)

  const router = express.Router();

  router.route('/')
    .get((req, res) => usuarioController.index(req, res))
    .post((req, res) => usuarioController.save(req, res))

  router.route('/:id')
    .all((req, res, next) => usuarioMiddleware.usuarioExiste(req, res, next))
    .get((req, res) => usuarioController.show(req, res))
    .put((req, res) => usuarioController.update(req, res))
    .delete((req, res) => usuarioController.delete(req, res))

  return router;
}