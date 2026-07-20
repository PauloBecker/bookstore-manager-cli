import { formatMensagemSucesso, formatMensagemErro } from "../utils/formatUtils";
import { AutorService } from "../services/AutorService";
import { tratarErro } from "../utils/errorUtils";
import { Autor } from "../models/Autor";

export class AutorController {
  private service = new AutorService();

  constructor() {
    this.service = new AutorService();
  }

  async cadastrarAutor(nome: string, nacionalidade?: string): Promise<void> {
    try {
      const autor: Autor = {
        id: 0,
        nome,
        nacionalidade,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      };
      await this.service.cadastrarAutor(autor);
      console.log(formatMensagemSucesso("Autor cadastrado com sucesso!"));
    } catch (error) {
      console.log(formatMensagemErro(tratarErro(error)));
    }
  }
  
  async listarAutores(): Promise<Autor[]> {
    return this.service.listarAutores();
  }

  async atualizarAutor(id: number, nome: string, nacionalidade?: string): Promise<void> {
    try {
      await this.service.atualizarAutor({ id, nome, nacionalidade });
      console.log("Autor atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar autor:", (error as Error).message);
    }
  }

  async buscarAutorPorId(id: number): Promise<Autor | null> {
    return this.service.buscarAutorPorId(id);
  }


  async removerAutor(id: number): Promise<void> {
    try {
      await this.service.deletarAutor(id);
      console.log(formatMensagemSucesso("Autor removido com sucesso!"));
    } catch (error) {
      console.log(formatMensagemErro(tratarErro(error)));
    }
  }
  
}
