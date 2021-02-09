import "./styles/index.scss";

import Tetris2048 from './scripts/game';

const canvas = document.getElementById('gamescreen');
new Tetris2048(canvas);
