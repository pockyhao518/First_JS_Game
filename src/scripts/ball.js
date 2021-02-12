const radius = [[10, 'rgb(100,100,105)'], [20, 'rgb(255,255,255)'], [30, 'rgb(210,221,187)'], [40, 'rgb(209,211,211)'], [50,'rgb(241,194,178)']]

export default class Ball {
    constructor(demensions){
        this.demensions = demensions;
        this.idx = Math.floor(Math.random()*(radius.length-2)) + 2
        let set = radius[this.idx]
        this.r = set[0]
        this.color = set[1]
        this.y = 0;
        this.vx = 0;;
        this.vy = 8;
    }
    merge(idx){
        let set = radius[idx - 1]
        this.r = set[0];
        this.color = set[1];
    }
    set(num){
        let cx = num;
        if(cx > this.r && (cx + this.r) <= this.demensions.width){
            this.x = (cx - (cx % this.r));
        }else if(cx < this.r){
            this.x = Math.ceil(cx/this.r)*this.r
        }else if ((cx+this.r )> this.demensions.width){
            this.x = this.demensions.width - this.r
        }
    }

    angle() {
        return Math.atan2(this.vy, this.vx);
    };

    speed(){
        return Math.sqrt(this.vx**2 + this.vy**2)
    }
    // fall(){
    //     if (this.y <= this.demensions.height){
    //         this.y += CONSTANTS.TERMINAL_VEL;
    //     }
    // }

    // animate(ctx){
    //     // if (this.y + this.r < this.demensions.height){
    //         // ctx.clearRect(0,0,this.demensions.width, this.demensions.height);
    //         // this.fall()
    //         this.ballmove() 
    //         this.drawBall(ctx)
    //     // }
        
    // }

    drawBall(ctx){
        // let img = new Image();
        // img.src = '/src/images/25231.png';
        // let myPattern = ctx.createPattern(img, 'repeat');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        // ctx.fillStyle = myPattern;
        ctx.fillStyle = this.color;
        ctx.fill();
        // ctx.stroke();
        ctx.closePath();
        
    }

    // ballmove() {
    //     this.x += this.vx;
    //     this.y += this.vy;
    //     this.vy += CONSTANTS.GRAVITY;

    //     if (this.x + this.r >= this.demensions.width-1) {
    //         this.x = this.demensions.width - this.r;
    //         this.vx *= -CONSTANTS.BOUNCE;
    //     }else if(this.x - this.r <= 0.2 ){
    //         this.x = this.r;
    //         this.vx *= -CONSTANTS.BOUNCE;
    //     }
    //     if (this.y + this.r >= this.demensions.height) {
    //         this.y = this.demensions.height - this.r;
    //         this.vy *= -CONSTANTS.BOUNCE;
    //         if (this.vy < 0 && this.vy > -2.0)
    //             this.vy = 0;
    //         if (Math.abs(this.vx) < 0.5)
    //             this.vx = 0;
    //         this.xF();
    //     }
    // }

    // xF() {
    //     if (this.vx > 0)
    //         this.vx = this.vx - CONSTANTS.FR;
    //     if (this.vx < 0)
    //         this.vx = this.vx + CONSTANTS.FR;
    // }
}