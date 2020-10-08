import { v4 as uuidv4 } from 'uuid';

export default class Loja {
  constructor(nome, endereco, telefone, id  = uuidv4()) {
    this.id = id;
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.deletedAt = null;
  }
}