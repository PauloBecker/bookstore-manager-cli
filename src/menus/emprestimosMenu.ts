import * as readline from "readline";
import { EmprestimoController } from "../controllers/EmprestimoController";
import { mainMenu } from "./mainMenu";

export async function emprestimosMenu(rl: readline.Interface): Promise<void> {
  const controller = new EmprestimoController();

  console.log("\n=== Submenu Empréstimos ===");
  console.log("1 - Realizar Empréstimo");
  console.log("2 - Registrar Devolução");
  console.log("3 - Consultar Empréstimos");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", async (option: string) => {
    switch (option) {
      case "1":
        rl.question("ID do livro: ", async (livroIdStr) => {
          rl.question("ID do cliente: ", async (clienteIdStr) => {
            try {
              await controller.realizarEmprestimo(Number(livroIdStr), Number(clienteIdStr));
              console.log(" Empréstimo realizado com sucesso!");
            } catch (err: unknown) {
              if (err instanceof Error) {
                console.error("❌ Erro:", err.message);
              } else {
                console.error("❌ Erro:", err);
              }
            }
            emprestimosMenu(rl);
          });
        });
        break;

      case "2":
        rl.question("ID do empréstimo: ", async (idStr) => {
          await controller.registrarDevolucao(Number(idStr));
          console.log(" Devolução registrada com sucesso!");
          emprestimosMenu(rl);
        });
        break;

      case "3":
        console.log(" Lista de empréstimos:");
        console.log(await controller.consultarEmprestimos());
        emprestimosMenu(rl);
        break;

      case "0":
        mainMenu();
        return;

      default:
        console.log("Opção inválida, tente novamente.");
        emprestimosMenu(rl);
    }
  });
}
