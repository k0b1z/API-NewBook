export default class LojaMiddleware {
  constructor(lojaRepository) {
    this.lojaRepository = lojaRepository;
  }

  async lojaExiste(req, res, next) {
    const loja = await this.lojaRepository.getById(req.params.id)
    
    if (!loja) {
      return res.status(404).json({ erro: 'Loja não encontrada' });
    }
    req.loja = loja;
    next();
  }
}