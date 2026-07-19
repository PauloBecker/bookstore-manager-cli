import { Autor } from "../models/Autor";
import { AutorRepository } from "../repositories/AutorRepository";

export class AutorService {
  private autorRepo  = new AutorRepository();

  private validarAutor(autor: Autor): void {
  if (!autor.nome || autor.nome.trim().length < 3) {
    throw new Error("Nome do autor deve ter pelo menos 3 caracteres.");
  }
  if (autor.nacionalidade && autor.nacionalidade.trim().length < 2) {
    throw new Error("Nacionalidade inválida.");
  }
}

  async cadastrarAutor(autor: Autor): Promise<void> {
    this.validarAutor(autor);
    await this.autorRepo.create(autor);
  }

  async listarAutores(): Promise<Autor[]> {
    return this.autorRepo.findAll();
  }

  async atualizarAutor(autor: Autor): Promise<void> {
    this.validarAutor(autor);
    await this.autorRepo.update(autor);
  }

  async deletarAutor(id: number): Promise<void> {
    const autor = await this.autorRepo.findById(id);
    if (!autor) {
      throw new Error("Autor não encontrado.");
    }
    await this.autorRepo.delete(id);
  }
  
}
