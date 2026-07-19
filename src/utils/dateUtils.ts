export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]; // yyyy-mm-dd
}

export function calcularDiasEntreDatas(inicio: Date, fim: Date): number {
  const diff = fim.getTime() - inicio.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

