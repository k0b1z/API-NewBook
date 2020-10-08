import Usuario from './Usuario'

const usuarioViewModel = (usuario) => ({
  id: usuario.id,
  nome: usuario.nome,
  email: usuario.email,
  loja: usuario.loja,
  senha: usuario.senha
})

export default class UsuarioController {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async index(req, res) {
    try {
      const usuarios = await this.usuarioRepository.getAll();
      res.status(200).json(usuarios.map(u => usuarioViewModel(u)));
    } catch (err) {
      res.status(400).json({ erro: 'Nenhum usuário foi encontrada' });
    }
  }

  async save(req, res) {
    try {
      console.log(req.body)
      const { nome, email, loja, senha } = req.body;
      const usuario = new Usuario(nome, email, loja, senha);
      await this.usuarioRepository.save(usuario)
      res.status(201).json(usuarioViewModel(usuario));
    } catch (err) {
      res.status(400).json({ erro: 'O usuário não foi cadastrado' });
    }
  }

  show(req, res) {
    try {
      return res.status(200).json(usuarioViewModel(req.usuario));
    } catch (err) {
      res.status(400).json({ erro: 'O usuário não foi encontrado' });
    }
  }

  async update(req, res) {
    try {
      const { nome, email, loja, senha } = req.body;
      const usuario = new Usuario(nome, email, loja, senha, req.usuario.id);
      const usuarioAtualizado = await this.usuarioRepository.update(usuario)  
      return res.status(200).json(usuarioViewModel(usuarioAtualizado));
    } catch (err) {
      res.status(400).json({ erro: 'O usuário não foi atualizado' });
    }
  }

  async delete(req, res) {
    try {
      await this.usuarioRepository.delete(req.usuario)
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ erro: 'O usuário não foi deletado' });
    }
  }
}