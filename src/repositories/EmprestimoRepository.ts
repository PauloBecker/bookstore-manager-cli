import pool from "../database/connections/database";
import { Emprestimo } from "../models/Emprestimo";
import { validarId, isInvalidDate } from "../utils/validationUtils";
import { QueryResult } from "pg";

export class EmprestimoRepository {

  async registrarEmprestimo(emprestimo: Emprestimo): Promise<Emprestimo> {

    if (!validarId(emprestimo.clienteId)) throw new Error("Cliente inválido");
    if (!validarId(emprestimo.livroId)) throw new Error("Livro inválido");
    if (isInvalidDate(emprestimo.dataEmprestimo)) throw new Error("Data de empréstimo inválida");

    const cliente = await pool.query("SELECT 1 FROM clientes WHERE id = $1", [emprestimo.clienteId]);
      if (cliente.rowCount === 0) throw new Error("Cliente inexistente");
    
    const livro = await pool.query("SELECT quantidade_disponivel FROM livros WHERE id = $1", [emprestimo.livroId]);
      if (livro.rowCount === 0) throw new Error("Livro inexistente");
      if (livro.rows[0].quantidade_disponivel <= 0) throw new Error("Livro sem disponibilidade");

    const emprestimoAtivo: QueryResult<any> = await pool.query(
      "SELECT 1 FROM emprestimos WHERE cliente_id = $1 AND livro_id = $2 AND devolvido = false",
        [emprestimo.clienteId, emprestimo.livroId]
      );
      if (emprestimoAtivo.rowCount! > 0) {
        throw new Error("Já existe empréstimo ativo para este cliente e livro");
      }

    const result = await pool.query(
      `INSERT INTO emprestimos (cliente_id, livro_id, data_emprestimo, devolvido, criado_em) 
      VALUES ($1, $2, NOW(), false, DEFAULT) RETURNING *`,
      [emprestimo.clienteId, emprestimo.livroId]
    );
    await pool.query("UPDATE livros SET quantidade = quantidade - 1 WHERE id = $1", [emprestimo.livroId]);
    return this.mapRowToEmprestimo(result.rows[0]);
  }

  async registrarDevolucao(id: number, dataDevolucao: Date): Promise<Emprestimo> {
    const emprestimo = await pool.query("SELECT * FROM emprestimos WHERE id = $1", [id]);
    if (emprestimo.rowCount === 0) throw new Error("Empréstimo inexistente");
    if (emprestimo.rows[0].devolvido) throw new Error("Este empréstimo já foi devolvido");

    const result = await pool.query(
      `UPDATE emprestimos 
       SET data_devolucao = $1, devolvido = true, atualizado_em = NOW()
       WHERE id = $2 RETURNING *`,
      [dataDevolucao, id]
    );
    await pool.query("UPDATE livros SET quantidade = quantidade + 1 WHERE id = $1", [emprestimo.rows[0].livro_id]);
    return this.mapRowToEmprestimo(result.rows[0]);
  }

  async findAll(): Promise<any[]> {
    const result = await pool.query(
      `SELECT e.id, e.data_emprestimo, e.data_devolucao, e.devolvido,
              c.nome AS cliente_nome, l.titulo AS livro_titulo
       FROM emprestimos e
       JOIN clientes c ON e.cliente_id = c.id
       JOIN livros l ON e.livro_id = l.id
       ORDER BY e.id`
    );
    return result.rows;
  }

  async findById(id: number): Promise<Emprestimo | null> {
    const result = await pool.query("SELECT * FROM emprestimos WHERE id = $1", [id]);
    if (result.rowCount === 0) return null;
    return this.mapRowToEmprestimo(result.rows[0]);
  }

  async delete(id: number): Promise<void> {
    const emprestimo = await pool.query("SELECT * FROM emprestimos WHERE id = $1", [id]);
    if (emprestimo.rowCount === 0) throw new Error("Empréstimo inexistente");
    await pool.query("DELETE FROM emprestimos WHERE id = $1", [id]);
  }
  private mapRowToEmprestimo(row: any): Emprestimo {
    return {
      id: row.id,
      clienteId: row.cliente_id,
      livroId: row.livro_id,
      dataEmprestimo: row.data_emprestimo ? new Date(row.data_emprestimo) : undefined,
      dataDevolucao: row.data_devolucao ? new Date(row.data_devolucao) : undefined,
      devolvido: row.devolvido,
      criadoEm: row.criado_em ? new Date(row.criado_em) : undefined,
      atualizadoEm: row.atualizado_em ? new Date(row.atualizado_em) : undefined,
    };
  }
}
