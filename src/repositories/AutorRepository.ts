import { Pool } from "pg";
import pool from "../database/connections/database";
import { Autor } from "../models/Autor";

export class AutorRepository {
  async create(autor: Autor) {
    const result = await pool.query(
      "INSERT INTO autores (nome, nacionalidade, criado_em, atualizado_em) VALUES ($1, $2, $3, $4) RETURNING *",
      [autor.nome, autor.nacionalidade, autor.criadoEm, autor.atualizadoEm]
    );
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM autores");
    return result.rows;
  }

  async update(autor: Autor) {
    const result = await pool.query(
      "UPDATE autores SET nome = $1, nacionalidade = $2, criado_em = $3, atualizado_em = $4 WHERE id = $5 RETURNING *",
      [autor.nome, autor.nacionalidade, autor.criadoEm, autor.atualizadoEm, autor.id]
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM autores WHERE id = $1", [id]);
  }

   async findById(id: number): Promise<Autor | null> {
    const result = await pool.query(`SELECT * FROM autores WHERE id = $1`, [id]);
    return result.rows[0] || null;
  }
}
