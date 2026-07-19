import pool from "../database/connections/database";

export class EmprestimoRepository {
  async create(livroId: number, clienteId: number) {
    const result = await pool.query(
      "INSERT INTO emprestimos (livro_id, cliente_id, data_emprestimo) VALUES ($1, $2, NOW()) RETURNING *",
      [livroId, clienteId]
    );
    // Atualiza quantidade de livros
    await pool.query("UPDATE livros SET quantidade = quantidade - 1 WHERE id = $1", [livroId]);
    return result.rows[0];
  }

  async devolucao(id: number) {
    const result = await pool.query(
      "UPDATE emprestimos SET data_devolucao = NOW() WHERE id = $1 RETURNING *",
      [id]
    );
    if ((result.rowCount ?? 0) > 0) {
      const emprestimo = result.rows[0];
      await pool.query("UPDATE livros SET quantidade = quantidade + 1 WHERE id = $1", [emprestimo.livro_id]);
    }
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query(`
      SELECT e.id, l.titulo, c.nome AS cliente, e.data_emprestimo, e.data_devolucao
      FROM emprestimos e
      INNER JOIN livros l ON e.livro_id = l.id
      INNER JOIN clientes c ON e.cliente_id = c.id
      ORDER BY e.data_emprestimo DESC
    `);
    return result.rows;
  }
}
