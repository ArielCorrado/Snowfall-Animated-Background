const random = (min, max) => {
    const random01 = Math.random();
    const randomMinMax = (random01 * max) + ( min * ( 1 - random01 ));
    return randomMinMax;
}

const randomMM = () => {
    const random01 = Math.random();
    random01 > 0.5 ? "+" : "-";
}


/* OPTIONS */

const flakesMaxSeparation = 100;   // px 
const flakesMaxTranslationX = 500;   // px
const minScreenCrossTime = 10;     // seg  
const maxScreenCrossTime = 25;    // seg  
const minflakeDiametter = 5;      // px
const maxflakeDiametter = 15;     // px


const createFlake = (xpos) => {
    const flake = document.createElement("div");
    
    const screenCrossTime = random(minScreenCrossTime, maxScreenCrossTime);
    const screenCrossTimeMs = screenCrossTime * 1000;

    const opacityOP = (screenCrossTime - minScreenCrossTime) / (maxScreenCrossTime - minScreenCrossTime);       //Seteamos la opacidad en función de la velocidad: a mas velocidad menor opacidad
    const opacity = 1 - opacityOP;                                                                              //Invertimos la relacion: a mas velocidad mas opacidad (mas blanco) (copo mas cercano)

    const diametterOP = ((screenCrossTime - minScreenCrossTime) * (maxflakeDiametter - minflakeDiametter) / (maxScreenCrossTime - minScreenCrossTime)) + minflakeDiametter;     //Diametro inversamente proporcional a la velocidad
    const diametter = (maxflakeDiametter * minflakeDiametter) / diametterOP;                                                                                                    //Diametro proporcional a la velocidad (a mayor diametro, mas velocidad: copo mas cercano)
    
    flake.animate([
        // keyframes
        { transform: `translateY(0) translateX(0)`},
        { transform: `translateY(${window.innerHeight * 1.1}px) translateX(${flakesMaxTranslationX * Math.random()}px)`}
    ],{
        // timing options
        duration: screenCrossTimeMs,
        timingFunction: "linear",
        fill: "forwards"
    });

    flake.className = "flake";
    flake.style.width = `${diametter}px`;
    flake.style.height = `${diametter}px`;
    flake.style.left = `${xpos}px`
    flake.style.opacity = opacity;
    flake.style.top = 0;
        
    document.getElementById("container").appendChild(flake);

    setTimeout(() => {
        flake.remove();
    }, screenCrossTimeMs);
}


const createSnowFall = () => {
    for (let x = 0; x < window.innerWidth; x += (flakesMaxSeparation * Math.random())) {
        createFlake(x);
    }
}


setInterval(() => {
    createSnowFall();    
}, 1000);





