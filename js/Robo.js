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

    let partidaIniciada = false;
    let inicioPartida;

    this.movimentarRoboDaDireita = function() {
        if (!partidaIniciada) {
            partidaIniciada = true;
            inicioPartida = new Date().getTime();
        }
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
        if (!partidaIniciada) {
            partidaIniciada = true;
            inicioPartida = new Date().getTime();
        }
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
            outroRobo.vida -= 1;
    
            contadorColisoes++;
    
            const divVidaElementoBB8 = document.querySelector('.vida-robo-BB8');
            const divVidaElementoR2D2 = document.querySelector('.vida-robo-R2D2');
        
            divVidaElementoBB8.textContent = `Vida: ${this.vida}`;
            divVidaElementoR2D2.textContent = `Vida: ${outroRobo.vida}`;
        }
    
        if (this.knockbackFrames > 0) {
            this.knockbackFrames--;
        }
    }

    this.mostrarDadosNoFinal = function(outroRobo) {
        const nomeRoboBB8 = document.getElementById('robo-1-nome');
        const vidaRoboBB8 = document.getElementById('robo-1-vida');
    

        nomeRoboBB8.textContent = this.nome;
        vidaRoboBB8.textContent = `Vida : ${Number(this.vida)}`;

        const nomeRoboR2D2 = document.getElementById('robo-2-nome');
        const vidaRoboR2D2 = document.getElementById('robo-2-vida');

        nomeRoboR2D2.textContent = outroRobo.nome;
        vidaRoboR2D2.textContent = `Vida : ${Number(outroRobo.vida)}`;

        const colisoesTotais = document.getElementById('colisoes-total');
        colisoesTotais.textContent = ` Total colisoes : ${Number(contadorColisoes)}`;
    }
    

    this.reconheceRoboVencedor = function(outroRobo) {

        const containerEstatisticas = document.querySelector('.container-estatisticas')
        const tempoTotalPartida = document.getElementById('tempo-total');


        const nomeVencedor = document.getElementById('vencedor-nome');


        if (contadorColisoes >= maxColisoes) {
            containerEstatisticas.classList.add('jogo-acabou');
       

            if (!this.vencedorDeclarado) {
                const duracaoPartida = (new Date().getTime() - inicioPartida) / 1000; 
                tempoTotalPartida.textContent = `Duração da partida: ${duracaoPartida.toFixed(1)} segundos`;

                if (this.vida > outroRobo.vida) {  
                    nomeVencedor.textContent = `${this.nome}`;

                } else if (outroRobo.vida > this.vida) {
                    nomeVencedor.textContent = `${outroRobo.nome}`;
                } else {
                    nomeVencedor.textContent = ("Empate! Ambos os robôs têm a mesma quantidade de vida.");
                }
                this.vencedorDeclarado = true;
            }

            this.moveLeft = false;
            this.moveUp = false;
            this.moveRight = false;
            this.moveDown = false;
            outroRobo.moveLeft = false;
            outroRobo.moveUp = false;
            outroRobo.moveRight = false;
            outroRobo.moveDown = false;

            setTimeout (()=> {

                window.location.reload();

            },3000)
        }
    }

    this.mostrarVidaNaTela = function (outroRobo) {

        const divVidaElementoBB8 = document.querySelector('.vida-robo-BB8');
        const divVidaElementoR2D2 = document.querySelector('.vida-robo-R2D2');
    
        if(!this.vidaDeclarada){
            divVidaElementoBB8.textContent = `Vida: ${this.vida}`;
            divVidaElementoR2D2.textContent = `Vida: ${outroRobo.vida}`;
        }
        this.vidaDeclarada = true;

    }


    this.vencedorDeclarado = false;
    this.vidaDeclarada = false;

    this.desenharRobo = function() {
        this.ctx.drawImage(this.img, this.cordX, this.cordY, this.img.width, this.img.height);
    };
};
