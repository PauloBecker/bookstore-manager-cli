import readline from "readline";
import pool from "./database";

async function testDB() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("📅 Conexão bem-sucedida:", res.rows[0]);
  } catch (err) {
    console.error("❌ Erro ao conectar no banco:", err);
  }
}

testDB();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mainMenu() {
  console.log("\n=== Bookstore Manager CLI ===");
  console.log("1 - Gerenciar Autores");
  console.log("2 - Gerenciar Livros");
  console.log("3 - Gerenciar Clientes");
  console.log("4 - Gerenciar Empréstimos");
  console.log("0 - Sair");

  rl.question("Escolha uma opção: ", (option) => {
    switch (option) {
      case "1":
        console.log("👉 Você escolheu Autores");
        break;
      case "2":
        console.log("👉 Você escolheu Livros");
        break;
      case "3":
        console.log("👉 Você escolheu Clientes");
        break;
      case "4":
        console.log("👉 Você escolheu Empréstimos");
        break;
      case "0":
        console.log("Saindo...");
        rl.close();
        //process.exit(0);
        return;
      default:
        console.log("Opção inválida, tente novamente.");
    }
    mainMenu(); // reinicia o menu
  });
}

mainMenu();
