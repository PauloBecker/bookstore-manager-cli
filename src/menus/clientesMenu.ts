import * as readline from "readline";
import { ClienteController } from "../controllers/ClienteController";
import { mainMenu } from "./mainMenu";

export async function clientesMenu(rl: readline.Interface): Promise<void> {
  const controller = new ClienteController();

  console.log("\n=== Submenu Clientes ===");
  console.log("1 - Cadastrar Cliente");
  console.log("2 - Listar Clientes");
  console.log("3 - Atualizar Cliente");
  console.log("4 - Remover Cliente");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", async (option: string) => {
    switch (option) {
      case "1":
        rl.question("Nome do cliente: ", async (nome) => {
          rl.question("Email: ", async (email) => {
            rl.question("Telefone: ", async (telefone) => {
              rl.question(
                "Data de nascimento (YYYY-MM-DD): ",
                async (dataNascimentoStr) => {
                  const dataNascimento = new Date(dataNascimentoStr);
                  await controller.cadastrarCliente(
                    nome,
                    email,
                    telefone,
                    dataNascimento,
                  );
                  console.log(" Cliente cadastrado com sucesso!");
                  clientesMenu(rl);
                },
              );
            });
          });
        });
        break;

      case "2":
        console.log(" Lista de clientes:");
        console.log(await controller.listarClientes());
        clientesMenu(rl);
        break;

      case "3":
        rl.question("ID do cliente: ", async (idStr) => {
          rl.question("Novo nome: ", async (novoNome) => {
            rl.question("Novo email: ", async (novoEmail) => {
              rl.question("Novo telefone: ", async (novoTelefone) => {
                rl.question("Nova data de nascimento (YYYY-MM-DD): ", async (novaDataNascimentoStr) => {
                  const novaDataNascimento = new Date(novaDataNascimentoStr);
                  await controller.atualizarCliente(Number(idStr), novoNome, novoEmail, novoTelefone, novaDataNascimento);
                  console.log(" Cliente atualizado com sucesso!");
                  clientesMenu(rl);
                });
              });
            });
          });
        });
        break;

      case "4":
        rl.question("ID do cliente: ", async (idStr) => {
          await controller.removerCliente(Number(idStr));
          console.log(" Cliente removido com sucesso!");
          clientesMenu(rl);
        });
        break;

      case "0":
        mainMenu();
        return;

      default:
        console.log("Opção inválida, tente novamente.");
        clientesMenu(rl);
    }
  });
}
