// target: any = método que será recebido pela função
// propertyKey: string = nome do método que está recebendo
// descriptor: PropertyDescriptor = objeto do tipo PropertyDescriptor que retorna informações sobre o método descriptor, ex: value, e nos permite manipulá-lo para que ele faça o que queremos.
export function ValidaDebito(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (valorDoDebito: number) {
    if (valorDoDebito <= 0) {
      throw new Error("O valor a ser debitado precisa ser maior do que zero!");
    }

    if (valorDoDebito > this.saldo) {
      throw new Error("Seu saldo é insuficiente para realizar a operação!");
    }

    // retorna método original com a aplicação dessa validação
    return originalMethod.apply(this, [valorDoDebito]);
  };

  // retorna descriptor com as modificações
  return descriptor;
}

export function ValidaDeposito(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (valorDoDeposito: number) {
    if (valorDoDeposito <= 0) {
      throw new Error("O valor a ser depositado deve ser maior do que zero!");
    }
    return originalMethod.apply(this, [valorDoDeposito]);
  };

  return descriptor;
}
