import Ball from './ball'

export default class Tetris2048{
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.cx = null;
        this.balls = [];
        this.restart();
        this.dropevents();
        this.moveObject = [];
    }
    
    play(){
        this.running = true;
        this.animate()
    }

    restart(){
        this.running = false;
        this.score = 0;
        // this.box = new Box(this.dimensions)
        let ball = new Ball(this.dimensions)
        this.balls.push(ball)
        // this.animate()
    }

    dropevents() {
        // let ball = new Ball(this.dimensions)
        // this.balls.push(ball)
        this.boundClickHandler = this.click.bind(this);
        this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
       
    }

    click(e) {
        // this.cx = e.pageX;
        let ball = new Ball(this.dimensions)
        this.balls.push(ball)
        this.balls[this.balls.length-2].set(e.pageX);
        this.moveObject = this.balls.slice(0,this.balls.length - 1)
        if (!this.running) {
            this.play();
        }
    }

    distance(a, b) {
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }

    ballCollision() {
        for (let i = 0; i < this.moveObject.length - 1; i++) {
            for (let j = i + 1; j < this.moveObject.length; j++) {
                let ob1 = this.moveObject[i]
                let ob2 = this.moveObject[j]
                let dist = this.distance(ob1, ob2)
                let dx = ob2.x - ob1.x;
                let dy = ob2.y - ob1.y;
                if (dist < (ob1.r + ob2.r)) {
                    if(this.check(ob1,ob2)){
                        if(ob1.color === 'black'){
                            this.moveObject.splice(j, 1)
                            this.moveObject.splice(i, 1);
                            this.balls.splice(j, 1)
                            this.balls.splice(i, 1)
                        }else{
                            let midX = (ob1.x + ob2.x) / 2;
                            let midY = (ob1.y + ob2.y) / 2;
                            let newBall = new Ball(this.dimensions);
                            newBall.merge(ob2.idx);
                            newBall.x = midX;
                            newBall.y = midY;
                            newBall.idx = ob2.idx+1;
                            newBall.vx = ob2.vx;
                            newBall.vy = ob2.vy;
                            this.moveObject.splice(j,1)
                            this.moveObject.splice(i,1,newBall);
                            this.balls.splice(j,1)
                            this.balls.splice(i,1,newBall)
                        }
                        

                    }else{

                    
                    let theta1 = ob1.angle();
                    let theta2 = ob2.angle();
                    let beta = Math.atan2(ob2.y - ob1.y, ob2.x - ob1.x);
                    let m1 = ob1.r**3;
                    let m2 = ob2.r**3;
                    let v1 = ob1.speed();
                    let v2 = ob2.speed();
                    
                    let dx1F = (v1 * Math.cos(theta1 - beta) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - beta)) / (m1 + m2) * Math.cos(beta) + v1 * Math.sin(theta1 - beta) * Math.cos(beta + Math.PI / 2);
                    let dy1F = (v1 * Math.cos(theta1 - beta) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - beta)) / (m1 + m2) * Math.sin(beta) + v1 * Math.sin(theta1 - beta) * Math.sin(beta + Math.PI / 2);
                    let dx2F = (v2 * Math.cos(theta2 - beta) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - beta)) / (m1 + m2) * Math.cos(beta) + v2 * Math.sin(theta2 - beta) * Math.cos(beta + Math.PI / 2);
                    let dy2F = (v2 * Math.cos(theta2 - beta) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - beta)) / (m1 + m2) * Math.sin(beta) + v2 * Math.sin(theta2 - beta) * Math.sin(beta + Math.PI / 2);
                   
                    ob1.vx = dx1F;
                    ob1.vy = dy1F ;
                    ob2.vx = dx2F ;
                    ob2.vy = dy2F ;
                    // let normalX = dx/dist;
                    // let normalY = dy/dist;
                    // let midX = (ob1.x+ob2.x)/2;
                    // let midY = (ob1.y +ob2.y)/2;
                    // ob1.x = midX - (ob1.r * normalX);
                    // ob1.y = midY - (ob1.r * normalY);
                    // ob2.x = midX + (ob2.r * normalX);
                    // ob2.y = midY + (ob2.r * normalY);
                    // let dev = (ob1.vx - ob2.vx) * normalX;
                    // dev += (ob1.vy - ob2.vy) * normalY;
                    // let dvx = dev * normalX;
                    // let dvy = dev * normalY;
                    // ob1.vx -= dvx;
                    // ob1.vy -= dvy;
                    // ob2.vx += dvx;
                    // ob2.vy += dvy;

                    }
                    
                }
                
            }
            this.wall(this.moveObject[i]);
        }

        if (this.moveObject.length > 0)
            this.wall(this.moveObject[this.moveObject.length - 1])
    }

    wall(obj){
        if (obj.x - obj.r  < 0 ||
            obj.x + obj.r > this.dimensions.width) {
            obj.vx *= -0.8;
        }
        if (obj.y - obj.r < 0 ||
            obj.y + obj.r  > this.dimensions.height) {
            obj.vy *= -0.8;
        }
        if (obj.y + obj.r > this.dimensions.height) {
            obj.y = this.dimensions.height - obj.r;
        }
        if (obj.y - obj.r < 0) {
            obj.y = obj.r;
        }
        if (obj.x + obj.r > this.dimensions.width) {
            obj.x = this.dimensions.width - obj.r;
        }
        if (obj.x - obj.r < 0) {
            obj.x = obj.r;
        }    
    }

    ballmove() {
        this.moveObject.forEach(obj => {
        obj.x += obj.vx;
        obj.y += obj.vy;
        // this.xF(obj);
        })
       
    }

    xF(obj) {
        if (obj.vx > 0)
            obj.vx -= 0.1;
        if (obj.vx < 0)
            obj.vx += 0.1;
            if(Math.abs(obj.vx) < 0.5&&(obj.y + obj.r) >= this.dimensions.height){
                obj.vx = 0;
            }
    }

    check(ob1,ob2){
        return ob1.color === ob2.color;
    }

    animate(){
        // this.box.animate(this.ctx);
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        // this.ball.animate(this.ctx); 
        this.ballmove();
        this.ballCollision();
        // this.ballmove();
        this.moveObject.forEach(ball=>{
                ball.drawBall(this.ctx)
            
        })
        
        
        this.ctx.fillStyle=this.balls[this.balls.length - 1].color;
        
        this.ctx.fillRect(300, 10, 10, 10);
        // if(this.gameOver()){
        //     alert(this.score);
        //     this.restart()
        // }
        requestAnimationFrame(this.animate.bind(this))
        // if (this.running){
        //     requestAnimationFrame(this.animate.bind(this))
        // }
    }

}

