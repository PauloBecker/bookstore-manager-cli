import { Pool } from "pg";
import pool from "../database/connections/database";
import { Autor } from "../models/Autor";

export class AutorRepository {

  async create(autor: Autor): Promise<void> {
    await pool.query(
      `INSERT INTO autores (nome, nacionalidade, criado_em) 
      VALUES ($1, $2, DEFAULT)`,
      [autor.nome, autor.nacionalidade]
    );
  }

  async findAll(): Promise<Autor[]> {
    const result = await pool.query(`SELECT * FROM autores ORDER BY id`);
    return result.rows.map(row => ({
      id: row.id,
      nome: row.nome,
      nacionalidade: row.nacionalidade,
      criadoEm: row.criado_em ? new Date(row.criado_em) : undefined,
      atualizadoEm: row.atualizado_em ? new Date(row.atualizado_em) : undefined,
    }));
  }

  async update(autor: Autor): Promise<void> {
    await pool.query(
      `UPDATE autores 
      SET nome = $1, nacionalidade = $2, atualizado_em = NOW()
      WHERE id = $3`,
      [autor.nome, autor.nacionalidade, autor.id]
    );
  }

  async findById(id: number): Promise<Autor | null> {
    const result = await pool.query(`SELECT * FROM autores WHERE id = $1`, [id]);
    const row = result.rows[0];
    if (!row) return null;

    return {
      id: row.id,
      nome: row.nome,
      nacionalidade: row.nacionalidade,
      criadoEm: row.criado_em ? new Date(row.criado_em) : undefined,
      atualizadoEm: row.atualizado_em ? new Date(row.atualizado_em) : undefined,
    };
  }


  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM autores WHERE id = $1", [id]);
  }

}
