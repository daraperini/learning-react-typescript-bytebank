`Tipos Primitivos`

let valor: number = 3000;
let nome: string = "Dara";
let isPago: boolean = false;

let qualquer: any = "qualquer valor";
qualquer = 200;
qualquer = true;

`Arrays`

const lista = [];
lista.push("Dara", 22, true, {}, []);

const listaNumeros: number[] = [22];
const listaString: string[] = [""];

`Tipos Personalizados (Type Alias)`

type Transacao = {
  tipoTransacao: TipoTransacao;
  data: Date;
  valor: number;
};

`Enums (enumerações) - conjunto de valores fixos que estabelecem um padrão nos valores das variáveis`

enum TipoTransacao {
  DEPOSITO = "Depósito",
  TRANSFERENCIA = "Transferência",
  PAGAMENTO_BOLETO = "Pagamento de Boleto",
}

const novaTransacao: Transacao = {
  tipoTransacao: TipoTransacao.DEPOSITO,
  data: new Date(),
  valor: 0,
};
