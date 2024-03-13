export class Armazenador {
    constructor() { }
    static salvar(chave, valor) {
        const valorComoString = JSON.stringify(valor);
        localStorage.setItem(chave, valorComoString);
    }
    // <T> = Tipo genérico (Generics). Tipo da função que será enviada na chamada do método obter, que pode ser qualquer tipo. Adiciona previsibilidade para o método.
    static obter(chave, reviver) {
        const valor = localStorage.getItem(chave);
        if (valor === null) {
            return null;
        }
        // as T = retorna o JSON.parse identificado como o tipo genérico da função enviada na chamada do método. Define explicitamente o tipo do retorno.
        if (reviver) {
            return JSON.parse(valor, reviver);
        }
        return JSON.parse(valor);
    }
}
