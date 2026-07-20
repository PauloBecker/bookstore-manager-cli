import * as readline from "readline";
import { RelatorioController } from "../controllers/RelatorioController";
import { mainMenu } from "./mainMenu";

export async function relatoriosMenu(rl: readline.Interface): Promise<void> {
  const controller = new RelatorioController();

  console.log("\n=== Submenu Relatórios ===");
  console.log("1 - Livros disponíveis");
  console.log("2 - Livros emprestados");
  console.log("3 - Livros cadastrados por autor");
  console.log("4 - Quantidade de empréstimos por livro");
  console.log("5 - Clientes com empréstimos ativos");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", async (option: string) => {
    switch (option) {
      case "1":
        console.log("📊 Relatório: Livros disponíveis");
        const disponiveis = await controller.livrosDisponiveis();
        console.table(disponiveis);
        relatoriosMenu(rl);
        break;

      case "2":
        console.log("📊 Relatório: Livros emprestados");
        const emprestados = await controller.livrosEmprestados();
        console.table(emprestados);
        relatoriosMenu(rl);
        break;

      case "3":
        console.log("📊 Relatório: Livros cadastrados por autor");
        const porAutor = await controller.livrosPorAutor();
        console.table(porAutor);
        relatoriosMenu(rl);
        break;

      case "4":
        console.log("📊 Relatório: Quantidade de empréstimos por livro");
        const qtdEmprestimos = await controller.qtdEmprestimosPorLivro();
        console.table(qtdEmprestimos);
        relatoriosMenu(rl);
        break;

      case "5":
        console.log("📊 Relatório: Clientes com empréstimos ativos");
        const clientesAtivos = await controller.clientesComEmprestimosAtivos();
        console.table(clientesAtivos);
        relatoriosMenu(rl);
        break;

      case "0":
        console.log("🔙 Retornando ao menu principal...");
        mainMenu();
        return;

      default:
        console.log("❌ Opção inválida, tente novamente.");
        relatoriosMenu(rl);
    }
  });
}
