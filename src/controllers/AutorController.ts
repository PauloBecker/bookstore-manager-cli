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
        id: 0, // gerado pelo banco
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
      try {
      const autores = await this.service.listarAutores();
      return autores;
    } catch (error) {
      console.log(formatMensagemErro(tratarErro(error)));
      return [];
    }
  }

  async atualizarAutor(id: number, nome: string, nacionalidade?: string, atualizadoEm?: Date, criadoEm?: Date): Promise<void> {
    try {
      const autor: Autor = {
        id,
        nome,
        nacionalidade,
        atualizadoEm: atualizadoEm || new Date(),
        criadoEm: criadoEm || new Date(),
      };
      await this.service.atualizarAutor(autor);
      console.log(formatMensagemSucesso("Autor atualizado com sucesso!"));
    } catch (error) {
      console.log(formatMensagemErro(tratarErro(error)));
    }
  }

  async buscarAutorPorId(id: number): Promise<Autor | null> {
    try {
      const autor = await this.service.buscarAutorPorId(id);
      return autor;
    } catch (error) {
      console.log(formatMensagemErro(tratarErro(error)));
      return null;
    }
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
