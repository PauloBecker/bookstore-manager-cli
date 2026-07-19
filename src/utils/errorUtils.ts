
export function tratarErro(error: unknown): string {
  if (error instanceof Error) {
    return `Erro: ${error.message}`;
  }
  return "Erro desconhecido.";
}
