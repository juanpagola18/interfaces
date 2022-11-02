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
    getMiddleX(sizeOfZone) {
        return this.x + sizeOfZone / 2;
    }

    getMiddleY(sizeOfZone) {
        return this.y + sizeOfZone / 2;
    }

    setIsChipInside(bool) {
        this.isChipInside = bool;
    }

    setChip(chip) {
        this.chip = chip;
    }

    getChip() {
        return this.chip;
    }


    drawImg(img) {
        if (this.image.src === '') {
            this.image.src = img;
            let loadImg = function () {
                this.ctx.drawImage(this.image, this.x, this.y, this.width, this.width)
            }
            this.image.onload = loadImg.bind(this);
        } else this.ctx.drawImage(this.image, this.x, this.y, this.width, this.width)
    }

    draw() {
        // this.ctx.beginPath();
        // this.ctx.rect(this.x, this.y, this.width, this.width);
        // this.ctx.strokeStyle = 'white';
        // this.ctx.stroke();
        // this.ctx.fillStyle = 'blue';
        // this.ctx.fill();
        // this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(this.x+this.width/2, this.y+this.width/1.5);
        this.ctx.lineTo(this.x+5, this.y);
        this.ctx.lineTo(this.x+this.width-5, this.y);
        this.ctx.fill();
    }

}

