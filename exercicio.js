class Pessoa{
    nome;
    cpf;
    dataNac;
    endereco;

    constructor(nome, cpf, dataNac, endereco){
        this.nome = nome
        this.cpf = cpf
        this.dataNac = dataNac
        this.endereco = endereco
    }


}

class Vendedor extends Pessoa{
    salario;
    cargaHoraria;

    constructor(nome, cpf, dataNac, endereco, salario, cargaHoraria){
        super(nome, cpf, dataNac, endereco);
        
        this.salario = salario;
        this.cargaHoraria = cargaHoraria;
    }

}

class Cliente extends Pessoa{
    historicoDeCompras = [];

    constructor(nome, cpf, dataNac, endereco){
        super(nome, cpf, dataNac, endereco);
    }

    realizaCompra(produto, vendedor, qtdc){
        
        if (produto.venda(qtdc)){
            
            // 1. CRIAR O OBJETO (O Local)
            let novaVenda = new Venda(); 

            // 2. EXECUTAR A AÇÃO (Dentro do Local)
            novaVenda.registrar(this, produto.precoVenda, produto, vendedor,qtdc);
            //    ^        ^
            //    |        |
            //  ONDE FAZ   O QUE FAZ
            
            
            this.historicoDeCompras.push(novaVenda)
        } else {
            console.log("Compra cancelada por falta de estoque.");
        }
        
    }

}

class Produto{
    // 1. IDENTIDADE (Quem é o produto?)
    nome;
    // codigoBarra; // Ou ID/SKU (ex: "789102030")
    descricao;   // Detalhes extras
    categoria;   // Ex: "Limpeza", "Bebidas"

    // 2. FINANCEIRO (Dinheiro)
    // precoCusto;  // Quanto você pagou
    precoVenda;  // Quanto você cobra (Margem de lucro)

    // 3. LOGÍSTICA (Estoque e Controle)
    quantidade;
    validade;    // Importante para perecíveis

    constructor(nome, precoVenda, quantidade, validade) {
        this.nome = nome;
        this.precoVenda = precoVenda;
        this.quantidade = quantidade;
        this.validade = validade;
    }
        
        

    // Tenta vender (diminui estoque)
    venda(qtd){
        console.log(`oii ${this.quantidade}`)
        if( this.quantidade >= qtd){
            this.quantidade -= qtd;
            console.log(`Venda realizada! Restam ${this.quantidade} de ${this.nome}.`);
            return true;  // Deu certo
        } else {
            console.log(`❌ Estoque insuficiente de ${this.nome}!`);
            return false; // Deu errado
        }
        }
}

class Venda{
    vendedor;
    cliente;
    produto;
    valor;
    quantidade;

    registrar(cliente,valor,produto,vendedor,qtd){
        this.cliente = cliente
        this.valor = valor
        this.produto = produto
        this.vendedor = vendedor
        this.quantidade = qtd

        console.log(`✅ VENDA REGISTRADA: ${cliente.nome} comprou ${this.quantidade} unidades do ${produto.nome} com ${vendedor.nome}`);
    }

}


const vendedores= [
    new Vendedor("Alex", "0129391293", "01/05/2000", "lalaLandia", 1000, 12),
    new Vendedor("Mimosa", "0129391293", "01/05/2000", "LULULAND", 1100, 22),
    new Vendedor("Pedra", "0129391293", "01/05/2000", "LOOOLOOLAND", 1200, 32)
]

const clientes= [
    new Cliente("Alfred", "0129391293", "01/05/2000", "lalaLandia"),
    new Cliente("Mercurio", "0129391293", "01/05/2000", "LULULAND"),
    new Cliente("PedroZA", "0129391293", "01/05/2000", "LOOOLOOLAND")
]

const produtos= [
    new Produto("iPhone 15", 5000, 10, "Indeterminado"),
    new Produto("Lula", 2000, 30, "Indeterminado"),
    new Produto("Magia", 192837187, 1010101, "Indeterminado")
]

let mercurio = clientes.find(cliente => cliente.nome === "Mercurio");

let lula = produtos.find(produto => produto.nome === "Lula")

let alex = vendedores.find(vendedor => vendedor.nome === "Alex")

mercurio.realizaCompra(lula,alex,10)

console.log(mercurio.historicoDeCompras)