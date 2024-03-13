export class Armazenador {
  private constructor() {}

  static salvar(chave: string, valor: any): void {
    const valorComoString = JSON.stringify(valor);
    localStorage.setItem(chave, valorComoString);
  }


  // <T> = Tipo genérico (Generics). Tipo da função que será enviada na chamada do método obter, que pode ser qualquer tipo. Adiciona previsibilidade para o método.
  static obter<T>(chave: string, reviver?: (this: any, key: string, value: any) => any): T | null {
    const valor = localStorage.getItem(chave);

    if (valor === null) {
      return null;
    }

  // as T = retorna o JSON.parse identificado como o tipo genérico da função enviada na chamada do método. Define explicitamente o tipo do retorno.
    if (reviver) {
      return JSON.parse(valor, reviver) as T;
    }

    return JSON.parse(valor) as T;
  }
}
