import * as readline from "readline";
import { LivroRepository } from "../repositories/LivrosRepository";
import { mainMenu } from "./mainMenu";

export async function livrosMenu(rl: readline.Interface): Promise<void> {
  const repoAutores = new LivroRepository();

  console.log("\n=== Submenu Livros ===");
  console.log("1 - Cadastrar Livro");
  console.log("2 - Listar Livros");
  console.log("3 - Relatórios de Livros");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", async (option: string) => {
    switch (option) {
      case "1":
        const autores = await repoAutores.findAll();
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
                const autorId = Number(autorIdStr);
                if (!(await repoAutores.autorExiste(autorId))) {
                  console.log("❌ Erro: Autor não encontrado. Cadastre o autor primeiro ou use um ID válido.");
                  livrosMenu(rl);
                  return;
                }
                await repoAutores.create(
                  titulo,
                  Number(anoStr),
                  Number(quantidadeStr),
                  Number(autorIdStr)
                );
                console.log(" Livro cadastrado com sucesso!");
                livrosMenu(rl);
              });
            });
          });
        });
        break;

      case "2":
        console.log(" Lista de livros:");
        console.log(await repoAutores.findAll());
        livrosMenu(rl);
        break;

      case "3":
        console.log(" Empréstimos por livro:");
        console.log(await repoAutores.countEmprestimosPorLivro());

        console.log(" Livros disponíveis:");
        console.log(await repoAutores.livrosDisponiveis());
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
