// =============================================================================
// 1. BUSCA DE ELEMENTOS NO HTML (DOM)
// =============================================================================
// Aqui criamos variáveis que representam os botões e inputs da tela.
// Isso evita ter que digitar "document.getElementById" toda hora.

// --- Operações de Estacionamento (Entrada e Saída) ---
btRegistraEntrada = document.getElementById("registrarEntrada"); // Botão para confirmar entrada
placaEntrada = document.getElementById("placaEntrada");          // Campo de texto da placa (Entrada)
btRegistraSaida = document.getElementById("registrarSaida");     // Botão para confirmar saída
placaSaida = document.getElementById("placaSaida");              // Campo de texto da placa (Saída)

// --- Relatórios e Listagens ---
btExibirVeiculos = document.getElementById("ExibirVeiculos");    // Botão listar todos os cadastros
btExibirVeiculosEstacionados = document.getElementById("ExibirVeiculosEstacionados"); // Botão listar quem está no pátio
btExibirHistoricoVeiculo = document.getElementById("ExibirHistoricoVeiculo"); // Botão histórico de 1 carro
HistoricoPlaca = document.getElementById("HistoricoPlaca");      // Campo da placa para busca de histórico

// --- Cadastro de Novo Veículo ---
btSalvarveiculo = document.getElementById("CadastrarVeiculo");   // Botão salvar novo veículo
radioCarro = document.getElementById("radioCarro");              // Seleção (bolinha) Carro
radioMoto = document.getElementById("radioMoto");                // Seleção (bolinha) Moto
radioCaminhao = document.getElementById("radioCaminhao");        // Seleção (bolinha) Caminhão


// =============================================================================
// 2. CONTROLE VISUAL (Esconder/Mostrar campos de cadastro)
// =============================================================================

function alteraTipoVeiculo(event) {
    // Primeiro, esconde (none) as divs de TODOS os tipos para limpar a tela.
    document.getElementById('divradioCarro').style.display = 'none';
    document.getElementById('divradioMoto').style.display = 'none';
    document.getElementById('divradioCaminhao').style.display = 'none';
    
    // TRUQUE: Pega o ID do botão clicado (ex: "radioMoto") e junta com "div".
    // O resultado vira "divradioMoto", que é o ID da div que queremos mostrar.
    document.getElementById('div' + event.currentTarget.id).style.display = 'block';
}

// "Listeners": Ficam vigiando. Se mudar a seleção (change), roda a função acima.
radioCarro.addEventListener("change", alteraTipoVeiculo)
radioMoto.addEventListener("change", alteraTipoVeiculo)
radioCaminhao.addEventListener("change", alteraTipoVeiculo)


// =============================================================================
// 3. FUNÇÕES DE LIGAÇÃO (Botões -> Lógica do Sistema)
// =============================================================================
// Essas funções servem apenas para pegar o valor do HTML e mandar para a classe 'estacionamento'.

// Botão ENTRADA: Manda a placa digitada para o método registrarEntrada
function registrarEntradaVeiculos() {
      estacionamentoAvCentral.registrarEntrada(placaEntrada.value)
}
btRegistraEntrada.addEventListener('click', registrarEntradaVeiculos)

// Botão SAÍDA: Manda a placa digitada para o método registrarSaida
function registrarSaidaVeiculos() {
      estacionamentoAvCentral.registrarSaida(placaSaida.value)
}
btRegistraSaida.addEventListener('click', registrarSaidaVeiculos)

// Botão HISTÓRICO: Busca histórico de uma placa específica
function ExibirHistoricoVeiculo() {
     estacionamentoAvCentral.registrosPorPlaca(HistoricoPlaca.value)
}
btExibirHistoricoVeiculo.addEventListener('click', ExibirHistoricoVeiculo)

// Botão LISTAR TODOS: Mostra lista de veiculos cadastrados (geral)
function ExibirVeiculos() {
     estacionamentoAvCentral.listarTodosCarros()
}
btExibirVeiculos.addEventListener('click', ExibirVeiculos)

// Botão NO PÁTIO: Mostra apenas quem está estacionado agora
function ExibirVeiculosEstacionados() {
     estacionamentoAvCentral.carrosAtualmenteEstacionados()
}
btExibirVeiculosEstacionados.addEventListener('click', ExibirVeiculosEstacionados)


// =============================================================================
// 4. LÓGICA DE CADASTRO (Salvar Veículo)
// =============================================================================

function salvarVeiculo() {
    // 1. Pega os dados comuns (que todo veículo tem)
    const placa = document.getElementById('NovoVeiculoPlaca').value
    const modelo = document.getElementById('NovoVeiculoModelo').value
    const cor = document.getElementById('NovoVeiculoCor').value
    const ano = document.getElementById('NovoVeiculoAno').value

    let novoVeiculo = null // Variável vazia para receber o objeto criado

    // 2. Verifica qual tipo foi selecionado e cria o objeto da classe correta
    if (document.getElementById('radioCarro').checked) {
        // Pega dados exclusivos de Carro
        const precisaCarregamentoEletrico = document.getElementById('NovoVeiculoCarregamentoE').value
        const quantasPortas = document.getElementById('NovoVeiculoQtsPortas').value
        // Instancia a classe 'carro'
        novoVeiculo = new carro(placa, cor, modelo, ano, precisaCarregamentoEletrico, quantasPortas, "carro")
    }
    else if (document.getElementById('radioMoto').checked) {
        // Pega dados exclusivos de Moto e instancia a classe 'motocicleta'
        const tipoVaga = document.getElementById('NovoVeiculoTipoVaga').value
        const quantasVagasNecessita = document.getElementById('NovoVeiculoQtsVagas').value
        novoVeiculo = new motocicleta(placa, cor, modelo, ano, tipoVaga, quantasVagasNecessita)
    }
    else if (document.getElementById('radioCaminhao').checked) {
        // Pega dados exclusivos de Caminhão e instancia a classe 'caminhao'
        const qtdEixos = document.getElementById('NovoVeiculoEixos').value
        const altura = document.getElementById('NovoVeiculoAltura').value
        const comprimento = 0 // Valor fixo (placeholder) pois não tinha campo na tela
        novoVeiculo = new caminhao(placa, cor, modelo, ano, qtdEixos, altura, comprimento)
    }

    // 3. Validação: Verifica se a placa já existe na lista global
    let novoVeiculoLista = placaCadastrada(placa)
    if (novoVeiculoLista != undefined) {
        alert('Essa placa já está cadastrada')
        return; // Para a execução se já existir
    }
    
    // 4. Validação: Se não selecionou nenhum tipo, avisa o usuário
    if (novoVeiculo == null) {
        alert("Selecione o tipo de veículo!")
        return
    }

    // 5. Sucesso: Adiciona na lista global (Set) e avisa
    listaVeiculos.add(novoVeiculo)
    alert("Veículo cadastrado com sucesso!")
}

// Função auxiliar para procurar se uma placa já existe na lista
function placaCadastrada(placa) {
    let veiculoEncontrado = undefined
    // Percorre a lista de veículos cadastrados
    listaVeiculos.forEach(element => {
        //No contexto do seu código, element.placa é o número da placa 
        // do veículo que o programa está examinando naquele exato momento dentro de um loop.
        //Dentro da função forEach, o element é um apelido temporário para o item 
        // da lista que está sendo lido agora.
        // Compara as placas (converte para minúsculo para evitar erro de digitação)
        if (element.placa.toString().toLowerCase() == placa.toString().toLowerCase())
            veiculoEncontrado = element;
    });
    return veiculoEncontrado; // Retorna o objeto se achar, ou undefined
}

btSalvarveiculo.addEventListener("click", salvarVeiculo)


// =============================================================================
// 5. CLASSES (POO - Definição dos Veículos)
// =============================================================================

// Classe PAI (Genérica)
class veiculo {
    placa
    cor
    modelo
    ano
    constructor(placa, cor, modelo, ano) {
        this.placa = placa
        this.cor = cor
        this.modelo = modelo
        this.ano = ano
    }
}

// Classe FILHA: Moto (Estende Veiculo)
class motocicleta extends veiculo {
    tipoVaga
    quantasVagasNecessita
    constructor(placa, cor, modelo, ano, tipoVaga, quantasVagasNecessita) {
        super(placa, cor, modelo, ano) // Chama o construtor do pai
        this.tipoVaga = tipoVaga
        this.quantasVagasNecessita = quantasVagasNecessita
    }
}

// Classe FILHA: Carro (Estende Veiculo)
class carro extends veiculo {
    precisaCarregamentoEletrico = false
    quantasPortas
    tipoVeiculo

    constructor(placa, cor, modelo, ano, precisaCarregamentoEletrico, quantasPortas, tipoVeiculo) {
        super(placa, cor, modelo, ano)
        this.precisaCarregamentoEletrico = precisaCarregamentoEletrico
        this.quantasPortas = quantasPortas
        this.tipoVeiculo = tipoVeiculo
    }
}

// Classe FILHA: Caminhão (Estende Veiculo)
class caminhao extends veiculo {
    qtdEixos
    altura
    comprimento

    constructor(placa, cor, modelo, ano, qtdEixos, altura, comprimento) {
        super(placa, cor, modelo, ano)
        this.qtdEixos = qtdEixos
        this.altura = altura
        this.comprimento = comprimento
    }
}


// =============================================================================
// 6. CLASSES DE CONTROLE (O Estacionamento em si)
// =============================================================================

// Classe REGISTRO: Representa o "ticket" de estacionamento (uma entrada)
class registroEstacionamento {
    dataIn           // Hora que entrou
    dataOut = false  // Hora que saiu (começa false pq ainda não saiu)
    veiculoEstacionado // Guarda o objeto do carro inteiro

    constructor(veiculoEstacionado, data = new Date()) {
        this.veiculoEstacionado = veiculoEstacionado
        this.dataIn = data
    }

    registrarSaida(data = new Date()) {
        this.dataOut = data
    }
}

// Classe GERENTE: Controla as listas e operações
class estacionamento {
    listaEntradas = new Set() // Histórico de todas as entradas (Set não permite duplicatas)
    relatorio // Elemento HTML onde o texto será escrito

    constructor() {
        this.relatorio = document.getElementById('relatorios')
    }

    // -- Método: Registrar Entrada --
    registrarEntrada(placa, data = new Date()) {
        let veiculoIn = placaCadastrada(placa) // Busca no cadastro geral
        if(!veiculoIn) {
            alert('Veiculo não encontrado no cadastro. Cadastre primeiro!')
            return;
        }
        // Cria um novo ticket (registro) e guarda na lista de entradas
        this.listaEntradas.add(new registroEstacionamento(veiculoIn) )
    }

    // -- Método: Registrar Saída --
    registrarSaida(placa, data = new Date()) {
        let registroEst =  this.buscaVeiculo(placa) // Busca se o carro está no pátio
        if(!registroEst) {
            alert('Veiculo não encontrado no pátio')
            return;
        }
        registroEst.registrarSaida(data) // Marca a hora de saída no ticket
    }    

    // -- Método Auxiliar: Buscar na lista de entradas --
    buscaVeiculo(placa) {
        let veiculoEncontrado = undefined
        this.listaEntradas.forEach(element => {
            // Verifica a placa para achar o ticket correto
            if (element.veiculoEstacionado.placa.toString().toLowerCase() == placa.toString().toLowerCase())
                veiculoEncontrado = element;
        });
        return veiculoEncontrado;
    }

    // -- RELATÓRIOS --
    // JSON.stringify converte o objeto em texto para aparecer na tela

    // Lista quem está no pátio (quem ainda não tem dataOut)
    carrosAtualmenteEstacionados() {
        this.relatorio.innerHTML = ''
        this.listaEntradas.forEach(v => { 
            if(!v.dataOut) this.relatorio.innerHTML += JSON.stringify(v) +'<br><br>'
        })
    }

    // Lista histórico filtrado por uma placa
    registrosPorPlaca(placa) {
        this.relatorio.innerHTML = ''
        this.listaEntradas.forEach(v => { 
            if(v.veiculoEstacionado.placa == placa) this.relatorio.innerHTML += JSON.stringify(v) +'<br>'
        })
    }

    // Lista todos os cadastros do sistema
    listarTodosCarros() {
        this.relatorio.innerHTML = ''
        listaVeiculos.forEach(v => this.relatorio.innerHTML += JSON.stringify(v) +'<br>')
    }
}

// =============================================================================
// 7. INICIALIZAÇÃO
// =============================================================================

// Cria a lista global onde ficam os cadastros dos carros
listaVeiculos = new Set()

// Instancia o sistema de estacionamento (liga o motor do código)
estacionamentoAvCentral = new estacionamento()