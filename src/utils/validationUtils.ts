
export function isEmpty(value: string | null | undefined | Date): boolean {
  return !value || (typeof value === "string" && value.trim().length === 0);
}

export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validarTelefone(telefone: string): boolean {
  const regex = /^\+?\d{8,15}$/; // simples, pode ser refinado
  return regex.test(telefone);
}

export function validarId(id: number | null | undefined): boolean {
  return !!id && Number.isInteger(id) && id > 0;
}


export function isInvalidDate(value: Date | null | undefined): boolean {
  return !value || isNaN(value.getTime());
}
