export default class LojaRepository {
  constructor(client) {
    this.client = client;
  }

  async getAll() {
    return await this.client('lojas');
  }

  async save(loja) {
    const [firstRow] = await this.client('lojas')
      .insert(loja)
      .returning("*") 
    return firstRow;
  }

  async getById(id) {
    return await this.client('lojas')
      .where({ 'id': id })
      .first()
  }

  async update(loja) {
    const [firstRow] = await this.client('lojas')
      .where({ 'id': loja.id })
      .update({
        nome: loja.nome,
        endereco: loja.endereco,
        telefone: loja.telefone,
        updatedAt: new Date().toISOString(),
      })
      .returning("*") 
    return firstRow;
  }

  async delete(loja) {
    await this.client('lojas')
      .where('id', loja.id)
      .del()
  }
}