CREATE TABLE lojas (
 "id" UUID NOT NULL,
 "nome" VARCHAR(100) NOT NULL,
 "endereco" VARCHAR(100) NOT NULL,
 "telefone" VARCHAR(100) NOT NULL,
 "createdAt" TIMESTAMP NOT NULL,
 "updatedAt" TIMESTAMP NOT NULL,
 "deletedAt" TIMESTAMP,
 PRIMARY KEY("id")
);

CREATE TABLE usuarios (
 "id" UUID NOT NULL,
 "nome" VARCHAR(100) NOT NULL,
 "email" VARCHAR(100) NOT NULL,
 "loja"  UUID NOT NULL,
 "senha" TEXT NOT NULL,
 "createdAt" TIMESTAMP NOT NULL,
 "updatedAt" TIMESTAMP NOT NULL,
 "deletedAt" TIMESTAMP,
 PRIMARY KEY("id"),
 FOREIGN KEY(loja) REFERENCES lojas(id)
);

CREATE TABLE livros (
 "id" UUID NOT NULL,
 "titulo" VARCHAR(100) NOT NULL,
 "autor" VARCHAR(100) NOT NULL,
 "isbn" VARCHAR(100) NOT NULL,
 "preco" VARCHAR(100) NOT NULL,
 "qtd" INT NOT NULL,
 "usuario" UUID NOT NULL,
 "createdAt" TIMESTAMP NOT NULL,
 "updatedAt" TIMESTAMP NOT NULL,
 "deletedAt" TIMESTAMP,
 PRIMARY KEY("id"),
 FOREIGN KEY(usuario) REFERENCES usuarios(id)
);





