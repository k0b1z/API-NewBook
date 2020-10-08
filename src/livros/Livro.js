import { v4 as uuidv4 } from 'uuid';

export default class Livro {
  constructor(titulo, autor, isbn, preco, qtd, usuario, id  = uuidv4()) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.preco = preco;
    this.qtd = qtd;
    this.usuario = usuario;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.deletedAt = null;
  }
}