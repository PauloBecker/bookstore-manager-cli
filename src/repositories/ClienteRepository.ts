import pool from "../database/connections/database";

export class ClienteRepository {
  async create(nome: string, nacionalidade: string, dataNascimento: Date) {
    const result = await pool.query(
      "INSERT INTO clientes (nome, nacionalidade, data_nascimento) VALUES ($1, $2, $3) RETURNING *",
      [nome, nacionalidade, dataNascimento]
    );
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM clientes");
    return result.rows;
  }

  async update(id: number, novoNome: string, novaNacionalidade: string, novaDataNascimento: Date) {
    const result = await pool.query(
      "UPDATE clientes SET nome = $1, nacionalidade = $2, data_nascimento = $3 WHERE id = $4 RETURNING *",
      [novoNome, novaNacionalidade, novaDataNascimento, id]
    );
    return result.rows[0];
  }

  async delete(id: number) {
    await pool.query("DELETE FROM clientes WHERE id = $1", [id]);
  }

  async clienteExiste(id: number): Promise<boolean> {
    const result = await pool.query("SELECT 1 FROM clientes WHERE id = $1", [id]);
    return (result?.rowCount ?? 0) > 0;
  }
}
