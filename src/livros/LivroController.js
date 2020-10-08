import Livro from './Livro'

const livroViewModel = (livro) => ({
  id: livro.id,
  titulo: livro.titulo,
  autor: livro.autor,
  isbn: livro.isbn,
  preco: livro.preco,
  qtd: livro.qtd,
  usuario: livro.usuario
})

export default class LivroController {
  constructor(livroRepository) {
    this.livroRepository = livroRepository;
  }

  async index(req, res) {
    try {
      const livros = await this.livroRepository.getAll();
      res.status(200).json(livros.map(u => livroViewModel(u)));
    } catch (err) {
      res.status(400).json({ erro: 'Nenhum livro foi encontrado' });
    }
  }

  async save(req, res) {
    try {
      const { titulo, autor, isbn, preco, qtd, usuario } = req.body;
      const livro = new Livro(titulo, autor, isbn, preco, qtd, usuario);
      await this.livroRepository.save(livro)
      res.status(201).json(livroViewModel(livro));
    } catch(err) {
      res.status(400).json({ erro: 'O livro não foi cadastrado' });
    }
  }

  show(req, res) {
    try {
      return res.status(200).json(livroViewModel(req.livro));
    } catch (err) {
      res.status(400).json({ erro: 'O livro não foi encontrado' });
    }
  }

  async update(req, res) {
    try{
      const { titulo, autor, isbn, preco, qtd, usuario } = req.body;
      const livro = new Livro(titulo, autor, isbn, preco, qtd, usuario, req.livro.id);
      const livroAtualizado = await this.livroRepository.update(livro)  
      return res.status(200).json(livroViewModel(livroAtualizado));
    } catch (err) {
      res.status(400).json({ erro: 'O livro não foi atualizado' });
    }
  }

  async stock(req, res) {
    try {
      const { estoque, usuario } = req.body;
      const livro = await this.livroRepository.getById(req.params.id)
      livro.qtd = livro.qtd + estoque;
      livro.usuario = usuario;
      const livroAtualizado = await this.livroRepository.update(livro)  
      return res.status(200).json(livroViewModel(livroAtualizado));
    } catch(err) {
      res.status(400).json({ erro: 'O livro não foi atualizado' });
    }
  }
 
  async delete(req, res) {
    try {
      await this.livroRepository.delete(req.livro)
      res.status(204).end();
    } catch(err) {
      res.status(400).json({ erro: 'O livro não foi deletado' });
    }
  }
  
}