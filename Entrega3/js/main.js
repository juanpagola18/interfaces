"use strict";

//manejo de pop up de ventanas del form y canvas

let form=document.querySelector("#form-mode");
let canvas = document.querySelector('#canvas');
let canvasContainer = document.querySelector('.canvas-container');
let btnPlayHelp = document.querySelector('.btn-play-help')
let play = document.querySelector('#btnPlay');
let score = document.querySelector('.score');
let playerN1 = document.querySelector('.player1');
let playerN2 = document.querySelector('.player2');
let gameMode = document.querySelector('.mode');
let settings = document.querySelector('#settings');
let timer = document.querySelector('.timer');
let stopDegree = 0;
let popUpForm = document.querySelector('.pop-up-form');

settings.addEventListener("click", showSettings)
form.addEventListener("submit", submit);
play.addEventListener("click", showForm);

function showForm(){
    canvas.classList.add('notShow');
    btnPlayHelp.classList.add('notShow');
    popUpForm.classList.remove('notShow');
    popUpForm.classList.add('show');
}

function showSettings(){
    canvas.classList.add('notShow');
    score.classList.add('notShow');
    score.classList.remove('show');
    popUpForm.classList.remove('notShow');
    popUpForm.classList.add('show');
    stopDegree = -1;
}

//envio de datos del form para cargar el canvas parametrizado

function submit(e){
    e.preventDefault();
    canvas.classList.remove('notShow');
    score.classList.remove('notShow');
    score.classList.add('show');
    popUpForm.classList.remove('show');
    popUpForm.classList.add('notShow');
    canvasContainer.classList.add('notBackground');
    let formData= new FormData(form);
    let mode=formData.get("mode");
    let player1=formData.get("player1name");
    let p1img=formData.get("p1img");
    let player2=formData.get("player2name");
    let p2img=formData.get("p2img");
    gameMode.innerHTML = "Game Mode: " + mode + " in a row";
    playerN1.innerHTML = player1;
    playerN2.innerHTML = player2;
    load(mode,player1,p1img,player2,p2img);
    stopDegree = 0;
}


//carga del canvas
function load(mode,player1name,imgP1,player2name,imgP2) {
    
    //inicio de variables y constantes
    let btnReset = document.getElementById('reset');
    btnReset.addEventListener('click', reset);
    let minute = document.getElementById('minute');
    let second = document.getElementById('seconds');
    let min = 2;
    let sec = 59;
    //uso funcion para luego obtener las posiciones top y left del canvas
    let pos = canvas.getBoundingClientRect();
    /** @type {CanvasRenderingContext2D} */
    let ctx = canvas.getContext('2d');
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let selectedChip = null;
    let figures = [];
    let board = [];
    let imgBoard = 'images/boardCell.png';
    let inicioX = 0;
    let inicioY = 0;

    //paso valores de parametros

    let inLine = mode;
    let columns= Number(inLine)+3;
    let rows = Number(inLine)+2;
    let maxChips = columns * rows;
    let imgPlayer1 = imgP1;
    let imgPlayer2 = imgP2;
    //tamaño de cada cuadrado del canvas, incluidas las dropzones, y de las fichas
    const BOXSIZE = 55;
    const CHIPSIZE = 25;
    //calculo ancho y alto del board, luego lo vamos a usar
    let widthBoard = columns * BOXSIZE;
    let heigthBoard = rows * BOXSIZE;
    //instancio players
    let player1 = new Player(player1name, 1);
    let chipsPlayer1 = [];
    let player2 = new Player(player2name, 2);
    let chipsPlayer2 = [];
    let playerTurn = 1;
    let chipsPlayed = 0;

    //ubicacion x y inicial del tablero
    let locationBoardX = (canvasWidth / 2) - ((BOXSIZE * columns) / 2);
    let locationBoardY = (canvasHeight / 2) - ((BOXSIZE * rows) / 2);

    //inicio eventos y tablero
    initEvents();
    initBoard();

    // funcion para redibujar el canvas
    function redraw() {
        clearCanvas();
        drawDropZone();
        drawChips();
        drawBoard();
    }

    //se inicia el tablero creandolas zonas, fichas y dropZones
    function initBoard() {
        let locationBoxX = locationBoardX;
        let locationBoxY = locationBoardY;
        for (let r = 0; r < rows; r++) {
            let aux = [];
            for (let c = 0; c < columns; c++) {
                if (c == 0) {
                    locationBoxX = locationBoardX;
                }
                //al instanciar, addZone dibuja el Box y lo agrega a board
                let rect = addZone(locationBoxX, locationBoxY);
                locationBoxX += BOXSIZE;
                aux.push(rect);
            }
            locationBoxX -= BOXSIZE * columns + BOXSIZE;
            locationBoxY += BOXSIZE;
            figures.push(aux);
        }
        drawDropZone();
        initChips();
        console.log("board: ", board);
        console.log("chipsPlayer1: ", chipsPlayer1);
        console.log("chipsPlayer2: ", chipsPlayer2);
        console.log("figures: ", figures);
    }
    //inicializar las fichas
    function initChips() {
        for (let i = 0; i < maxChips / 2; i++) {
            //fichas jugador1 damos un x e y random para "desparramar" las fichas de manera controlada
            let posX = locationBoardX - BOXSIZE - Math.round(Math.random() * BOXSIZE * 2);
            let posY = Math.round(Math.random() * (heigthBoard - BOXSIZE)) + locationBoardY + BOXSIZE / 2;
            let singleChipP1 = new Chip(posX, posY, CHIPSIZE, ctx, player1);//instancio la ficha
            chipsPlayer1.push(singleChipP1);
            //fichas jugador 2
            posX = locationBoardX + widthBoard + BOXSIZE + Math.round(Math.random() * BOXSIZE * 2);
            posY = Math.round(Math.random() * (heigthBoard - BOXSIZE)) + locationBoardY + BOXSIZE / 2;
            let singleChipP2 = new Chip(posX, posY, CHIPSIZE, ctx, player2);
            chipsPlayer2.push(singleChipP2);

        }
        drawChips();
    }

    //crea box para tablero a partir de clase zone y los mete en arreglo board=[]
    function addZone(locationChipX, locationChipY) {
        let rectangle = new Zone(locationChipX, locationChipY, BOXSIZE, ctx);
        board.push(rectangle);
        drawBoard();
        return rectangle;
    }

    //......................................................................................................
    //metodos dibujar
    //borra canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
    
    //dibujo dropzones en forma de triangulo
    function drawDropZone() {
        for (let c = 0; c < columns; c++) {
            let x = locationBoardX + (c * BOXSIZE);
            let y = locationBoardY - BOXSIZE;
            let zone = new Zone(x, y, BOXSIZE, ctx, c);
            zone.draw();
        }
    }

    //dibuo fichas usando imagen pasada por parametro
    function drawChips() {
        for (let i = 0; i < chipsPlayer1.length; i++) {
            chipsPlayer1[i].drawImg(imgPlayer1);
            chipsPlayer2[i].drawImg(imgPlayer2);
        }
    }
    //tablero
    function drawBoard() {
        for (let i = 0; i < board.length; i++) {
            board[i].drawImg(imgBoard);
        }
    }
    //......................................................................................................


    //eventos del canvas para interactuar con las fichas
    function initEvents() {
        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('mousemove', onMouseMove);
    }

    function onMouseDown(event) {
        //mientras tengo presionado, controlo el turno
        if (playerTurn == 1) {
            for (var i = 0; i < chipsPlayer1.length; i++) {
                if (//pregunto a cada ficha del arreglo si esta cliqueada
                    chipsPlayer1[i].isCliked((event.clientX- pos.left), (event.clientY - pos.top))
                ) {//esa ficha la selecciono
                    selectedChip = chipsPlayer1[i];
                    inicioY = event.clientY - chipsPlayer1[i].y;
                    inicioX = event.clientX - chipsPlayer1[i].x;
                }
            }

        }
        //idem player2
        else if (playerTurn == 2) {
            for (var i = 0; i < chipsPlayer2.length; i++) {
                if (
                    chipsPlayer2[i].isCliked((event.clientX - pos.left), (event.clientY - pos.top))
                ) {
                    selectedChip = chipsPlayer2[i];
                    inicioY = event.clientY - chipsPlayer2[i].y;
                    inicioX = event.clientX - chipsPlayer2[i].x;
                }
            }
        }
    }

    function onMouseMove(event) {
        //voy seteando x e y de la ficha seleccionada mientras muevo
        if (selectedChip != null) {
            selectedChip.setX(event.clientX - inicioX);
            selectedChip.setY(event.clientY - inicioY);
            console.log(selectedChip);
        }
        //funcion que redibuja en cada desplazamiento todo
        redraw();
    }

    //al soltar la ficha
    function onMouseUp(event) {
        //calculo que este en zona donde puede insertarse
        let canInsert = (selectedChip.getX() > locationBoardX && selectedChip.getX() < locationBoardX + widthBoard)
            && (selectedChip.getY() < locationBoardY && selectedChip.getY() > locationBoardY - BOXSIZE * 2);
        if (canInsert) {
            //lamo la funcion que inserta la ficha y luego cambio turno
            insertChip(returnColumnNum(selectedChip.getX()), selectedChip);
            changeTurn();
        } else {
            //devuelvo la ficha a su pos inicial
            selectedChip.setX(selectedChip.getInitialX());
            selectedChip.setY(selectedChip.getInitialY());
        }
        selectedChip = null; 
    }

    //cambio de turno
    function changeTurn() {
        if (playerTurn == 1) {
            playerTurn = 2;
        }
        else
            playerTurn = 1;
    }

    //......................................
    //Logica
    function returnColumnNum(chipX) {
        let i = 0;
        let currentCol = locationBoardX + BOXSIZE;
        if (chipX < currentCol) {
            return i
        } else {
            while (currentCol < chipX) {
                currentCol += BOXSIZE;
                i++;
            } return i;
        }
    }

    //insertar ficha
    function insertChip(numCol, chip) {
        //agarro primera fila vacia, recibiendo la columna que tengo que controlar por parametro
        const firstEmptyRow = getFirstEmptyRow(numCol);
        if (firstEmptyRow === -1) {//si la fila esta llena
            chip.setX(chip.getInitialX());
            chip.setY(chip.getInitialY());
            alert('Cannot put here, it is full');
            changeTurn();
            return;
        }
        chipsPlayed++;
        //lo ponemos en un timeout porque sino hace el alert antes de colocar la ficha, queda horrible.
        setTimeout(() => {
            if (chipsPlayed == maxChips) {
                alert("TIE!");
                return;
            };
        }, 400)
        let box = figures[firstEmptyRow][numCol]
        //box va a ser el casillero donde "cae" la ficha
        box.setChip(chip);//que la recibe por parametro
        box.setIsChipInside(true);
        console.log(figures)
        chip.setX(box.getMiddleX(BOXSIZE));//setea desde medio de x e y para que quede centrada la ficha
        chip.setY(box.getMiddleY(BOXSIZE));
        chip.setCanMove(false);
        setTimeout(() => {
            if (checkWinner()) {
                alert("WINNER: " + chip.getPlayer().getName());//con el nombre que se lo pide a la ficha
                reset();
            };
        }, 400)
    }

    function getFirstEmptyRow(numCol) {
        let i = 0;
        if (figures[i][numCol].isChipInside) {
            return -1;
        } else {
            while ((i < rows) && (figures[i][numCol].isChipInside) === false) {
                console.log(figures[i][numCol].isChipInside)
                i++
            }
            return i - 1
        }
    }

    //Logica del ganador
    function checkWinner() {
        //Buscamos en horizontal
        for (var f = 0; f < rows; f++) {
            var n1 = 0;
            var n2 = 0;
            for (var c = 0; c < columns; c++) {
                if (figures[f][c].getChip() == null) {
                    n1 = 0;
                    n2 = 0;
                }
                else if (figures[f][c].getChip().getPlayer().getNumber() == 1) {
                    n1++;
                    n2 = 0;
                    if (n1 == inLine)
                        return 1;
                }
                else {
                    n1 = 0;
                    n2++;
                    if (n2 == inLine)
                        return 2;
                }
            }
        }

        //Buscamos en vertical de abajo a arriba
        for (var c = 0; c < columns; c++) {
            var n1 = 0;
            var n2 = 0;
            for (var f = rows - 1; f >= 0; f--) {	//De abajo a arriba para poder cortar.
                if (figures[f][c].getChip() == null) {
                    break;	//Ya no hay mas en la columna.
                }
                else if (figures[f][c].getChip().getPlayer().getNumber() == 1) {
                    n1++;
                    n2 = 0;
                    if (n1 == inLine)
                        return 1;
                }
                else {
                    n1 = 0;
                    n2++;
                    if (n2 == inLine)
                        return 2;
                }
            }
        }

        //Buscamos en diagonal de izquierda a derecha
        for (var i = 0-inLine; i < columns; i++) {//ver la constante en cod
            var n1 = 0;
            var n2 = 0;
            for (var f = 0; f < rows; f++) {
                var c = i + f;
                if ((c < 0) || (c >= columns))
                    continue;
                if (figures[f][c].getChip() == null) {
                    n1 = 0;
                    n2 = 0;
                }
                else if (figures[f][c].getChip().getPlayer().getNumber() == 1) {
                    n1++;
                    n2 = 0;
                    if (n1 == inLine)
                        return 1;
                }
                else {
                    n1 = 0;
                    n2++;
                    if (n2 == inLine)
                        return 2;
                }
            }
        }

        //Buscamos en diagonal de derecha a izquierda
        for (var i = 0; i < (columns + inLine); i++) {
            var n1 = 0;
            var n2 = 0;
            for (var f = 0; f < rows; f++) {
                var c = i - f;
                if ((c < 0) || (c >= columns))
                    continue;
                if (figures[f][c].getChip() == null) {
                    n1 = 0;
                    n2 = 0;
                }
                else if (figures[f][c].getChip().getPlayer().getNumber() == 1) {
                    n1++;
                    n2 = 0;
                    if (n1 == inLine)
                        return 1;
                }
                else {
                    n1 = 0;
                    n2++;
                    if (n2 == inLine)
                        return 2;
                }
            }
        }
    }
    //ya la usamos antes, es la que resetea todos los valores
    function reset() {
        chipsPlayer1 = [];
        chipsPlayer2 = [];
        figures = [];
        board = [];
        chipsPlayed = 0;
        playerTurn = true
        min = 2;
        sec = 59;
        initBoard();
        redraw();
    }
    //funciones que controlan el timer
    
    let degreeSec = setInterval(function restSec() {
        if (sec >= 0) {
            second.innerHTML = sec + "s";
            minute.innerHTML = min + "m";
            sec--;
            checkFinished();
        }
        if(stopDegree === -1 ) 
        {
            clearInterval(degreeSec);
        }
    }, 1000);

    let degreeMin =setInterval(function restMin() {
        if (min > 0) {

            min--;
            sec = 59;
        }
        if(stopDegree === -1) 
        {
            clearInterval(degreeMin);
        }
    }, 60000);


    function checkFinished(){
        if(min== 0 && sec == -1){
            setTimeout(() => {
            reset();
            
            }, 1000)
            
        }
    }
 
    
}