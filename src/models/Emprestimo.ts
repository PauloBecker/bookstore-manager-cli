export interface Emprestimo {
  id: number;
  livroId: number;     // FK para Livro
  clienteId: number;   // FK para Cliente
  dataEmprestimo: Date;
  dataDevolucao?: Date; // opcional, só preenchido quando devolvido
}
