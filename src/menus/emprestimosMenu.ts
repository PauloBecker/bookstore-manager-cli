import * as readline from "readline";
import { EmprestimoController } from "../controllers/EmprestimoController";
import { Emprestimo } from "../models/Emprestimo";
import { mainMenu } from "./mainMenu";

export async function emprestimosMenu(rl: readline.Interface): Promise<void> {
  const controller = new EmprestimoController();

  console.log("\n=== Submenu Empréstimos ===");
  console.log("1 - Registrar Empréstimo");
  console.log("2 - Registrar Devolução");
  console.log("3 - Listar Empréstimos");
  console.log("4 - Buscar Empréstimo por ID");
  console.log("5 - Remover Empréstimo");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", async (option: string) => {
    switch (option) {
      case "1":
        console.log("📋 Registro de Empréstimo:");
        rl.question("ID do cliente: ", async (clienteStr) => {
          const clienteId = Number(clienteStr);
          const clienteExiste = await controller.buscarClientePorId(clienteId);
          if (!clienteExiste) {
            console.log("❌ Cliente inexistente. Informe um ID válido.");
            return emprestimosMenu(rl);
          }
          rl.question("ID do livro: ", async (livroStr) => {
            const livroId = Number(livroStr);
            const livroExiste = await controller.buscarLivroPorId(livroId);
            if (!livroExiste) {
              console.log("❌ Livro inexistente. Informe um ID válido.");
              return emprestimosMenu(rl);
            }
              try {
                const emprestimo = await controller.registrarEmprestimo(
                  Number(clienteStr),
                  Number(livroStr)
                );
                console.log("✅ Empréstimo registrado:");
                console.table([{
                  ID: emprestimo.id,
                  ClienteID: emprestimo.clienteId,
                  LivroID: emprestimo.livroId,
                  DataEmprestimo: emprestimo.dataEmprestimo ? new Date(emprestimo.dataEmprestimo).toISOString().split("T")[0] : "-",
                  DataDevolucao: emprestimo.dataDevolucao ? new Date(emprestimo.dataDevolucao).toISOString().split("T")[0] : "-",
                  Devolvido: emprestimo.devolvido ? "Sim" : "Não",
                  Criado: emprestimo.criadoEm ? new Date(emprestimo.criadoEm).toISOString().split("T")[0] : "-",
                  Atualizado: emprestimo.atualizadoEm ? new Date(emprestimo.atualizadoEm).toISOString().split("T")[0] : "-"
                }]);
              } catch (error: any) {
                console.log("❌ Erro ao registrar empréstimo:", error.message);
              }
              emprestimosMenu(rl);
            });
          });
          break;



      case "2":
        console.log("📋 Registro de Devolução:");
        rl.question("ID do empréstimo: ", async (idStr) => {
          try {
            const devolucao = await controller.registrarDevolucao(Number(idStr), new Date());
            console.log("✅ Devolução registrada:");
            console.table([{
              ID: devolucao.id,
              ClienteID: devolucao.clienteId,
              LivroID: devolucao.livroId,
              DataEmprestimo: devolucao.dataEmprestimo ? new Date(devolucao.dataEmprestimo).toISOString().split("T")[0] : "-",
              DataDevolucao: devolucao.dataDevolucao ? new Date(devolucao.dataDevolucao).toISOString().split("T")[0] : "-",
              Devolvido: devolucao.devolvido ? "Sim" : "Não",
              Criado: devolucao.criadoEm ? new Date(devolucao.criadoEm).toISOString().split("T")[0] : "-",
              Atualizado: devolucao.atualizadoEm ? new Date(devolucao.atualizadoEm).toISOString().split("T")[0] : "-"
            }]);
          } catch (error: any) {
            console.log("❌ Erro ao registrar devolução:", error.message);
          }
          emprestimosMenu(rl);
        });
        break;

      case "3":
        console.log("📋 Lista de empréstimos:");
        const emprestimos = await controller.listarEmprestimos();
        console.table(emprestimos.map(e => ({
          ID: e.id,
          Cliente: e.cliente_nome,
          Livro: e.livro_titulo,
          DataEmprestimo: e.data_emprestimo ? new Date(e.data_emprestimo).toISOString().split("T")[0] : "-",
          DataDevolucao: e.data_devolucao ? new Date(e.data_devolucao).toISOString().split("T")[0] : "-",
          Devolvido: e.devolvido ? "Sim" : "Não"
        })));
        emprestimosMenu(rl);
        break;

      case "4":
        console.log("📋 Buscar Empréstimo por ID:");
        rl.question("ID do empréstimo: ", async (idStr) => {
          const emprestimo = await controller.buscarEmprestimoPorId(Number(idStr));
          if (emprestimo) {
            console.log("📋 Empréstimo encontrado:");
            console.table([{
              ID: emprestimo.id,
              ClienteID: emprestimo.clienteId,
              LivroID: emprestimo.livroId,
              DataEmprestimo: emprestimo.dataEmprestimo ? emprestimo.dataEmprestimo.toISOString().split("T")[0] : "-",
              DataDevolucao: emprestimo.dataDevolucao ? emprestimo.dataDevolucao.toISOString().split("T")[0] : "-",
              Devolvido: emprestimo.devolvido ? "Sim" : "Não",
              Criado: emprestimo.criadoEm ? emprestimo.criadoEm.toISOString().split("T")[0] : "-",
              Atualizado: emprestimo.atualizadoEm ? emprestimo.atualizadoEm.toISOString().split("T")[0] : "-"
            }]);
          } else {
            console.log("❌ Empréstimo não encontrado.");
          }
          emprestimosMenu(rl);
        });
        break;

      case "5":
        console.log("📋 Remover Empréstimo:");
        rl.question("ID do empréstimo: ", async (idStr) => {
          await controller.removerEmprestimo(Number(idStr));
          console.log("✅ Empréstimo removido com sucesso!");
          emprestimosMenu(rl);
        });
        break;

      case "0":
        console.log("🔙 Retornando ao menu principal...");
        mainMenu();
        return;

      default:
        console.log("❌ Opção inválida, tente novamente.");
        emprestimosMenu(rl);
    }
  });
}
