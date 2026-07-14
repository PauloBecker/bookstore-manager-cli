import * as readline from "readline";
import { AutorController } from "../controllers/AutorController";
import { mainMenu } from "./mainMenu";

export async function autoresMenu(rl: readline.Interface): Promise<void> {
  const controller = new AutorController();

  console.log("\n=== Submenu Autores ===");
  console.log("1 - Cadastrar Autor");
  console.log("2 - Listar Autores");
  console.log("3 - Atualizar Autor");
  console.log("4 - Remover Autor");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", async (option: string) => {
    switch (option) {
      case "1":
        rl.question("Nome do autor: ", async (nome) => {
          rl.question("Nacionalidade: ", async (nacionalidade) => {
            rl.question("Data de nascimento (YYYY-MM-DD): ", async (dataNascimentoStr) => {
              const dataNascimento = new Date(dataNascimentoStr);
              await controller.cadastrarAutor(nome, nacionalidade, dataNascimento);
              console.log(" Autor cadastrado com sucesso!");
              autoresMenu(rl);
            });
          });
        });
        break;

      case "2":
        console.log(" Lista de autores:");
        console.log(await controller.listarAutores());
        autoresMenu(rl);
        break;

      case "3":
        rl.question("ID do autor: ", async (idStr) => {
          rl.question("Novo nome: ", async (novoNome) => {
            rl.question("Nova nacionalidade: ", async (novaNacionalidade) => {
              rl.question("Nova data de nascimento (YYYY-MM-DD): ", async (novaDataNascimentoStr) => {
                const novaDataNascimento = new Date(novaDataNascimentoStr);
                await controller.atualizarAutor(Number(idStr), novoNome, novaNacionalidade, novaDataNascimento);
                console.log(" Autor atualizado com sucesso!");
                autoresMenu(rl);
              });
            });
          });
        });
        break;

      case "4":
        rl.question("ID do autor: ", async (idStr) => {
          await controller.removerAutor(Number(idStr));
          console.log(" Autor removido com sucesso!");
          autoresMenu(rl);
        });
        break;

      case "0":
        mainMenu();
        return;

      default:
        console.log("Opção inválida, tente novamente.");
        autoresMenu(rl);
    }
  });
}
