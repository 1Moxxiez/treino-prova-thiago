class pessoa{
    nome;
    idade;
    cpf;

    constructor(nome, idade, cpf){
        this.nome = nome;
        this.idade = idade;
        this.cpf = cpf
    }
}

class vendedor extends pessoa{
    salario;
    id;

    constructor (nome, idade, cpf, salario, id){
        super(nome, idade, cpf)

        this.salario = salario;
        this.id = id;
    }
}

class cliente extends pessoa{
    dinheiro;
    endereco;

    constructor(nome, idade, cpf, dinheiro, endereco){
        super(nome, idade, cpf)

        this.dinheiro = dinheiro;
        this.endereco = endereco;
    }
}

class produtos{
    nome;
    id;
    quantidade;
    valor;

    constructor(nome, id, quantidade, valor){
        this.nome = nome
        this.id = id;
        this.quantidade = quantidade;
        this.valor = valor
    }
}

class vendas{
    vendas = []

    vendaRealizada(vendedor, cliente, produto, quantidade){
        this.vendedor = vendedor;
        this.cliente = cliente;
        this.produto = produto
        this.quantidade = quantidade

        let valorTotal = (quantidade*produto.valor)

        if(produto.quantidade >= quantidade){
            if(cliente.dinheiro >= valorTotal){
                
                produto.quantidade -= quantidade;
                cliente.dinheiro -= (valorTotal);
                let venda = {
                "Vendedor": vendedor.nome,
                "Cliente": cliente.nome,
                "Produto": produto.nome,
                "Quantidade Vendida": quantidade,
                "Valor Total da venda": valorTotal
                }
                
                this.vendas.push(venda)
                console.log("Venda realizada com sucesso")

            }
            else{
                console.log("Dinheiro insuficiente")
            }
        }
        else{
            console.log("Quantidade em estoque insuficiente")
        }


    }
}

let joao = new vendedor("Joao", 32, "00000000000", 3000, "001")

let vinicius = new cliente("Vinicius", 25, "07610192198", 1400, "79600-010")

let telha = new produtos("Telha","01239", 2, 120)


let venda001 = new vendas()

venda001.vendaRealizada(joao, vinicius, telha, 2)

console.log(venda001.vendas)