import express from 'express';
import cors from 'cors'
import defineLivroRouter from './livros/LivroRouter'
import defineUsuarioRouter from './usuarios/UsuarioRouter'
import defineLojaRouter from './lojas/LojaRouter'


export default function MyApp() {
  const app = express();
  
  app.use(cors());
  app.use(express.json())

  app.get('/', function(req, res) {
    res.send('Livraria Novo Mundo');
  });

  app.use('/livros', defineLivroRouter());
  app.use('/usuarios', defineUsuarioRouter());
  app.use('/lojas', defineLojaRouter());
  
  return app;
}
