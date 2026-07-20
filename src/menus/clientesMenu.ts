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
  console.log("5 - Buscar Cliente por ID");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", async (option: string) => {
    switch (option) {
      case "1":
        console.log("📝 Cadastrar novo cliente");
        rl.question("Nome: ", async (nome) => {
          rl.question("Email: ", async (email) => {
            rl.question("Telefone: ", async (telefone) => {
              rl.question("Data de nascimento (YYYY-MM-DD): ", async (dataStr) => {
                const dataNascimento = new Date(dataStr);
                await controller.cadastrarCliente(nome, email, telefone, dataNascimento);
                console.log("✅ Cliente cadastrado com sucesso!");
                clientesMenu(rl);
              });
            });
          });
        });
        break;

      case "2":
        console.log("📋 Lista de clientes:");
        const clientes = await controller.listarClientes();
        console.table(
          clientes.map(c => ({
            ID: c.id,
            Nome: c.nome,
            Email: c.email,
            Telefone: c.telefone ?? "-",
            Nascimento: c.data_nascimento ? c.data_nascimento.toISOString().split("T")[0] : "-",
            Criado: c.criadoEm ? c.criadoEm.toISOString().split("T")[0] : "-",
            Atualizado: c.atualizadoEm ? c.atualizadoEm.toISOString().split("T")[0] : "-"
          }))
        );
        clientesMenu(rl);
        break;

      case "3":
        console.log("✏️ Atualizar cliente");
        rl.question("ID do cliente: ", async (idStr) => {
          rl.question("Novo nome: ", async (nome) => {
            rl.question("Novo email: ", async (email) => {
              rl.question("Novo telefone: ", async (telefone) => {
                rl.question("Nova data de nascimento (YYYY-MM-DD): ", async (dataStr) => {
                  const clienteAtualizado = {
                    id: Number(idStr),
                    nome,
                    email,
                    telefone,
                    data_nascimento: new Date(dataStr)
                  };
                  await controller.atualizarCliente(clienteAtualizado);
                  console.log("✅ Cliente atualizado com sucesso!");
                  clientesMenu(rl);
                });
              });
            });
          });
        });
        break;

      case "4":
        console.log("🗑️ Remover cliente");
        rl.question("ID do cliente: ", async (idStr) => {
          await controller.removerCliente(Number(idStr));
          console.log("✅ Cliente removido com sucesso!");
          clientesMenu(rl);
        });
        break;

      case "5":
        console.log("🔍 Buscar cliente por ID");
        rl.question("ID do cliente: ", async (idStr) => {
          const cliente = await controller.buscarClientePorId(Number(idStr));
          if (cliente) {
            console.log("📋 Cliente encontrado:");
            console.table([{
              ID: cliente.id,
              Nome: cliente.nome,
              Email: cliente.email,
              Telefone: cliente.telefone ?? "-",
              Nascimento: cliente.data_nascimento ? cliente.data_nascimento.toISOString().split("T")[0] : "-",
              Criado: cliente.criadoEm ? cliente.criadoEm.toISOString().split("T")[0] : "-",
              Atualizado: cliente.atualizadoEm ? cliente.atualizadoEm.toISOString().split("T")[0] : "-"
            }]);
          } else {
            console.log("❌ Cliente não encontrado.");
          }
          clientesMenu(rl);
        });
        break;

      case "0":
        mainMenu();
        return;

      default:
        console.log("❌ Opção inválida, tente novamente.");
        clientesMenu(rl);
    }
  });
}
