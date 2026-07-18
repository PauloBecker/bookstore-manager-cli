
export function logInfo(mensagem: string): void {
  console.log(`[INFO] ${mensagem}`);
}

export function logWarn(mensagem: string): void {
  console.warn(`[WARN] ${mensagem}`);
}

export function logError(mensagem: string): void {
  console.error(`[ERROR] ${mensagem}`);
}
