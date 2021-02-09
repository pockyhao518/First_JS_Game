import Box from './box';
import Ball from './ball'

export default class Tetris2048{
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.restart();
        this.dropevents();
        this.cx = null;
        this.next = true;
    }
    
    play(){
        this.running = true;
        this.animate()
    }

    restart(){
        this.running = false;
        this.score = 0;
        // this.box = new Box(this.dimensions)
        this.ball = new Ball(this.dimensions)

        this.animate()
    }

    dropevents() {
        this.boundClickHandler = this.click.bind(this);
        this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
        
    }

    click(e) {
        if(this.next === true){
            this.cx = e.pageX;
            this.ball = new Ball(this.dimensions,this.cx)
        }
        
        if (!this.running) {
            this.play();
        }
        console.log(this.cx)
        this.next = false;
    }

    animate(){
        // this.box.animate(this.ctx);
        this.ball.animate(this.ctx)
        if (this.ball.y + this.ball.r < this.ball.demensions.height){
            this.next = false;
        }else{
            this.next = true;
        }
        
        
        // if(this.gameOver()){
        //     alert(this.score);
        //     this.restart()
        // }
        if (this.running){
            requestAnimationFrame(this.animate.bind(this))
        }
    }
}