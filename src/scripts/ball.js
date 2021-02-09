const CONSTANTS = {
    GRAVITY: 0.4,
    TERMINAL_VEL: 10,
    BOUNCE: 0.7,
    FR: 0.1,
    VX:5,
    VY:10
}
const radius = [[10,'red'], [20,'blue'], [30,'orange'], [40,'green'], [50,'black']]
export default class Ball {
    constructor(demensions,cx){
        this.demensions = demensions;
        
        let set = radius[Math.floor(Math.random()*radius.length)]
        this.r = set[0]
        this.color = set[1]
        if(cx > this.r && (cx + this.r) <= demensions.width){
            this.x = (cx - (cx % this.r));
        }else if(cx < this.r){
            this.x = Math.ceil(cx/this.r)*this.r
        }else if ((cx+this.r )> demensions.width){
            this.x = demensions.width - this.r
        }
        
        this.y = 30;

    }

    // fall(){
    //     if (this.y <= this.demensions.height){
    //         this.y += CONSTANTS.TERMINAL_VEL;
    //     }
    // }

    animate(ctx){
        // if (this.y + this.r < this.demensions.height){
            ctx.clearRect(0,0,this.demensions.width, this.demensions.height);
            // this.fall()
            this.ballmove() 
            this.drawBall(ctx)
        // }
        
    }

    drawBall(ctx){
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    ballmove() {
        this.x += CONSTANTS.VX;
        this.y += CONSTANTS.VY;
        CONSTANTS.VY += CONSTANTS.GRAVITY;

        //If either wall is hit, change direction on x axis
        if (this.x + this.r > this.demensions.width || this.x - this.r < 0) {
            CONSTANTS.VX *= -1;
        }

        // Ball hits the floor
        if (this.y + this.r > this.demensions.height) {// ||

            // Re-positioning on the base
            this.y = this.demensions.height - this.r;
            //bounce the ball
            CONSTANTS.VY *= -CONSTANTS.BOUNCE;
            //do this otherwise, ball never stops bouncing
            if (CONSTANTS.VY < 0 && CONSTANTS.VY > -2.1)
                CONSTANTS.VY = 0;
            //do this otherwise ball never stops on xaxis
            if (Math.abs(CONSTANTS.VX) < 1.1)
                CONSTANTS.VX = 0;

            this.xF();
    }
}

 xF() {
    if (CONSTANTS.VX > 0)
        CONSTANTS.VX = CONSTANTS.VX - CONSTANTS.FR;
    if (CONSTANTS.VX < 0)
        CONSTANTS.VX = CONSTANTS.VX + CONSTANTS.FR;
}
}