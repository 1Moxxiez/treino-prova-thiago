// ============================================================================
// 1. CLASSE PAI (SUPERCLASSE)
// CONCEITO: Abstração (Criar um modelo genérico para não repetir código)
// ============================================================================
class Usuario {
    nome;
    id;
    saldo;

    constructor(nome, id, saldo) {
        this.nome = nome;
        this.id = id;
        this.saldo = saldo;
    }

    // CONCEITO: Método (Ação que o objeto faz)
    exibirPerfil() {
        console.log(`👤 USUÁRIO: ${this.nome} | Saldo: R$ ${this.saldo}`);
    }
}

// ============================================================================
// 2. CLASSE FILHA (HERANÇA) - CLIENTE
// CONCEITO: 'extends' (Herda tudo de Usuario)
// ============================================================================
class Cliente extends Usuario {
    endereco;

    constructor(nome, id, saldo, endereco) {
        // CONCEITO: 'super'
        // Chama o construtor do Pai para arrumar o nome, id e saldo.
        // OBRIGATÓRIO ser a primeira linha.
        super(nome, id, saldo); 
        
        // O que é exclusivo do filho, definimos aqui
        this.endereco = endereco;
    }

    // CONCEITO: Polimorfismo / Sobrescrita (@override)
    // Estamos mudando o comportamento do método 'exibirPerfil' que veio do Pai.
    exibirPerfil() {
        console.log(`🏠 CLIENTE: ${this.nome} | Mora em: ${this.endereco} | Saldo: R$ ${this.saldo}`);
    }

    pagar(valor) {
        if (this.saldo >= valor) {
            this.saldo -= valor;
            return true;
        } else {
            console.log("❌ Saldo insuficiente!");
            return false;
        }
    }
}

// ============================================================================
// 3. CLASSE FILHA (HERANÇA) - ENTREGADOR
// ============================================================================
class Entregador extends Usuario {
    veiculo;
    disponivel = true; // Estado (Boolean)

    constructor(nome, id, veiculo) {
        super(nome, id, 0); // Entregador começa com saldo 0
        this.veiculo = veiculo;
    }

    // Sobrescrita novamente
    exibirPerfil() {
        console.log(`🏍️ MOTOBOY: ${this.nome} | Veículo: ${this.veiculo} | Status: ${this.disponivel ? "Livre" : "Ocupado"}`);
    }
}

// ============================================================================
// 4. CLASSE INDEPENDENTE - RESTAURANTE
// CONCEITO: Associação (O Restaurante terá uma lista de pratos)
// ============================================================================
class Restaurante {
    nome;
    cardapio = []; // Lista (Array)

    constructor(nome) {
        this.nome = nome;
    }

    adicionarPrato(nomePrato, preco) {
        // CONCEITO: Objeto Literal (Criando um objeto simples sem classe só pra guardar dados)
        let prato = {
            item: nomePrato,
            preco: preco
        };
        this.cardapio.push(prato);
    }
    // [
    //     { item: "Pizza", preco: 40 },  // Posição 0
    //     { item: "Coca", preco: 10 },   // Posição 1
    //     { item: "Sushi", preco: 50 }   // Posição 2
    // ]
}

// ============================================================================
// 5. CLASSE DE AÇÃO - PEDIDO
// CONCEITO: Interação entre objetos (Aqui tudo se conecta)
// ============================================================================
class Pedido {
    cliente;    // Vai receber um OBJETO Cliente
    restaurante;// Vai receber um OBJETO Restaurante
    entregador; // Vai receber um OBJETO Entregador
    itens = [];
    total = 0;
    status = "Pendente";

    constructor(cliente, restaurante) {
        this.cliente = cliente;
        this.restaurante = restaurante;
    }

    adicionarItem(nomeDoPrato) {
        // CONCEITO: .find()
        // Procura no cardápio do restaurante o prato com esse nome
        let pratoEncontrado = this.restaurante.cardapio.find(p => p.item === nomeDoPrato);

        if (pratoEncontrado) {
            this.itens.push(pratoEncontrado);
            this.total += pratoEncontrado.preco;
            console.log(`➕ Item adicionado: ${pratoEncontrado.item} (R$ ${pratoEncontrado.preco})`);
        } else {
            console.log(`❌ O restaurante não serve ${nomeDoPrato}`);
        }
    }

    finalizarPedido(entregador) {
        // 1. Verifica se tem entregador livre
        if (entregador.disponivel === false) {
            console.log("❌ Entregador ocupado!");
            return;
        }

        // 2. Tenta cobrar do cliente (usando método do cliente)
        if (this.cliente.pagar(this.total)) {
            
            // SUCESSO! Atualiza tudo:
            this.entregador = entregador;
            this.entregador.disponivel = false; // Motoqueiro fica ocupado
            this.status = "Em trânsito";
            
            console.log("===================================");
            console.log(`✅ PEDIDO CONFIRMADO!`);
            console.log(`Cliente: ${this.cliente.nome}`);
            console.log(`Restaurante: ${this.restaurante.nome}`);
            console.log(`Total Pago: R$ ${this.total}`);
            console.log(`Entregador ${this.entregador.nome} está a caminho de ${this.cliente.endereco}`);
            console.log("===================================");
        
        } else {
            console.log("❌ Pedido cancelado (Falta de pagamento).");
        }
    }
}

// ============================================================================
// 6. EXECUÇÃO (O ROTEIRO DA PROVA)
// ============================================================================

// A. Criar os Atores
const clienteAna = new Cliente("Ana", 1, 100, "Rua das Flores, 10");
const motoboyJoao = new Entregador("João", 99, "Honda CG 160");
const pizzaria = new Restaurante("Pizza Planet");

// B. Configurar o Restaurante
pizzaria.adicionarPrato("Pizza Calabresa", 40);
pizzaria.adicionarPrato("Coca Cola", 10);

// C. O Cenário: Ana quer jantar
clienteAna.exibirPerfil(); // Usa o método do Filho (Cliente)
motoboyJoao.exibirPerfil(); // Usa o método do Filho (Entregador)

// D. Criando o Pedido
// Note que passamos os OBJETOS inteiros (clienteAna, pizzaria), não strings.
let pedido1 = new Pedido(clienteAna, pizzaria);

// E. Adicionando itens (Lógica de busca no array)
pedido1.adicionarItem("Pizza Calabresa");
pedido1.adicionarItem("Coca Cola");
pedido1.adicionarItem("Sushi"); // Teste de erro (não tem no cardápio)

// F. Finalizando (Lógica de pagamento e mudança de estado)
pedido1.finalizarPedido(motoboyJoao);

// G. Verificando o estado final
console.log("\n--- Estado Final ---");
clienteAna.exibirPerfil(); // Saldo deve ter diminuído (100 - 50 = 50)
motoboyJoao.exibirPerfil(); // Status deve estar "Ocupado"