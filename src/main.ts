import * as readline from "readline";


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


type MenuOption = "1" | "2" | "3" | "4" | "0";

function mainMenu(): void {
  console.log("\n=== Bookstore Manager CLI ===");
  console.log("1 - Gerenciar Autores");
  console.log("2 - Gerenciar Livros");
  console.log("3 - Gerenciar Clientes");
  console.log("4 - Gerenciar Empréstimos");
  console.log("0 - Sair");

  rl.question("Escolha uma opção: ", (option: string) => {
    switch (option as MenuOption) {
      case "1":
        console.log(" Você escolheu Autores");
        break;
      case "2":
        console.log(" Você escolheu Livros");
        break;
      case "3":
        console.log(" Você escolheu Clientes");
        break;
      case "4":
        console.log(" Você escolheu Empréstimos");
        break;
      case "0":
        console.log("Saindo...");
        rl.close();
        return;
      default:
        console.log("Opção inválida, tente novamente.");
    }
    mainMenu(); 
  });
}

mainMenu();
