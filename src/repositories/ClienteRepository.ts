import pool from "../database/connections/database";

export class ClienteRepository {
  async create(nome: string, email: string, telefone: string, dataNascimento: Date) {
    const result = await pool.query(
      "INSERT INTO clientes (nome, email, telefone, data_nascimento) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, email, telefone, dataNascimento]
    );
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM clientes");
    return result.rows;
  }

  async update(id: number, novoNome: string, novoEmail: string, novoTelefone: string, novaDataNascimento: Date) {
    const result = await pool.query(
      "UPDATE clientes SET nome = $1, email = $2, telefone = $3, data_nascimento = $4 WHERE id = $5 RETURNING *",
      [novoNome, novoEmail, novoTelefone, novaDataNascimento, id]
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
