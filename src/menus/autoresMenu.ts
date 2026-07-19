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
  console.log("5 - Buscar Autor por ID");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", async (option: string) => {
    switch (option) {
      case "1":
        rl.question("Nome do autor: ", async (nome) => {
          rl.question("Nacionalidade: ", async (nacionalidade) => {
            await controller.cadastrarAutor(nome, nacionalidade);
            console.log("✅ Autor cadastrado com sucesso!");
            autoresMenu(rl);
          });
        });
        break;

      case "2":
        console.log("📋 Lista de autores:");
        const autores = await controller.listarAutores();
        console.table(
          autores.map(a => ({
            ID: a.id,
            Nome: a.nome,
            Nacionalidade: a.nacionalidade ?? "-",
            Criado: a.criadoEm ? a.criadoEm.toISOString().split("T")[0] : "-",
            Atualizado: a.atualizadoEm ? a.atualizadoEm.toISOString().split("T")[0] : "-"
          }))
        );
        autoresMenu(rl);
        break;

      case "3":
        console.log("📋 Atualizar autor:");
        rl.question("ID do autor: ", async (idStr) => {
          rl.question("Novo nome: ", async (novoNome) => {
            rl.question("Nova nacionalidade: ", async (novaNacionalidade) => {
              await controller.atualizarAutor(Number(idStr), novoNome, novaNacionalidade);
              console.log("✅ Autor atualizado com sucesso!");
              autoresMenu(rl);
            });
          });
        });
      break;

      case "4":
        console.log("📋 Remover autor:");
        rl.question("ID do autor: ", async (idStr) => {
          await controller.removerAutor(Number(idStr));
          console.log("✅ Autor removido com sucesso!");
          autoresMenu(rl);
        });
        break;

      case "5":
        console.log("📋 Buscar autor por ID:");
        rl.question("ID do autor: ", async (idStr) => {
          const autor = await controller.buscarAutorPorId(Number(idStr));
          if (autor) {
            console.log("📋 Autor encontrado:");
            console.table([{
              ID: autor.id,
              Nome: autor.nome,
              Nacionalidade: autor.nacionalidade ?? "-",
              Criado: autor.criadoEm ? autor.criadoEm.toISOString().split("T")[0] : "-",
              Atualizado: autor.atualizadoEm ? autor.atualizadoEm.toISOString().split("T")[0] : "-"
            }]);
          } else {
            console.log("❌ Autor não encontrado.");
          }
          autoresMenu(rl);
        });
        break;
  
      case "0":
        mainMenu();
        return;

      default:
        console.log("❌ Opção inválida, tente novamente.");
        autoresMenu(rl);
    }
  });
}
