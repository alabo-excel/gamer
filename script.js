// console.log("width",
//     window.innerWidth)
// console.log("height",
//     window.innerHeight)

var hero = {
    top: window.innerHeight - 50,
    left: window.innerWidth / 2 - 50,
};

var missles = []
var enemies = [{
    top: window.innerHeight / 10,
    left: window.innerWidth / 2,
}]

function createPos() {
    var topPos = Math.floor(Math.random() * window.innerHeight / 10);
    var leftPos = Math.floor(Math.random() * window.innerWidth - 70);
    enemies.push({ top: topPos, left: leftPos })
}

document.onkeydown = function(e) {
    if (e.keyCode === 37) {
        if (hero.left <= 10) {} else {
            hero.left = hero.left - 15;
            moveHero()
        }
    } else if (e.keyCode === 39) {
        if (hero.left >= window.innerWidth - 65) {} else {
            hero.left = hero.left + 15;
            moveHero()
        }
    } else if (e.keyCode === 32) {
        missles.push({ left: hero.left + 15, top: hero.top - 20 })
        drawMissles()
    } else if (e.keyCode === 38) {
        if (hero.top > 10) {
            hero.top = hero.top - 15;
            moveHero()
        } else {}
    } else if (e.keyCode === 40) {
        if (hero.top < window.innerHeight - 50) {
            hero.top = hero.top + 15;
            moveHero()
        } else {}
    }
};

function moveHero() {
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
        if (enemies[enemy].top == hero.top) {}
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

// function mobileControls() {
//     document.getElementById('left').addEventListener("click", () => {
//         if (hero.left <= 10) {} else {
//             hero.left = hero.left - 15;
//             moveHero()
//         }
//     })
//     document.getElementById('right').addEventListener("click", () => {
//         if (hero.left >= window.innerWidth - 65) {} else {
//             hero.left = hero.left + 15;
//             moveHero()
//         }
//     })

//     document.getElementById('fire').addEventListener("click", () => {
//         missles.push({ left: hero.left + 15, top: hero.top - 20 })
//         drawMissles()
//     })
// }

function gameLoop() {
    setTimeout(gameLoop, 100)
    moveMissle()
    drawMissles()
    drawEnemies()
    moveEnemies()
    enemyHit()
    if (enemies.length <= 20) {
        createPos()
    } else {}
}

gameLoop()


// function stopLoop() {
//     clearTimeout(gameLoop());
// }