export default class LivroMiddleware {
  constructor(livroRepository) {
    this.livroRepository = livroRepository;
  }

  async livroExiste(req, res, next) {
    const livro = await this.livroRepository.getById(req.params.id)
    
    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }
    req.livro = livro;
    next();
  }
}