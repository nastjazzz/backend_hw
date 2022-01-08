import purpleCircle from './assets/purple_bg_sphera.png';

let newImg = document.createElement('img');
newImg.src = purpleCircle;

const body = document.querySelector('body');
body.appendChild(newImg);
document.write('this is second file <br/>');
