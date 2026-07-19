
export function isEmpty(value: string | null | undefined | Date): boolean {
  return !value || (typeof value === "string" && value.trim().length === 0);
}

export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validarTelefone(telefone: string): boolean {
  const regex = /^\+?\d{8,15}$/;
  return regex.test(telefone);
}
