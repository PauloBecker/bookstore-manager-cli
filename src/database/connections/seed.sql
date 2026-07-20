

INSERT INTO autores (nome, nacionalidade, data_nascimento)
VALUES 
  ('Machado de Assis', 'Brasileiro', '1839-06-21'),
  ('Clarice Lispector', 'Brasileira', '1920-12-10'),
  ('George Orwell', 'Britânico', '1903-06-25');


INSERT INTO livros (titulo, ano_publicacao, quantidade, autor_id)
VALUES
  ('Dom Casmurro', 1899, 5, 1),
  ('A Hora da Estrela', 1977, 3, 2),
  ('1984', 1949, 4, 3);


INSERT INTO clientes (nome, email, telefone)
VALUES
  ('Paulo Becker', 'paulo@example.com', '48999999999'),
  ('Maria Silva', 'maria@example.com', '48988888888'),
  ('João Souza', 'joao@example.com', '48977777777');


INSERT INTO emprestimos (livro_id, cliente_id, data_emprestimo)
VALUES
  (1, 1, CURRENT_DATE),
  (2, 2, CURRENT_DATE),
  (3, 3, CURRENT_DATE);

ALTER TABLE clientes ADD COLUMN data_nascimento DATE;

ALTER TABLE autores ADD COLUMN criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE autores ADD COLUMN atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE autores DROP COLUMN data_nascimento;
<<<<<<< HEAD

ALTER TABLE emprestimos
ADD COLUMN criado_em TIMESTAMP DEFAULT NOW(),
ADD COLUMN atualizado_em TIMESTAMP DEFAULT NOW();

CREATE OR REPLACE FUNCTION atualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_atualizar_timestamp
BEFORE UPDATE ON emprestimos
FOR EACH ROW
EXECUTE FUNCTION atualizar_timestamp();
=======
>>>>>>> 77f2e2cb2a7106409a51439c923cc3039a846406
