(function () {
    const arena = document.querySelector('#arena');
    const ctx = arena.getContext('2d');
    let contadorColisoes = 0;

    const r2d2Image = new Image();
    const roboR2D2 = new Robo('BB-8',885, 180, r2d2Image, 5, ctx, arena);

    const bb8Image = new Image();
    const roboBB8 = new Robo('R2-D2', -35, 180, bb8Image, 5, ctx, arena);

    bb8Image.width = 150;
    bb8Image.height = 120;
    bb8Image.src = './imgs/BB8.png';

    
    roboBB8.desenharRobo();
    bb8Image.onload = () => {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'a':
                    roboBB8.moveLeft = true;
                    break;
                case 'w':
                    roboBB8.moveUp = true;
                    break;
                case 'd':
                    roboBB8.moveRight = true;
                    break;
                case 's':
                    roboBB8.moveDown = true;
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'a':
                    roboBB8.moveLeft = false;
                    break;
                case 'w':
                    roboBB8.moveUp = false;
                    break;
                case 'd':
                    roboBB8.moveRight = false;
                    break;
                case 's':
                    roboBB8.moveDown = false;
                    break;
            }
        });

    };




    r2d2Image.width = 150;
    r2d2Image.height = 120;
    r2d2Image.src = './imgs/R2D2.png';

    
    roboR2D2.desenharRobo();
    r2d2Image.onload = () => {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    roboR2D2.moveLeft = true;
                    break;
                case 'ArrowUp':
                    roboR2D2.moveUp = true;
                    break;
                case 'ArrowRight':
                    roboR2D2.moveRight = true;
                    break;
                case 'ArrowDown':
                    roboR2D2.moveDown = true;
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    roboR2D2.moveLeft = false;
                    break;
                case 'ArrowUp':
                    roboR2D2.moveUp = false;
                    break;
                case 'ArrowRight':
                    roboR2D2.moveRight = false;
                    break;
                case 'ArrowDown':
                    roboR2D2.moveDown = false;
                    break;
            }
        });

        function determinarVencedor(robo1, robo2){


            if(robo1.vida > robo2.vida){
                return robo1;
            } else if (robo2.vida > robo1.vida){
                return robo2;
            }
              

        }


        function animar() {
            ctx.clearRect(0, 0, arena.width, arena.height);
            roboBB8.movimentarRoboDaDireita();
            roboR2D2.movimentarRoboDaEsquerda();

            roboBB8.reconheceColisao(roboR2D2);

            roboBB8.desenharRobo();
            roboR2D2.desenharRobo();
            requestAnimationFrame(animar);
        }

        animar();
    };
})();
