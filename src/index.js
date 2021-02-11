import "./styles/index.scss";

import Tetris2048 from './scripts/game';

const canvas = document.getElementById('gamescreen');
var background = new Image();
background.src = "/images/25231.png";

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function () {
    ctx.drawImage(background, 0, 0);
}

new Tetris2048(canvas);
