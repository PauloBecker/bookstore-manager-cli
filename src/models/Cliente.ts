export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  data_nascimento?: Date;
  criadoEm?: Date;
  atualizadoEm?: Date;
}
