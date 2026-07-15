import { AutorService } from "../services/AutorService";

export class AutorController {
  private service = new AutorService();

  async cadastrarAutor(nome: string, nacionalidade: string, dataNascimento: Date) {
    return this.service.cadastrarAutor(nome, nacionalidade, dataNascimento);
  }

  async listarAutores() {
    return this.service.listarAutores();
  }

  async atualizarAutor(id: number, novoNome: string, novaNacionalidade: string, novaDataNascimento: Date) {
    return this.service.atualizarAutor(id, novoNome, novaNacionalidade, novaDataNascimento);
  }

  async removerAutor(id: number) {
    return this.service.removerAutor(id);
  }
}
