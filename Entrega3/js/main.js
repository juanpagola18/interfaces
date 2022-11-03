"use strict";
document.addEventListener('DOMContentLoaded', load)

function load() {

    let canvas = document.querySelector('#canvas');
    /** @type {CanvasRenderingContext2D} */
    let ctx = canvas.getContext('2d');
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let selectedChip = null;
    let figures = [];
    let board = [];
    let imgBoard = 'img/boardCell.png';
    let imgPlayer1 = 'img/theBoysPin.png';
    let imgPlayer2 = 'img/theSeven.png';
    let inicioX = 0;
    let inicioY = 0;
    // let initialCanvasX=parX;
    // let initialCanvasY=parY;

    //luego pasar por parametro

    let columns = 7;
    let rows = 6;
    let inLine = 4;
    let maxChips = columns * rows;
    let playedChips=0;

    const SIZEPOSBOARD = 55;
    const SIZECHIP = 25;

    let widthBoard = columns * SIZEPOSBOARD;
    let heigthBoard = rows * SIZEPOSBOARD;

    let player1 = new Player("user1", 1);
    let chipsPlayer1 = [];

    let player2 = new Player("user2", 2);
    let chipsPlayer2 = [];

    let playerTurn = true;

    //ficha jugandose actualmente
    let lastChipSelected;
    let isMouseDown = false;

    //ubicacion x y inicial del tablero
    
    let locationBoardX = (canvasWidth / 2) - (((columns) * SIZEPOSBOARD) / 2);
    let locationBoardY = (canvasHeight / 2) - (((SIZEPOSBOARD) * (rows)) / 2);

    //
    initEvents();
    initBoard();

    //redibujar el canvas
    function redraw() {
        clearCanvas();
        drawBoard();
        drawDropZone();
        drawChips();


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
                //addZone dibuja el Box o Zone y lo agrega a board
                let rect = addZone(locationBoxX, locationBoxY);
                locationBoxX += SIZEPOSBOARD;
                aux.push(rect);
            }
            locationBoxX -= SIZEPOSBOARD * columns + SIZEPOSBOARD;
            locationBoxY += SIZEPOSBOARD;
            figures.push(aux);
        }
        drawDropZone();
        console.log("board: ", board);
        initChips();
        console.log("chipsPlayer1: ", chipsPlayer1);
        console.log("chipsPlayer2: ", chipsPlayer2);
        console.log("figures: ", figures);
    }

    function initChips() {
        for (let i = 0; i < maxChips / 2; i++) {
            //fichas jugador1
            let posX = locationBoardX - SIZEPOSBOARD - Math.round(Math.random() * SIZEPOSBOARD * 2);
            let posY = Math.round(Math.random() * (heigthBoard - SIZEPOSBOARD)) + locationBoardY + SIZEPOSBOARD / 2;
            let singleChipP1 = new Chip(posX, posY, SIZECHIP, ctx, player1);
            chipsPlayer1.push(singleChipP1);

            //fichas jugador 2
            posX = locationBoardX + widthBoard + SIZEPOSBOARD + Math.round(Math.random() * SIZEPOSBOARD * 2);
            posY = Math.round(Math.random() * (heigthBoard - SIZEPOSBOARD)) + locationBoardY + SIZEPOSBOARD / 2;
            let singleChipP2 = new Chip(posX, posY, SIZECHIP, ctx, player2);
            chipsPlayer2.push(singleChipP2);

        }
        drawChips();
    }

    //crea box para tablero a partir de clase zone y los mete en board=[]
    function addZone(locationChipX, locationChipY) {
        let rectangle = new Zone(locationChipX, locationChipY, SIZEPOSBOARD, ctx);
        board.push(rectangle);
        drawBoard();
        return rectangle;
    }

    //......................................................................................................
    //metodos dibujar
    function clearCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function drawDropZone() {
        for (let c = 0; c < columns; c++) {
            let x = locationBoardX + (c * SIZEPOSBOARD);
            let y = locationBoardY - SIZEPOSBOARD;
            let zone = new Zone(x, y, SIZEPOSBOARD, ctx, c);
            zone.draw();
        }
    }

    function drawChips() {
        for (let i = 0; i < chipsPlayer1.length; i++) {
            chipsPlayer1[i].drawImg(imgPlayer1);
            chipsPlayer2[i].drawImg(imgPlayer2);
        }
    }

    function drawBoard() {
        for (let i = 0; i < board.length; i++) {
            board[i].drawImg(imgBoard);
        }
    }
    //......................................................................................................


    //eventos del main? o de la ficha???
    function initEvents() {
        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('mousemove', onMouseMove);
    }

    function onMouseDown(event) {
        if (playerTurn == true) {
            for (let i = 0; i < chipsPlayer1.length; i++) {

                if (chipsPlayer1[i].isCliked(event.clientX, event.clientY)) {
                    selectedChip = chipsPlayer1[i];
                    inicioY = event.clientY - chipsPlayer1[i].y;
                    console.log(inicioY);
                    inicioX = event.clientX - chipsPlayer1[i].x;
                    console.log(inicioX);
                }
            }
        }
        else if (playerTurn == false) {
            for (var i = 0; i < chipsPlayer2.length; i++) {

                if (
                    chipsPlayer2[i].isCliked(event.clientX, event.clientY)
                ) {

                    selectedChip = chipsPlayer2[i];
                    inicioY = event.clientY - chipsPlayer2[i].y;
                    console.log(inicioY);
                    inicioX = event.clientX - chipsPlayer2[i].x;
                    console.log(inicioX);
                }
            }
        }
    }

    function onMouseMove(event) {
        if (selectedChip != null) {
            selectedChip.setX(event.clientX - inicioX);
            selectedChip.setY(event.clientY - inicioY);
            console.log(selectedChip);
        }
        redraw();
    }


    function onMouseUp(event) {
        isMouseDown = false;//revisar
        let insert = (selectedChip.getX() > locationBoardX && selectedChip.getX() < locationBoardX + widthBoard)
            && (selectedChip.getY() < locationBoardY && selectedChip.getY() > locationBoardY - SIZEPOSBOARD * 2);
        if (insert) {
            insertChip(returnColumnNum(selectedChip.getX()), selectedChip);
            changeTurn();
        } else {
            selectedChip.setX(selectedChip.getInitialX());
            selectedChip.setY(selectedChip.getInitialY());
        }
        selectedChip = null;
    }

    function changeTurn() {
        if (playerTurn == true) {
            playerTurn = false;
        }
        else if (playerTurn == false) {
            playerTurn = true;
        }
    }

    //......................................
    //Logica
    function returnColumnNum(chipX) {
        let i = 0;
        let currentCol = locationBoardX + SIZEPOSBOARD;
        if (chipX < currentCol) {
            return i
        } else {
            while (currentCol < chipX) {
                currentCol += SIZEPOSBOARD;
                i++;
            } return i;
        }
    }

    //insertar ficha
    function insertChip(numCol, chip) {
        const firstEmptyRow = getFirstEmptyRow(numCol);
       
        if (firstEmptyRow === -1) {
            chip.setX(chip.getInitialX());
            chip.setY(chip.getInitialY());
            alert('Cannot put here, it is full');
            changeTurn();
            return;
        }
        playedChips ++;
        setTimeout(()=>{
        if (playedChips==maxChips){
            alert ("empate");
            return;
        };},500)
        let box = figures[firstEmptyRow][numCol]
        //box va a ser el casillero donde "cae" la ficha
        box.setChip(chip);
        box.setIsChipInside(true);
        console.log(figures)
        chip.setX(box.getMiddleX(SIZEPOSBOARD));
        chip.setY(box.getMiddleY(SIZEPOSBOARD));
        chip.setCanMove(false);
        setTimeout(()=>{
            if(checkWinner()){
            alert("Ganador: " + chip.getPlayer().getName())
        };},500)
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
        for (var i = -(columns + 4); i < columns; i++) {
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
        for (var i = 0; i < columns + 4; i++) {
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

}








