const Robo = function(nome,cordX, cordY, img, velocidade, ctx, arena){

    this.nome = nome;
    this.cordX = cordX;
    this.cordY = cordY;
    this.img = img;
    this.velocidade = velocidade;
    this.ctx = ctx;
    this.vida = Math.floor(Math.random() * 21);
    this.moveLeft = false;
    this.moveUp = false;
    this.moveRight = false;
    this.moveDown = false;

    this.movimentarRoboDaDireita = function() {
        if (this.moveLeft && this.cordX > 0) {
            this.cordX -= this.velocidade;
        }

        if (this.moveUp && this.cordY > 0) {
            this.cordY -= this.velocidade;
        }

        if (this.moveRight && this.cordX + this.img.width < arena.width) {
            this.cordX += this.velocidade;
        }

        if (this.moveDown && this.cordY + this.img.height < arena.height) {
            this.cordY += this.velocidade;
        }
    }

    this.movimentarRoboDaEsquerda = function() {
        if (this.moveLeft && this.cordX > 0) {
            this.cordX -= this.velocidade;
        }

        if (this.moveUp && this.cordY > 0) {
            this.cordY -= this.velocidade;
        }

        if (this.moveRight && this.cordX + this.img.width < arena.width) {
            this.cordX += this.velocidade;
        }

        if (this.moveDown && this.cordY + this.img.height < arena.height) {
            this.cordY += this.velocidade;
        }
    }

    this.pararRoboDaEsquerda = function() {

        this.moveLeft = false;
        this.moveUp = false;
        this.moveRight = false;
        this.moveDown = false;
    }

    this.pararRoboDaDireita = function() {

        this.moveLeft = false;
        this.moveUp = false;
        this.moveRight = false;
        this.moveDown = false;
    }

    this.knockbackFrames = 0;
    const knockbackDuration = 50;
    const knockbackDistance = 200;
    const margem = 2;
    const collisionCooldown = 20;

    let collisionCooldownFrames = 0;
    let contadorColisoes = 0;
    const maxColisoes = 5;

    this.reconheceColisao = function(outroRobo) {
        if (collisionCooldownFrames > 0) {
            collisionCooldownFrames--;
            return;
        }

        const xColisao = Math.max(0, Math.min(this.cordX + this.img.width, outroRobo.cordX + outroRobo.img.width) - Math.max(this.cordX, outroRobo.cordX));
        const yColisao = Math.max(0, Math.min(this.cordY + this.img.height, outroRobo.cordY + outroRobo.img.height) - Math.max(this.cordY, outroRobo.cordY));

        if (this.knockbackFrames <= 0 && xColisao > margem && yColisao > margem) {
            let xOverlap = xColisao >= yColisao ? xColisao / 2 : 0;
            let yOverlap = xColisao < yColisao ? yColisao / 2 : 0;

            if (this.cordX + xOverlap < 0) {
                xOverlap -= this.cordX + xOverlap;
            } else if (this.cordX + this.img.width + xOverlap > arena.width) {
                xOverlap -= this.cordX + this.img.width + xOverlap - arena.width;
            }

            if (this.cordY + yOverlap < 0) {
                yOverlap -= this.cordY + yOverlap;
            } else if (this.cordY + this.img.height + yOverlap > arena.height) {
                yOverlap -= this.cordY + yOverlap;
            }

            if (xOverlap !== 0 || yOverlap !== 0) {
                this.cordX -= (xOverlap * knockbackDistance / xColisao);
                outroRobo.cordX += (xOverlap * knockbackDistance / xColisao);
                this.cordY -= (yOverlap * knockbackDistance / yColisao);
                outroRobo.cordY += (yOverlap * knockbackDistance / yColisao);
            }

            this.knockbackFrames = knockbackDuration;
            outroRobo.knockbackFrames = knockbackDuration;

            collisionCooldownFrames = collisionCooldown;
            this.vida -= 1;
            contadorColisoes++;

            if (contadorColisoes >= maxColisoes) {
                window.location.reload();
                this.moveLeft = false;
                this.moveUp = false;
                this.moveRight = false;
                this.moveDown = false;
            }
        }

        if (this.knockbackFrames > 0) {
            this.knockbackFrames--;
     
        }
    }

    this.desenharRobo = function() {
        this.ctx.drawImage(this.img, this.cordX, this.cordY, this.img.width, this.img.height);
    };
};
