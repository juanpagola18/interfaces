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

    const SIZEPOSBOARD = 50;
    const SIZECHIP = 25;

    let widthBoard = columns * SIZEPOSBOARD;
    let heigthBoard = rows * SIZEPOSBOARD;

    let player1 = new Player("user1", 1);
    let chipsPlayer1 = [];

    let player2 = new Player("user2", 2);
    let chipsPlayer2 = [];

    let playerTurn = player1;
    let chipsPlayed = 0;

    //ficha jugandose actualmente
    let lastChipSelected;
    let isMouseDown = false;

    //ubicacion x y inicial del tablero
    let locationBoardX = (canvasWidth / 2) - (((columns) * SIZEPOSBOARD) / 2);
    let locationBoardY = canvasHeight / 2 - (((SIZEPOSBOARD) * (rows)) / 2);

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
        setInterval(drawChips, 20)
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
            locationChipX-=SIZEPOSBOARD*columns+SIZEPOSBOARD;
            locationChipY+=SIZEPOSBOARD;
            figures.push(aux);
        }
        drawDropZone();
        console.log(board);
        initChips();
        console.log(chipsPlayer1);
        console.log(chipsPlayer2);
        console.log(figures);
    }

    function initChips(){
        for (let i = 0; i < maxChips/2; i++) {
            //fichas jugador1

            let posX=locationBoardX-SIZEPOSBOARD- Math.round(Math.random()*SIZEPOSBOARD*2);
            let posY=Math.round(Math.random()*(heigthBoard-SIZEPOSBOARD))+locationBoardY+SIZEPOSBOARD/2;
            let singleChipP1= new Chip(posX,posY,SIZECHIP,ctx,player1);
            chipsPlayer1.push(singleChipP1);

            //fichas jugador 2
            posX= locationBoardX+widthBoard+SIZEPOSBOARD+ Math.round(Math.random()*SIZEPOSBOARD*2);
            posY= Math.round(Math.random()*(heigthBoard-SIZEPOSBOARD))+locationBoardY+SIZEPOSBOARD/2;
            let singleChipP2= new Chip(posX,posY,SIZECHIP,ctx,player2);
            chipsPlayer2.push(singleChipP2);

        }

        drawChips();
    }

    //agrega fondo de board

    function addZone(locationChipX,locationChipY){
        let rectangle= new Zone(locationChipX,locationChipY,SIZEPOSBOARD,ctx);
        board.push(rectangle);
        drawBoard();
        return rectangle;
    }

    //metodos dibujar

    function clearCanvas(){
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
    }

    function drawDropZone(){
        for (let c = 0; c < columns; c++) {
            let x= locationBoardX+(c*SIZEPOSBOARD);
            let y = locationBoardY - SIZEPOSBOARD;
            let zone= new Zone(x,y, SIZEPOSBOARD,ctx);
            zone.draw();
            dropZone.push(zone);         
        }
    }

    function drawChips(){
        for (let i = 0; i < chipsPlayer1.length; i++) {
            chipsPlayer1[i].drawImg(imgPlayer1);
            chipsPlayer2[i].drawImg(imgPlayer2);            
        }
    }

    function drawBoard(){
        for (let i = 0; i < board.length; i++) {
            board[i].drawImg(imgBoard);
        }
    }
    function initEvents(){
        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mouseup', onMouseUp, false);
        canvas.addEventListener('mousemove', onMouseMove, false);
    }
   
    function onMouseDown(event){
            isMouseDown = true;
        for (var i = 0; i < chipsPlayer1.length; i++) {
           
          if (
            chipsPlayer1[i].isCliked(event.clientX,event.clientY)
         ) {
            console.log("holaaa")
            selectedChip = chipsPlayer1[i];
            console.log(chipsPlayer1[i])
            console.log(selectedChip);
            inicioY = event.clientY - chipsPlayer1[i].y;
            console.log(inicioY);
            inicioX = event.clientX - chipsPlayer1[i].x;
            console.log(inicioX);
            i = chipsPlayer1.length;
          }
        }
      }

      function onMouseMove(event) {
        console.log("sadsda")   
        if (selectedChip != null) {
            selectedChip.x = event.clientX - inicioX;
            selectedChip.y = event.clientY - inicioY;
            console.log(selectedChip);
        }
        clearCanvas();
        drawChips();
        drawBoard();
        drawDropZone();
      }

      function onMouseUp(event)  {
          selectedChip = null;
      }
    
    //......................................

    










    // for (i = 0; i < 15; i++) {
    //     let circulo = new Circulo(ctx, Math.round(Math.random() * canvasWidth), Math.round(Math.random() * canvasHeight)
    //         , Math.round(Math.random() * 50));
    //     circulo.dibujarCirculo();
    //     arrObjects.push(circulo);
    // }





}











