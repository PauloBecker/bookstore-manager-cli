export interface Autor {
  id: number;
  nome: string;
  criadoEm: Date;   // data de criação
  atualizadoEm?: Date; // opcional, última atualização
}
