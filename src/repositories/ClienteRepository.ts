import pool from "../database/connections/database";
import { Cliente } from "../models/Cliente";
import { validarEmail, validarTelefone, isEmpty } from "../utils/validationUtils";

export class ClienteRepository {
  async create(cliente: Cliente): Promise<Cliente> {
    
    if (isEmpty(cliente.nome)) {
      throw new Error("Nome inválido");
    }
    if (!validarEmail(cliente.email)) {
      throw new Error("Email inválido");
    }
    if (cliente.telefone && !validarTelefone(cliente.telefone)) {
      throw new Error("Telefone inválido");
    }

    const result = await pool.query(
      `INSERT INTO clientes (nome, email, telefone, data_nascimento, criado_em) 
       VALUES ($1, $2, $3, $4, DEFAULT) RETURNING *`,
      [cliente.nome, cliente.email, cliente.telefone, cliente.data_nascimento]
    );

    return this.mapRowToCliente(result.rows[0]);
  }

  async findAll(): Promise<Cliente[]> {
    const result = await pool.query("SELECT * FROM clientes ORDER BY id");
    return result.rows.map(this.mapRowToCliente);
  }

  async findById(id: number): Promise<Cliente | null> {
    const result = await pool.query("SELECT * FROM clientes WHERE id = $1", [id]);
    if (result.rowCount === 0) return null;
    return this.mapRowToCliente(result.rows[0]);
  }

  async update(cliente: Cliente): Promise<Cliente> {
    if (isEmpty(cliente.nome)) {
      throw new Error("Nome inválido");
    }
    if (!validarEmail(cliente.email)) {
      throw new Error("Email inválido");
    }
    if (cliente.telefone && !validarTelefone(cliente.telefone)) {
      throw new Error("Telefone inválido");
    }

    const result = await pool.query(
      `UPDATE clientes 
       SET nome = $1, email = $2, telefone = $3, data_nascimento = $4, atualizado_em = NOW()
       WHERE id = $5 RETURNING *`,
      [cliente.nome, cliente.email, cliente.telefone, cliente.data_nascimento, cliente.id]
    );

    return this.mapRowToCliente(result.rows[0]);
  }

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM clientes WHERE id = $1", [id]);
  }

  async clienteExiste(id: number): Promise<boolean> {
    const result = await pool.query("SELECT 1 FROM clientes WHERE id = $1", [id]);
    return (result?.rowCount ?? 0) > 0;
  }

  private mapRowToCliente(row: any): Cliente {
    return {
      id: row.id,
      nome: row.nome,
      email: row.email,
      telefone: row.telefone,
      data_nascimento: row.data_nascimento ? new Date(row.data_nascimento) : undefined,
      criadoEm: row.criado_em ? new Date(row.criado_em) : undefined,
      atualizadoEm: row.atualizado_em ? new Date(row.atualizado_em) : undefined,
    };
  }
}
