export interface Livro {
  id: number;
  titulo: string;
  anoPublicacao: number;
  quantidade: number;
  isbn: string;
  autorId: number;
  criadoEm?: Date;   
  atualizadoEm?: Date;
}
