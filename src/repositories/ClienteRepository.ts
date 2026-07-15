import pool from "../database/connections/database";

export class ClienteRepository {
  async create(nome: string) {
    const result = await pool.query(
      "INSERT INTO clientes (nome) VALUES ($1) RETURNING *",
      [nome]
    );
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM clientes");
    return result.rows;
  }

  async update(id: number, novoNome: string) {
    const result = await pool.query(
      "UPDATE clientes SET nome = $1 WHERE id = $2 RETURNING *",
      [novoNome, id]
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
