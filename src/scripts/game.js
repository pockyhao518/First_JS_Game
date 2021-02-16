import Ball from './ball'

export default class Tetris2048{
    constructor(canvas,side) {
        this.ctx = canvas.getContext("2d");
        this.rect = canvas.getBoundingClientRect(); 
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.cx = null;
        this.balls = [];
        this.running = false;
        this.moveObject = [];
        this.score = 0;
        this.ctxside = side.getContext('2d');
        this.dimensions2 = { width: side.width, height: side.height}
        
        this.dropevents();
        this.restart();
    }
    
    play(){
        this.running = true;
        this.animate()
    }

    restart(){
        this.running = false;
        this.score = 0;
        this.balls = [];
        // this.box = new Box(this.dimensions)
        let ball = new Ball(this.dimensions)
        this.balls.push(ball)
        this.animate()
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
        this.balls[this.balls.length - 2].set(e.pageX - this.rect.left);
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
            
                if (dist <= ob1.r + ob2.r) {
                    // if(this.check(ob1,ob2)){
                    //     if(ob1.color === 'red'){
                    //         this.moveObject.splice(j, 1)
                    //         this.moveObject.splice(i, 1);
                    //         this.balls.splice(j, 1)
                    //         this.balls.splice(i, 1)
                    //         this.score += 5
                    //     }else{
                    //         let midX = (ob1.x + ob2.x) / 2;
                    //         let midY = (ob1.y + ob2.y) / 2;
                    //         let newBall = new Ball(this.dimensions);
                    //         newBall.merge(ob2.idx);
                    //         newBall.x = midX;
                    //         newBall.y = midY;
                    //         newBall.idx = ob2.idx-1;
                    //         if(ob1.speed() > ob2.speed()){
                    //             newBall.vx = ob1.vx*0.9;
                    //             newBall.vy = ob1.vy * 0.9;
                    //         }else{
                    //             newBall.vx = ob2.vx * 0.9;
                    //             newBall.vy = ob2.vy * 0.9;
                    //         }
                            
                    //         this.moveObject.splice(j,1)
                    //         this.moveObject.splice(i,1,newBall);
                    //         this.balls.splice(j,1)
                    //         this.balls.splice(i,1,newBall)
                    //         this.score += 6 - ob2.r/10
                    //     }
                        

                    // }else{

                    
                    let theta1 = ob1.angle();
                    let theta2 = ob2.angle();
                    let beta = Math.atan2(ob2.y - ob1.y, ob2.x - ob1.x);
                    let m1 = ob1.r/5;
                    let m2 = ob2.r/5;
                    let v1 = ob1.speed();
                    let v2 = ob2.speed();
                    
                    let dx1F = (v1 * Math.cos(theta1 - beta) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - beta)) / (m1 + m2) * Math.cos(beta) + v1 * Math.sin(theta1 - beta) * Math.cos(beta + Math.PI / 2);
                    let dy1F = (v1 * Math.cos(theta1 - beta) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - beta)) / (m1 + m2) * Math.sin(beta) + v1 * Math.sin(theta1 - beta) * Math.sin(beta + Math.PI / 2);
                    let dx2F = (v2 * Math.cos(theta2 - beta) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - beta)) / (m1 + m2) * Math.cos(beta) + v2 * Math.sin(theta2 - beta) * Math.cos(beta + Math.PI / 2);
                    let dy2F = (v2 * Math.cos(theta2 - beta) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - beta)) / (m1 + m2) * Math.sin(beta) + v2 * Math.sin(theta2 - beta) * Math.sin(beta + Math.PI / 2);
                   
                    if (this.check(ob1, ob2)) {
                        if (ob1.color === 'rgb(100,100,105)') {
                            this.moveObject.splice(j, 1)
                            this.moveObject.splice(i, 1);
                            this.balls.splice(j, 1)
                            this.balls.splice(i, 1)
                            this.score += 5
                        } else {
                            let midX = (ob1.x + ob2.x) / 2;
                            let midY = (ob1.y + ob2.y) / 2;
                            let newBall = new Ball(this.dimensions);
                            newBall.merge(ob2.idx);
                            newBall.x = midX;
                            newBall.y = midY;
                            newBall.idx = ob2.idx - 1;
                            newBall.vy = (this.dimensions.height/100)/2
                            // newBall.vx = (ob1.vx - ob2.vx)/5
                            // if (ob1.speed() > ob2.speed()) {
                            //     newBall.vx = ob1.vx * 0.9;
                            //     newBall.vy = ob1.vy * 0.9;
                            // } else {
                            //     newBall.vx = ob2.vx * 0.9;
                            //     newBall.vy = ob2.vy * 0.9;
                            // }
                            this.moveObject.splice(j, 1)
                            this.moveObject.splice(i, 1, newBall);
                            this.balls.splice(j, 1)
                            this.balls.splice(i, 1, newBall)
                            this.score += 6 - ob2.r / 10
                        }


                    } else {
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
                    this.countAttack(ob1,ob2)
                    }
                    
                }
                
            }
            if(this.balls.length > 1){
                this.wall(this.moveObject[i]);
            }
            
        }

        if (this.moveObject.length > 0)
            this.wall(this.moveObject[this.moveObject.length - 1])
    }

    countAttack(ob1, ob2, emergency = false) {
        let overlap = ob1.r + ob2.r - this.distance(ob1, ob2);
        let smallerObject = ob1.r < ob2.r ? ob1 : ob2;
        let biggerObject = ob1.r > ob2.r ? ob1 : ob2;

        if (emergency) {
            [smallerObject, biggerObject] = [biggerObject, smallerObject]
        }
        let theta = Math.atan2((biggerObject.y - smallerObject.y), (biggerObject.x - smallerObject.x));
        smallerObject.x -= overlap * Math.cos(theta);
        smallerObject.y -= overlap * Math.sin(theta);

        if (this.distance(ob1, ob2) < ob1.r + ob2.r) {
            if (!emergency) this.countAttack(ob1, ob2, true)
        }
    }

    wall(obj){
        if (obj.x - obj.r  < 0 ||
            obj.x + obj.r > this.dimensions.width) {
            obj.vx *= -0.9;
        }
        if (obj.y + obj.r  > this.dimensions.height) {
            obj.vy *= -0.9;
        }
        if (obj.y - obj.r < 100){
            obj.vy = Math.abs(obj.vy)
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
        //    this.xF(obj);
        obj.drawBall(this.ctx)
        
        })
       
    }

    // xF(obj) {
    //     if (obj.vx > 0 && obj.y + obj.r >= this.dimensions.height){
    //         obj.vx -= 0.1;
    //     }
            
    //     if (obj.vx < 0 && obj.y + obj.r >= this.dimensions.height){
    //         obj.vx += 0.1;
    //     }
            
    //     if(Math.abs(obj.vx) < 0.5&&(obj.y + obj.r) >= this.dimensions.height){
    //         obj.vx = 0;
    //     }
    //     if(obj.y + obj.r <this.dimensions.height){
    //         obj.vy += 0.2;
    //     }else{
    //         obj.vy = 0;
    //     }
        

    // }

    check(ob1,ob2){
        return ob1.color === ob2.color;
        // return false;
    }
    gameOver(){
        return this.balls.length > 7;
    }
    animate(){
        // this.box.animate(this.ctx);
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        this.ctxside.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        // this.ball.animate(this.ctx); 
        // this.ballmove();
        this.ballCollision();
        this.ballmove();
        // this.moveObject.forEach(ball=>{
        //         ball.drawBall(this.ctx)
            
        // })

        if(this.balls.length === 1){
            this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        }

        if (this.gameOver()) {
            alert("Congratulations, You got: " + this.score + " pts.");
            this.restart();
        }
        this.ctxside.beginPath();
        this.ctxside.font = '20px PT Sans'
        this.ctxside.fillStyle = '#97928A'
        this.ctxside.fillText('Next Ball', 15, 20, 100);
        this.ctxside.closePath();

        this.ctxside.beginPath();
        this.ctxside.arc(40, 40, 10, 0, Math.PI * 2);
        // ctx.fillStyle = myPattern;
        this.ctxside.fillStyle = this.balls[this.balls.length - 1].color;
        this.ctxside.fill();
        // this.ctxside.stroke();
        this.ctxside.closePath();
        
        this.ctxside.beginPath();
        this.ctxside.font = '20px PT Sans'
        this.ctxside.fillStyle = '#97928A'
        this.ctxside.fillText('Balls', 15, 80, 100);
        this.ctxside.fillText(7 - this.balls.length+' / 6', 15, 110, 100);
        // this.ctxside.closePath();
        // // if(this.gameOver()){
        // //     alert(this.score);
        // //     this.restart()
        // // }
        // // this.ctxside.beginPath();
        // this.ctxside.font = '20px PT Sans'
        // this.ctxside.fillStyle = '#97928A'
        this.ctxside.fillText('Scores', 15, 140, 100);
        this.ctxside.fillText(this.score, 15, 170, 100);
        // this.ctxside.closePath();

        // this.ctxside.beginPath();
        // this.ctxside.font = '20px PT Sans'
        // this.ctxside.fillStyle = '#97928A'
        this.ctxside.fillText('How To Play', 10, 210, 100);
        this.ctxside.fillText('Click to drop', 10, 250, 100);
        this.ctxside.fillText('the ball,', 10, 280, 100);
        this.ctxside.fillText('you can drop', 10, 310, 100);
        this.ctxside.fillText('up to 6 balls', 10, 340, 100);
        this.ctxside.fillText('can be placed.', 10, 370, 100);
        this.ctxside.fillText('Contact balls', 10, 400, 100);
        this.ctxside.fillText('of the same', 10, 430, 100);
        this.ctxside.fillText('size will merge', 10, 460, 100);
        this.ctxside.fillText('and become', 10, 490, 100);
        this.ctxside.fillText('smaller.', 10, 520, 100);
        this.ctxside.closePath();


        if(this.running){
            requestAnimationFrame(this.animate.bind(this))
        }
        
        // if (this.running){
        //     requestAnimationFrame(this.animate.bind(this))
        // }
    }

}

