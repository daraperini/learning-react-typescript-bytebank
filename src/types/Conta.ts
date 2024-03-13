import { Armazenador } from "../utils/Armazenador.js";
import { ValidaDebito, ValidaDeposito } from "./Decorators.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

export class Conta {
  protected nome: string;
  protected saldo: number = Armazenador.obter<number>("saldo") || 0;
  private transacoes: Transacao[] =
    Armazenador.obter<Transacao[]>("transacoes", (key: string, value: any) => {
      if (key === "data") {
        return new Date(value);
      }
      return value;
    }) || [];

  // constrói e inicializa o objeto Conta
  public constructor(nome: string) {
    this.nome = nome;
  }

  public getTitular() {
    return this.nome;
  }

  public getGruposTransacoes(): GrupoTransacao[] {
    const gruposTransacoes: GrupoTransacao[] = [];
    const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
    const transacoesOrdenadas: Transacao[] = listaTransacoes.sort(
      (t1, t2) => t2.data.getTime() - t1.data.getTime()
    );
    let labelAtualGrupoTransacao: string = "";

    transacoesOrdenadas.forEach((transacao) => {
      let labelGrupoTransacao: string = transacao.data.toLocaleDateString(
        "pt-br",
        { month: "long", year: "numeric" }
      );

      if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
        labelAtualGrupoTransacao = labelGrupoTransacao;
        gruposTransacoes.push({
          label: labelGrupoTransacao,
          transacoes: [],
        });
      }

      gruposTransacoes.at(-1).transacoes.push(transacao);
    });

    return gruposTransacoes;
  }

  public getSaldo() {
    return this.saldo;
  }

  public getDataAcesso(): Date {
    return new Date();
  }

  public registrarTransacao(novaTransacao: Transacao): void {
    if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
      this.depositar(novaTransacao.valor);
    } else if (
      novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA ||
      novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO
    ) {
      this.debitar(novaTransacao.valor);
      novaTransacao.valor *= -1;
    } else {
      throw new Error("Tipo de Transação é inválida");
      return;
    }

    this.transacoes.push(novaTransacao);
    console.log(this.getGruposTransacoes());
    Armazenador.salvar("transacoes", JSON.stringify(this.transacoes));
  }

  @ValidaDebito
  private debitar(valor: number): void {
    this.saldo -= valor;
    Armazenador.salvar("saldo", JSON.stringify(this.saldo));
  }

  @ValidaDeposito
  private depositar(valor: number): void {
    this.saldo += valor;
    Armazenador.salvar("saldo", JSON.stringify(this.saldo));
  }
}

//Herança: extends Conta = tudo que tem na Conta também tem na ContaPremium. ContaPremium é derivada de Conta. Método registrarTransação está sendo sobrescrito dentro da classe ContaPremium
export class ContaPremium extends Conta {
  registrarTransacao(transacao: Transacao): void {
    if (transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
      console.log("Ganhou um bônus de 0.50 centavos");
      transacao.valor += 0.5;
    }
    //super = utilizamos o método da classe pai (nesse caso, Conta). Então ele faz o registrarTransação da ContaPremium e depois registra através da registrarTransacao da Conta, fazendo todas as verificações daquela função.
    super.registrarTransacao(transacao);
  }
}

const conta = new Conta("Joana da Silva Oliveira");
const contaPremium = new ContaPremium("Dara Perini");

export default conta;
