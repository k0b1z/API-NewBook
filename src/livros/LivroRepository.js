export default class LivroRepository {
  constructor(client) {
    this.client = client;
  }

  async getAll() {
    return await this.client('livros');
  }

  async save(livro) {
    const [firstRow] = await this.client('livros')
      .insert(livro)
      .returning("*") 
    return firstRow;
  }

  async getById(id) {
    return await this.client('livros')
      .where({ 'id': id })
      .first()
  }

  async update(livro) {
    const [firstRow] = await this.client('livros')
      .where({ 'id': livro.id })
      .update({
          titulo: livro.titulo,
          autor: livro.autor,
          isbn: livro.isbn,
          preco: livro.preco,
          qtd: livro.qtd,
          usuario: livro.usuario,
          updatedAt: new Date().toISOString(),
      })
      .returning("*") 
    return firstRow;
  }

  async delete(livro) {
    await this.client('livros')
      .where('id', livro.id)
      .del()
  }
}