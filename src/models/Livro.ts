export interface Livro {
  id: number;
  titulo: string;
  anoPublicacao: number;
  quantidade: number;
  autorId: number;   // chave estrangeira para Autor
  criadoEm: Date;
  atualizadoEm?: Date;
}
