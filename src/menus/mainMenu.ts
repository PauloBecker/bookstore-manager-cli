import * as readline from "readline";
import { livrosMenu } from "./livrosMenu";
import { autoresMenu } from "./autoresMenu";
import { clientesMenu } from "./clientesMenu";
import { emprestimosMenu } from "./emprestimosMenu";
import { relatoriosMenu } from "./relatoriosMenu";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function mainMenu(): void {
  console.log("\n=== Bookstore Manager CLI ===");
  console.log("1 - Gerenciar Autores");
  console.log("2 - Gerenciar Livros");
  console.log("3 - Gerenciar Clientes");
  console.log("4 - Gerenciar Empréstimos");
  console.log("5 - Gerar Relatórios");
  console.log("0 - Sair");

  rl.question("Escolha uma opção: ", async (option: string) => {
    switch (option) {
      case "1":
        console.log(" Você escolheu Autores");
        await autoresMenu(rl);
        break;

      case "2":
        console.log(" Você escolheu Livros");
        await livrosMenu(rl);
        break;

      case "3":
        console.log(" Você escolheu Clientes");
        await clientesMenu(rl);
        break;

      case "4":
        console.log(" Você escolheu Empréstimos");
        await emprestimosMenu(rl);
        break;

      case "5":
        console.log(" Você escolheu Relatórios");
        await relatoriosMenu(rl);
        break;

      case "0":
        console.log("Saindo...");
        rl.close();
        return;

      default:
        console.log("Opção inválida, tente novamente.");
        mainMenu();
    }
    //mainMenu();
  });
}
