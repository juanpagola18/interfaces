"use strict";
document.addEventListener('DOMContentLoaded', load)


function load() {

    let btnReset = document.getElementById('reset');
    btnReset.addEventListener('click', reset);
    let canvas = document.querySelector('#canvas');

    var pos = canvas.getBoundingClientRect();
    console.log(pos.top, pos.left)

    /** @type {CanvasRenderingContext2D} */
    let ctx = canvas.getContext('2d');
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let selectedChip = null;
    let figures = [];
    let board = [];
    let dropZone = [];
    let imgBoard = 'img/boardCell.png';
    let imgPlayer1 = 'img/theBoysPin.png';
    let imgPlayer2 = 'img/theSeven.png';
    let inicioX = 0;
    let inicioY = 0;

    //luego pasar por parametro

    let columns = 7;
    let rows = 6;
    let inLine = 4;
    let maxChips = columns * rows;

    const SIZEPOSBOARD = 55;
    const SIZECHIP = 25;

    let widthBoard = columns * SIZEPOSBOARD;
    let heigthBoard = rows * SIZEPOSBOARD;

    let player1 = new Player("user1", 1);
    let chipsPlayer1 = [];

    let player2 = new Player("user2", 2);
    let chipsPlayer2 = [];

    let playerTurn = true;
    let chipsPlayed = 0;

    //ficha jugandose actualmente
    let lastChipSelected;
    let isMouseDown = false;

    //ubicacion x y inicial del tablero
    let locationBoardX = (canvasWidth / 2) - (((columns) * SIZEPOSBOARD) / 2);
    let locationBoardY = (canvasHeight / 2) - (((SIZEPOSBOARD) * (rows)) / 2);

    //y esto?
    initEvents();
    //
    initBoard();

    //redibujar el canvas
    function redraw() {
        clearCanvas();
        drawBoard();
        drawChips();
        drawDropZone();
        
    }

    //se inicia el tablero creandolas zonas, fichas y dropZones

    function initBoard() {
        let chipsPlayed = 0;
        let locationChipX = locationBoardX;
        let locationChipY = locationBoardY;
        for (let r = 0; r < rows; r++) {
            let aux = [];
            for (let c = 0; c < columns; c++) {
                if (c == 0) {
                    locationChipX = locationBoardX;
                }
                let rect = addZone(locationChipX, locationChipY);
                locationChipX += SIZEPOSBOARD;
                aux.push(rect);
            }
            locationChipX -= SIZEPOSBOARD * columns + SIZEPOSBOARD;
            locationChipY += SIZEPOSBOARD;
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

    //agrega fondo de board

    function addZone(locationChipX, locationChipY) {
        let rectangle = new Zone(locationChipX, locationChipY, SIZEPOSBOARD, ctx);
        board.push(rectangle);
        drawBoard();
        return rectangle;
    }

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
            dropZone.push(zone);
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
    function initEvents() {
        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('mousemove', onMouseMove);
    }

    function onMouseDown(event) {
        if (playerTurn == true){
        for (var i = 0; i < chipsPlayer1.length; i++) {
           
          if (
            chipsPlayer1[i].isCliked(event.clientX+pos.left,event.clientY-pos.top)
         ) {
           
            selectedChip = chipsPlayer1[i];
            inicioY = event.clientY - chipsPlayer1[i].y;
            console.log(inicioY);
            inicioX = event.clientX - chipsPlayer1[i].x;
            console.log(inicioX);
           
          }
        }
        
    }
        else if (playerTurn == false){
            for (var i = 0; i < chipsPlayer2.length; i++) {
               
              if (
                chipsPlayer2[i].isCliked(event.clientX+pos.left,event.clientY-pos.top)
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
            && (selectedChip.getY() < locationBoardY && selectedChip.getY() > locationBoardY - SIZEPOSBOARD);
        if (insert) {
            insertChip(returnColumnNum(selectedChip.getX()), selectedChip);
            changeTurn();
        } else {
            selectedChip.setX(selectedChip.getInitialX());
            selectedChip.setY(selectedChip.getInitialY());
        }

        selectedChip = null;
        
    }


     
    function changeTurn(){
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
        console.log(firstEmptyRow)
        if (firstEmptyRow === -1) {
            chip.setX(chip.getInitialX());
            chip.setY(chip.getInitialY());
            alert('Cannot put here, it is full');
            changeTurn();
            return;
        }
        let box=figures[firstEmptyRow][numCol]
        //box va a ser el casillero donde "cae" la ficha
        box.setChip(chip);
        box.setIsChipInside(true);
        console.log(figures)
        chip.setX(box.getMiddleX(SIZEPOSBOARD));
        chip.setY(box.getMiddleY(SIZEPOSBOARD));
        chip.setCanMove(false);
        //CHECKWINNER(chip.getPlayer.getNumber) en la logica seguro buscamos por unos y dos, no?
        //la ficha tiene player, player tiene name y number (1 o 2)
    }

    function getFirstEmptyRow(numCol) {
        let i = 0;
        if (figures[i][numCol].isChipInside) {
            return -1;
        } else {
            while ((i < rows)&&(figures[i][numCol].isChipInside)===false) {
                console.log(figures[i][numCol].isChipInside)
                i++
            } 
            return i-1
        }


    }
    
    function reset(){
        chipsPlayer1= [];
        chipsPlayer2= [];
        figures= [];
        board = [];
        dropZone = [];
        chipsPlayed=0;
        playerTurn = true
        min = 2;
        sec = 59;
        initBoard();
        setTimeout(function reseted() {
            reset();
           }, 180000)
        redraw();
    }

    let minute = document.getElementById('minute');
    let second = document.getElementById('seconds');
    let min = 2;
    let sec = 59;


setInterval(function restSec(){
    if(sec >= 0){
     second.innerHTML = sec+"s";   
     minute.innerHTML = min+"m";
      sec--;
    }
  
    return;
 },1000 );

 setInterval(function restMin(){
    if(min > 0){
    
     min--;
     sec= 59;
    }
    
 },60000 );


 setTimeout(function reseted() {
   reset();
  }, 180000)







}
