class Chip {

    constructor(xPos, yPos, radius, ctx, player) {
        this.x = xPos;
        this.y = yPos;
        this.ctx = ctx;
        this.radius = radius
        this.player = player;
        this.selected = false;
        this.canMove = true;
        this.image = new Image();
        this.initialX=xPos;
        this.initialY=yPos;
    }


    getInitialX(){
        return this.initialX;
    }

    getInitialY(){
        return this.initialY;
    }

    

    getPlayer() {
        return this.player;
    }

    setCanMove(boolean) {
        this.canMove = boolean;
    }
    
    isSelected() {
        return this.selected;
    }

    setSelected(boolean) {
        this.selected = boolean;
    }

    setX(num) {
        this.x = num;
    }

    getX() {
        return this.x;
    }

    setY(num) {
        this.y = num;
    }

    getY() {
        return this.y;
    }

    setRadio(num) {
        this.radius = num;
    }

    getRadio() {
        return this.radius;
    }

    drawImg(img){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        if(this.player.getNumber()==1){
            this.ctx.fillStyle='#33BDC2';
        }else{
            this.ctx.fillStyle='#D84089';
        }
        this.ctx.fill();
        if(this.image.src===''){
            this.image.src=img;
            let loadImg= function(){
                this.ctx.drawImage(this.image,this.x-this.radius, this.y-this.radius, this.radius/.5,this.radius/.5);
            }
            this.image.onload=loadImg.bind(this);
        }else{
            this.ctx.drawImage(this.image,this.x-this.radius, this.y-this.radius, this.radius/.5,this.radius/.5);
        }
    }

    isCliked(x, y) {
        let difX = x - this.x;
        let difY = y - this.y;
        if(this.canMove){
            return Math.sqrt((difX * difX) + (difY * difY)) < this.radius;
        }else{
            return false;
        }
    }




}