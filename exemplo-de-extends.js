// ============================================================================
// ARQUIVO DE ESTUDO: HERANÇA (EXTENDS) E SUPER
// ============================================================================
// Cenário: Temos uma classe genérica (Animal) e uma específica (Cachorro).
// O Cachorro vai herdar tudo que o Animal tem e adicionar coisas novas.
// ============================================================================

// @ts-check

// ----------------------------------------------------------------------------
// 1. CLASSE PAI (SUPERCLASSE)
// ----------------------------------------------------------------------------
// Essa é a base. Ela tem o básico que TODO animal deve ter.
class Animal {
    nome;
    energia;

    constructor(nome) {
        this.nome = nome;
        this.energia = 10; // Todo animal começa com 10 de energia
    }

    // Método genérico que qualquer animal usa
    comer() {
        console.log(`${this.nome} está comendo...`);
        this.energia += 5; // Recupera energia
    }

    // Método que será substituído (sobrescrito) pelo filho depois
    fazerBarulho() {
        console.log("Som genérico de animal.");
    }
}


// ----------------------------------------------------------------------------
// 2. CLASSE FILHA (SUBCLASSE)
// ----------------------------------------------------------------------------
// A palavra-chave 'extends' diz: "Copie tudo o que tem em Animal para cá".
class Cachorro extends Animal {
    raca; // Propriedade exclusiva de cachorro (Animal genérico não tem raça aqui)

    // O construtor recebe o que o Pai precisa (nome) + o que o Filho precisa (raca)
    constructor(nome, raca) {
        
        // --------------------------------------------------------------------
        // O COMANDO 'super()' (MUITO IMPORTANTE PARA PROVA)
        // --------------------------------------------------------------------
        // O que faz: Chama o constructor da classe Pai (Animal).
        // Por que usar: O 'this' não existe na classe filha antes de chamar o super().
        // Regra: Deve ser a PRIMEIRA linha dentro do constructor do filho.
        super(nome); 

        // Agora que o pai criou o básico (nome e energia), definimos o específico:
        this.raca = raca;
    }

    // ------------------------------------------------------------------------
    // SOBRESCRITA DE MÉTODO (POLIMORFISMO)
    // ------------------------------------------------------------------------
    // O pai já tem 'fazerBarulho', mas aqui criamos um igual com comportamento diferente.
    // Quando um Cachorro fizer barulho, o JS vai usar ESSE aqui, não o do Pai.
    
    // ✅ JEITO CERTO NO JAVASCRIPT (Usando comentário de documentação)
    // Se você usa VS Code, isso ajuda o editor a te avisar se errar o nome.
    /** @override */
    fazerBarulho() {
        console.log("Au Au!");
    }

    // ❌ JEITO ERRADO (Isso funciona em Java, mas quebra o JS)
    // @Override 
    // fazerBarulho() { ... }

    // Método exclusivo (Só cachorro tem, o Animal genérico não tem)
    buscarBolinha() {
        if (this.energia > 0) {
            console.log(`${this.nome} correu atrás da bolinha!`);
            this.energia -= 2; // Gasta energia
        } else {
            console.log(`${this.nome} está cansado demais.`);
        }
    }
}


// ----------------------------------------------------------------------------
// 3. TESTANDO (O QUE ACONTECE NA PRÁTICA)
// ----------------------------------------------------------------------------

// Criando um Animal Genérico
let bicho = new Animal("Ser Vivo Genérico");
bicho.fazerBarulho(); // Saída: "Som genérico de animal."
// bicho.buscarBolinha(); // ERRO! A classe pai não tem métodos do filho.


// Criando um Cachorro (Herda tudo de Animal + suas próprias coisas)
let rex = new Cachorro("Rex", "Pastor Alemão");

// Teste 1: Usando coisa do Pai (Herança)
// O cachorro não tem o método 'comer' escrito nele, mas ele herdou de Animal.
rex.comer(); // Saída: "Rex está comendo..." (Funcionou!)

// Teste 2: Usando coisa sobrescrita (Polimorfismo)
rex.fazerBarulho(); // Saída: "Au Au! (Latindo)" (Usou a versão do filho)

// Teste 3: Usando coisa exclusiva do Filho
rex.buscarBolinha(); // Saída: "Rex correu atrás da bolinha!"

console.log(rex); 
// Veja que ele tem: nome (do pai), energia (do pai) e raca (dele mesmo).