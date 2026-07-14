import * as readline from "readline";
import { mainMenu } from "./mainMenu";
import { LivroController } from "../controllers/LivrosController";

export async function livrosMenu(rl: readline.Interface): Promise<void> {
  const controller = new LivroController();

  console.log("\n=== Submenu Livros ===");
  console.log("1 - Cadastrar Livro");
  console.log("2 - Listar Livros");
  console.log("3 - Relatórios de Livros");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", async (option: string) => {
    switch (option) {
      case "1":
        const autores = await controller.listarAutores();
        if (autores.length === 0) {
          console.log(" Nenhum autor cadastrado. Cadastre um autor primeiro.");
          livrosMenu(rl);
          return;
        }
        console.log("\n=== Lista de Autores ===\n");
        console.log(autores);
        rl.question("Título do livro: ", async (titulo) => {
          rl.question("Ano de publicação: ", async (anoStr) => {
            rl.question("Quantidade: ", async (quantidadeStr) => {
              rl.question("ID do autor: ", async (autorIdStr) => {
                try {
                  await controller.cadastrarLivro(
                    titulo,
                    Number(anoStr),
                    Number(quantidadeStr),
                    Number(autorIdStr)
                  );
                  console.log(" Livro cadastrado com sucesso!");
                } catch (err) {
                  if (err instanceof Error) {
                    console.error("❌ Erro:", err.message);
                  } else {
                    console.error("❌ Erro inesperado:", err);
                  }
                }
                livrosMenu(rl);
              });
            });
          });
        });
        break;

      case "2":
        console.log(" Lista de livros:");
        console.log(await controller.listarLivros());
        livrosMenu(rl);
        break;

      case "3":
        console.log(" Empréstimos por livro:");
        console.log(await controller.relatorioLivros());
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
