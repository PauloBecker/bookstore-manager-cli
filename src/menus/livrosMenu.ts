import * as readline from "readline";
import { mainMenu } from "./mainMenu";
import { LivroController } from "../controllers/LivrosController";
import { Livro } from "../models/Livro";

export async function livrosMenu(rl: readline.Interface): Promise<void> {
  const controller = new LivroController();

  console.log("\n=== Submenu Livros ===");
  console.log("1 - Cadastrar Livro");
  console.log("2 - Listar Livros");
  console.log("3 - Atualizar Livro");
  console.log("4 - Deletar Livro");
  console.log("5 - Relatórios de Livros");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", async (option: string) => {
    switch (option) {
      case "1":
        console.log("=== Cadastrar Livro ===");
        console.log("Lista de autores disponíveis:");
        const autores = await controller.listarAutores();
        if (!autores || autores.length === 0) {
          console.log(" Nenhum autor cadastrado. Cadastre um autor primeiro.");
          livrosMenu(rl);
          return;
        }
        console.table(autores);

        rl.question("Título do livro: ", async (titulo) => {
          rl.question("Ano de publicação: ", async (anoStr) => {
            rl.question("Quantidade: ", async (quantidadeStr) => {
              rl.question("ID do autor: ", async (autorIdStr) => {
                rl.question("ISBN: ", async (isbn) => {
                  try {
                    await controller.cadastrarLivro(
                      0, // id inicial
                      titulo,
                      Number(anoStr),
                      Number(quantidadeStr),
                      Number(autorIdStr),
                      isbn
                    );
                  } catch (err) {
                    console.error("❌ Erro:", (err as Error).message);
                  }
                  livrosMenu(rl);
                });
              });
            });
          });
        });
        break;

      case "2":
        console.log("================ Listar Livros ==================");
        console.table(await controller.listarLivros());
        livrosMenu(rl);
        break;

      case "3":
        console.log("=== Atualizar Livro ===");
        rl.question("ID do livro a atualizar: ", async (idStr) => {
          const id = Number(idStr);
          rl.question("Novo título: ", async (titulo) => {
            rl.question("Novo ano de publicação: ", async (anoStr) => {
              rl.question("Nova quantidade: ", async (quantidadeStr) => {
                rl.question("Novo ID do autor: ", async (autorIdStr) => {
                  rl.question("Novo ISBN: ", async (isbn) => {
                    const livro: Livro = {
                      id,
                      titulo,
                      anoPublicacao: Number(anoStr),
                      quantidade: Number(quantidadeStr),
                      autorId: Number(autorIdStr),
                      isbn,
                      criadoEm: new Date(),
                      atualizadoEm: new Date(),
                    };
                    try {
                      await controller.atualizarLivro(livro);
                    } catch (err) {
                      console.error("❌ Erro:", (err as Error).message);
                    }
                    livrosMenu(rl);
                  });
                });
              });
            });
          });
        });
        break;

      case "4":
        console.log("=== Deletar Livro ===");
        rl.question("ID do livro a deletar: ", async (idStr) => {
          try {
            await controller.deletarLivro(Number(idStr));
            console.log(" Livro deletado com sucesso!");
          } catch (err) {
            console.error("❌ Erro:", (err as Error).message);
          }
          livrosMenu(rl);
        });
        break;

      case "5": 
        console.log("=== Relatórios de Livros ===");
        await controller.relatorioLivros();
        livrosMenu(rl);
        break;
      
      case "0":
        mainMenu();
        return;

      default:
        console.log("Opção inválida, tente novamente.");
        livrosMenu(rl);
    }
  });
}
