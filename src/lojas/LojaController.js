import Loja from './Loja'

const lojaViewModel = (loja) => ({
  id: loja.id,
  nome: loja.nome,
  endereco: loja.endereco,
  telefone: loja.telefone
})

export default class LojaController {
  constructor(lojaRepository) {
    this.lojaRepository = lojaRepository;
  }

  async index(req, res) {
    try {
      const lojas = await this.lojaRepository.getAll();
      res.status(200).json(lojas.map(u => lojaViewModel(u)));
    } catch(err) {
      res.status(400).json({ erro: 'Nenhuma loja foi encontrada' });
    }
  }

  async save(req, res) {
    try{
      console.log(req.body)
      const { nome, endereco, telefone } = req.body;
      const loja = new Loja(nome, endereco, telefone);
      await this.lojaRepository.save(loja)
      res.status(201).json(lojaViewModel(loja));
    } catch (err) {
      res.status(400).json({ erro: 'A loja não foi cadastrada' });
    }
  }

  show(req, res) {
    try {
      return res.status(200).json(lojaViewModel(req.loja));
    } catch (err) {
      res.status(400).json({ erro: 'A loja não foi encontrada'});
    }
  }

  async update(req, res) {
    try {
      const { nome, endereco, telefone } = req.body;
      const loja = new Loja(nome, endereco, telefone, req.loja.id);
      const lojaAtualizado = await this.lojaRepository.update(loja)  
      return res.status(200).json(lojaViewModel(lojaAtualizado));
    } catch (err) {
      res.status(400).json({ erro: 'A loja não foi atualizada' });
    }
  }
 
  async delete(req, res) {
    try {
      await this.lojaRepository.delete(req.loja)
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ erro: 'A loja não foi deletada' });
    }
  }
}