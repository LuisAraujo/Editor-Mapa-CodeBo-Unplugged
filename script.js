let mapa = [];
let mapa2 = [];
let tamanhoQuadrado = 100;

alert("Atenção: Este editor ainda não armazena informações");

// Referências de imagens
let imagemInicio = document.getElementById('img-inicio');
let imagemMar = document.getElementById('img-mar');
let imagemMato = document.getElementById('img-mato');
let imagemBandeira = document.getElementById('img-bandeira');
let imagemMato2 = document.getElementById('img-mato2');
let imagemPraia = document.getElementById('img-praia');
let imagemPraia2 = document.getElementById('img-praia2');
let imagemPraia3 = document.getElementById('img-praia3');
let imagemPraia4 = document.getElementById('img-praia4');
let imagemPraia5 = document.getElementById('img-praia5');
let imagemPraia6 = document.getElementById('img-praia6');
let img_logo = document.getElementById("logo");
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let largura = 0;
let altura = 0;

// Função para adicionar botões ao mapa
let imagemSelecionada = null;
let nivelSelecionado = null;
const containerBtnn = document.getElementById('container-btnn');
const container2Btnn = document.getElementById('container2-btnn');

function gerarMapa() {
    largura = document.getElementById('width').value;
    altura = document.getElementById('height').value;
    if(altura > 4){
        alert("Altura acima do máximo (4)");
        return;
    }else if(largura > 6){
        alert("Largura acima do máximo (6)");
        return;
    }
    inicializadorArray(largura, altura);

    if (largura <= 0 || altura <= 0) {
        alert("Largura e altura devem ser maiores que zero.");
        return;
    } else {
        largura = parseInt(largura);
        altura = parseInt(altura);
        if (isNaN(largura) || isNaN(altura)) {
            alert("Por favor, insira apenas números.");
            return;
        }
    }

    canvas.width = largura * tamanhoQuadrado;
    canvas.height = altura * tamanhoQuadrado;
    ctx.strokeStyle = '#a2d5a2';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    printMapa();
}

function inicializadorArray(largura, altura) {
    for (var x = 0; x < largura; x++) {
        mapa[x] = [];
        mapa2[x] = [];
        for (var y = 0; y < altura; y++){
            mapa[x].push("vazio");
            mapa2[x].push("vazio");
        }
    }
}

function printMapa() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var x = 0; x < largura; x++) {
        for (var y = 0; y < altura; y++) {
            let posX = x * tamanhoQuadrado;
            let posY = y * tamanhoQuadrado;

            if (mapa[x][y] == "vazio") {
                ctx.strokeRect(posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            } else if (mapa[x][y] == "inicio") {
                ctx.drawImage(imagemInicio, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            } else if (mapa[x][y] == "mar") {
                ctx.drawImage(imagemMar, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            } else if (mapa[x][y] == "mato") {
                ctx.drawImage(imagemMato, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            } else if (mapa[x][y] == "bandeira") {
                ctx.drawImage(imagemBandeira, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            } else if (mapa[x][y] == "mato2") {
                ctx.drawImage(imagemMato2, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            } else if (mapa[x][y] == "praia") {
                ctx.drawImage(imagemPraia, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            }else if (mapa[x][y] == "praia2") {
                ctx.drawImage(imagemPraia2, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            }else if (mapa[x][y] == "praia3") {
                ctx.drawImage(imagemPraia3, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            }else if (mapa[x][y] == "praia4") {
                ctx.drawImage(imagemPraia4, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            }else if (mapa[x][y] == "praia5") {
                ctx.drawImage(imagemPraia5, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            }else if (mapa[x][y] == "praia6") {
                ctx.drawImage(imagemPraia6, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            }
            ctx.font = "50px Arial serif";
            ctx.fillStyle = "white";

            posX += tamanhoQuadrado/2-10;
            posY += tamanhoQuadrado/2+10;
            console.log(mapa2[x][y], posX, posY );
            if(mapa2[x][y] == "1") {
                ctx.fillText("1", posX, posY);
            }else if(mapa2[x][y] == "2") {
                ctx.fillText("2", posX, posY);
            }else if(mapa2[x][y] == "3") {
                ctx.fillText("3", posX, posY);
            }else if(mapa2[x][y] == "4") {
                ctx.fillText("4", posX, posY);
            } 
        }
    }
}

// Salvar em PDF
async function exportarMapa() {
    const canvas = document.getElementById('canvas');
    const titulo = document.getElementById('name').value.trim();

    if (!titulo) {
        alert("Por favor, insira um título para salvar o mapa.");
        return;
    }

    const imgData = canvas.toDataURL('image/png', 1.0);
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const orientation = 'l'; //canvasWidth > canvasHeight ? 'l' : 'p';

    const pdf = new jspdf.jsPDF({
        orientation: orientation,
        unit: 'px',
        format: 'a4'
        //format: [canvasWidth, canvasHeight]
    });

    pdf.addImage(imgData, 'JPEG', 5, 5, canvasWidth, canvasHeight);
    pdf.addImage(img_logo, 'JPEG', 5, canvasHeight + 5, 200, 50);
    nome = document.getElementById("name").value;
    pdf.text(nome, 200 , canvasHeight + 20);
    
    pdf.save(`${titulo}.pdf`);
}

// Seleção de botões
containerBtnn.addEventListener('click', (event) => {
    const botaoClicado = event.target.closest('.btnn');
     nivelSelecionado = null;
    if (botaoClicado) {
        const imagemDoBotao = botaoClicado.querySelector('img');
        imagemSelecionada = imagemDoBotao;

        const botoes = document.querySelectorAll('.btnn');
        botoes.forEach(btn => {
            btn.classList.remove('selecionado');
        });
        
        botaoClicado.classList.add('selecionado');
    }
});

// Seleção de botões
container2Btnn.addEventListener('click', (event) => {
    const botaoClicado = event.target.closest('.btnn');
    
    if (botaoClicado) {
        const imagemDoBotao = botaoClicado.querySelector('img');
        nivelSelecionado = imagemDoBotao;

        const botoes = document.querySelectorAll('.btnn');
        botoes.forEach(btn => {
            btn.classList.remove('selecionado');
        });
        
        botaoClicado.classList.add('selecionado');
    }
});

// Inserção de imagens no mapa
canvas.addEventListener('click', (event) => {
    if (imagemSelecionada || nivelSelecionado) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const posX = Math.floor(x / tamanhoQuadrado) * tamanhoQuadrado;
        const posY = Math.floor(y / tamanhoQuadrado) * tamanhoQuadrado;
        var value;
        if(imagemSelecionada){
            value = imagemSelecionada.getAttribute('value');
            mapa[posX / 100][posY / 100] = value;
        }
        
        if(nivelSelecionado){
            value = nivelSelecionado.getAttribute('value');
            mapa2[posX / 100][posY / 100] = value;
        }
        

        printMapa();
    }
});

function salvarMapa() {
    /*todo: depois mudar */
    nome = document.getElementById("name").value;
    
    id_usuario = 1;
    tipo = document.getElementById("tipo").value;

    fetch("salvarMapa.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: 
        "nome=" + encodeURIComponent(nome) +
        "&mapa=" + encodeURIComponent(mapa.toString()) +
        "&tipo=" + encodeURIComponent(tipo) +
        "&idusuario=" + encodeURIComponent(id_usuario)
    })
.then(response => {
    if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo: ' + response.statusText);
    }
    return response.text(); 
})
.then(texto => {
    console.log("Texto recebido:", texto);
})
.catch(error => {
    console.error("Erro:", error);
});

}

function listarMapas() {


    fetch("")
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo: ' 
                + response.statusText);
        }
        return response.json(); //text, blob ou json...
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
         console.log(error);
    });
}