console.log(window.innerWidth)
console.log(window.innerHeight)


var hero = {
    top: window.innerHeight - 50,
    left: window.innerWidth / 2,
};

var missles = []
var enemies = [{
        top: window.innerHeight / 10,
        left: window.innerWidth / 2,
    }]
    // var enemies = [
    //     { left: 150, top: 150 },

//     { left: 200, top: 100 },
//     { left: 250, top: 150 },

//     { left: 300, top: 100 },
//     { left: 350, top: 150 },

//     { left: 400, top: 100 },
//     { left: 450, top: 150 },

//     { left: 500, top: 100 },
//     { left: 550, top: 150 },

//     { left: 600, top: 100 },
//     { left: 650, top: 150 },

//     { left: 700, top: 100 },
//     { left: 750, top: 150 },

//     { left: 800, top: 100 },
//     { left: 850, top: 150 },

//     { left: 900, top: 100 },
//     { left: 950, top: 150 },

//     { left: 200, top: 175 },
//     { left: 250, top: 230 },

//     { left: 300, top: 175 },
//     { left: 350, top: 230 },

//     { left: 400, top: 175 },
//     { left: 450, top: 230 },

//     { left: 500, top: 175 },
//     { left: 550, top: 230 },

//     { left: 600, top: 175 },
//     { left: 650, top: 230 },

//     { left: 700, top: 175 },
//     { left: 750, top: 230 },

//     { left: 800, top: 175 },
//     { left: 850, top: 230 },

//     { left: 900, top: 175 },
//     { left: 950, top: 230 },


//     { left: 200, top: 250 },
//     { left: 300, top: 250 },
//     { left: 400, top: 250 },
//     { left: 500, top: 250 },
//     { left: 600, top: 250 },
//     { left: 700, top: 250 },
//     { left: 800, top: 250 },
//     { left: 900, top: 250 }
// ]

document.onkeydown = function(e) {
    if (e.keyCode === 37) {
        if (hero.left <= 5) {} else {
            hero.left = hero.left - 15;
            moveHero()
        }
    } else if (e.keyCode === 39) {
        if (hero.left >= 1310) {} else {
            hero.left = hero.left + 15;
            moveHero()
        }
    } else if (e.keyCode === 32) {
        missles.push({ left: hero.left + 15, top: hero.top - 20 })
        drawMissles()
    } else if (e.keyCode === 38) {
        if (hero.top > 0) {
            hero.top = hero.top - 15;
            moveHero()
        } else {}
    } else if (e.keyCode === 40) {
        if (hero.top <= 600) {
            hero.top = hero.top + 15;
            moveHero()
        } else {}
    }

};
// 38 40
function moveHero() {
    console.log(hero.top)
    document.getElementById("hero").style.left = hero.left + "px";
    document.getElementById("hero").style.top = hero.top + "px";

};

function drawMissles() {
    document.getElementById('missles').innerHTML = ""
    for (var missle = 0; missle < missles.length; missle++) {
        document.getElementById('missles').innerHTML +=
            `<div class="missle" style="left: ${missles[missle].left}px; top: ${missles[missle].top}px"></div>`
    }
}

function moveMissle() {
    for (var missle = 0; missle < missles.length; missle++) {
        missles[missle].top = missles[missle].top - 20;
    }
}

function moveEnemies() {
    for (var enemy = 0; enemy < enemies.length; enemy++) {
        enemies[enemy].top = enemies[enemy].top + 1;
        if (enemies[enemy].top == hero.top) {
            console.log('you loose')
        }
    }
}

function drawEnemies() {
    document.getElementById('enemies').innerHTML = ""
    for (var enemy = 0; enemy < enemies.length; enemy++) {
        document.getElementById('enemies').innerHTML +=
            `<div class="enemy" style="left: ${enemies[enemy].left}px; top: ${enemies[enemy].top}px"></div>`
    }
}

function enemyHit() {
    for (var enemy = 0; enemy < enemies.length; enemy++) {
        for (var missle = 0; missle < missles.length; missle++) {
            if (
                (missles[missle].top <= enemies[enemy].top + 50) &&
                (missles[missle].top >= enemies[enemy].top) &&
                (missles[missle].left >= enemies[enemy].left) &&
                (missles[missle].left <= enemies[enemy].left + 50)
            ) {
                enemies.splice(enemy, 1)
                missles.splice(missle, 1)
            }
        }
    }
}

function gameLoop() {
    setTimeout(gameLoop, 100)
    moveMissle()
    drawMissles()
    drawEnemies()
    moveEnemies()
    enemyHit()
}
gameLoop()