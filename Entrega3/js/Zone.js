class Zone {
    constructor(x, y, width, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.ctx = ctx;
        this.image = new Image();
        this.isChipInside = false;
        this.chip = null;
    }

    setChip(chip) {
        this.chip = chip;
    }

    getChip() {
        return this.chip;
    }
   

    drawImg(img){
        if(this.image.src===''){
            this.image.src=img;
            let loadImg= function (){
                this.ctx.drawImage(this.image, this.x,this.y,this.width,this.width)
            }
            this.image.onload=loadImg.bind(this);
        } else this.ctx.drawImage(this.image, this.x,this.y,this.width,this.width)
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.width);
        this.ctx.strokeStyle='white';
        this.ctx.stroke();
        this.ctx.fillStyle='blue';
        this.ctx.fill();
    }
}

