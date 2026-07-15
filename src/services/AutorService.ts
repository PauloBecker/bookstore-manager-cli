import { AutorRepository } from "../repositories/AutorRepository";

export class AutorService {
  private repo = new AutorRepository();

  async cadastrarAutor(nome: string, nacionalidade: string, dataNascimento: Date) {
    if (!nome || nome.trim() === "") {
      throw new Error("Nome do autor não pode ser vazio.");
    }
    return this.repo.create(nome, nacionalidade, dataNascimento);
  }

  async listarAutores() {
    return this.repo.findAll();
  }

  async atualizarAutor(id: number, novoNome: string, novaNacionalidade: string, novaDataNascimento: Date) {
    const autorExiste = await this.repo.autorExiste(id);
    if (!autorExiste) {
      throw new Error("Autor não encontrado.");
    }
    return this.repo.update(id, novoNome, novaNacionalidade, novaDataNascimento);
  }

  async removerAutor(id: number) {
    const autorExiste = await this.repo.autorExiste(id);
    if (!autorExiste) {
      throw new Error("Autor não encontrado.");
    }
    return this.repo.delete(id);
  }
}
