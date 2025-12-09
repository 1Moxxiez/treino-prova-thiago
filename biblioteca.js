class Livro{
    titulo;
    autor;
    disponivel; //boleano

    constructor(titulo, autor){
        this.titulo = titulo
        this.autor = autor
        this.disponivel = true
    }

    emprestar() {
        if(this.disponivel === true){
            this.disponivel = false
            return true
        } else {
            console.log(`Livro ${this.titulo} indisponível`) 
            return false
        }
        
    }

    devolver() {
        this.disponivel = true
    }
}

class Usuario {
    nome;
    matricula;
    livrosComigo = []; // Lista dos livros que estão com ele
    limiteMaximo;      // Será definido nas classes filhas

    constructor(nome, matricula){
        this.nome = nome
        this.matricula = matricula
    }

    pegarLivro(livro){
        
        if (this.livrosComigo.length >= this.limiteMaximo){
            console.log(`❌ ${this.nome} atingiu o limite de ${this.limiteMaximo} livros!`);
            return 

        }

        if (livro.emprestar()) {

            this.livrosComigo.push(livro)
            console.log(`✅ ${this.nome} pegou "${livro.titulo}". (Total: ${this.livrosComigo.length}/${this.limiteMaximo})`);
        } else {
            console.log(`⚠️ O livro "${livro.titulo}" já está emprestado para outra pessoa.`);
        }
            
       
    }

}

class Aluno extends Usuario{
    curso;

    constructor(nome, matricula, curso){
        super(nome, matricula);
        this.curso = curso;
        this.limiteMaximo = 3;
    }
}

class Professor extends Usuario {
    departamento;

    constructor(nome, matricula, departamento) {
        super(nome, matricula);
        this.departamento = departamento;
        this.limiteMaximo = 10; // Regra do Professor
    }
}



// --- TESTES ---
const livro1 = new Livro("Dom Quixote", "Cervantes");
const livro2 = new Livro("Harry Potter", "J.K. Rowling");
const livro3 = new Livro("O Pequeno Príncipe", "Exupery");
const livro4 = new Livro("Matemática 1", "Silva");


const alunoJoao = new Aluno("João", "202301", "Engenharia");
const profAlberto = new Professor("Alberto", "P-99", "Física");

alunoJoao.pegarLivro(livro1);
alunoJoao.pegarLivro(livro2);
alunoJoao.pegarLivro(livro3);
alunoJoao.pegarLivro(livro4); //erro

profAlberto.pegarLivro(livro1)
profAlberto.pegarLivro(livro4)

