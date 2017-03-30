let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 512;
document.body.appendChild(canvas);

let lastTime;

function main() {
    let now = Date.now();
    let dt = (now - lastTime) / 1000;

    update(dt);
    render();

    lastTime = now;
    requestAnimationFrame(main);
}

function init() {
    terrainPattern = ctx.createPattern(resources.get('img/background.jpg'), 'repeat');

    document.getElementById('play-again').addEventListener('click', function() {
        reset();
    });
    document.getElementById('button-next-level').addEventListener('click', function() {
        flag = true;
        reset();
    });

    reset();
    lastTime = Date.now();
    main();
}

resources.load([
    'img/sprites.png',
    'img/bonuses.png',
    'img/background.jpg'
]);

resources.onReady(init);

let player = {
    pos: [0, 0],
    sprite: new Sprite('img/sprites.png', [0, 0], [60, 60], 16, [0, 1, 2, 3, 4, 3, 2, 1, 0])
};
let bullets = [];
let enemies = [];
let bonuses = []
let explosions = [];

let lastFire = Date.now();
let gameTime = 0;
let isGameOver;
let isLevelComplete;
let terrainPattern;

let score = 0;
let generalScore = 0;
let lives = 5;
let scoreEl = document.getElementById('score');
let levelEl = document.getElementById("level");
let livesEl = document.getElementById("lives");
let gameTimeEl = document.getElementById("gameTime");

let playerSpeed = 200;
let bulletSpeed = 400;
let enemySpeed = 50;
let bonuseSpees = 100;
let gameLength = 25;
let level = 1;
let flag = true;

function update(dt) {
    gameTime += dt;
    if (gameTime > gameLength && !isGameOver) {
        if (flag) {
            levelComplete();
            generalScore += score;
            level++;
            flag = false;
        }
    }

    handleInput(dt);
    updateEntities(dt);

    if (Math.random() < 1 - Math.pow(0.998, gameTime)) {
        enemies.push({
            pos: [Math.random() * (canvas.width - 80), -80],
            sprite: new Sprite('img/sprites.png', [305, 5], [80, 80])
        });
    }

    checkCollisions();

    if (!isLevelComplete && !isGameOver) {
        scoreEl.innerHTML = "Score: " + (generalScore + score);
        levelEl.innerHTML = "Level: " + level;
        livesEl.innerHTML = "Lives: " + lives;
        // if (lives > 4) {
        //     livesEl.innerHTML = "State: whole";
        // } else if (lives > 2) {
        //     livesEl.innerHTML = "State: damaged";
        // } else {
        //     livesEl.innerHTML = "State: very damaged";
        // }

        gameTimeEl.innerHTML = "Progress: " + Math.ceil(gameTime / gameLength * 100) + "%";
    }

    if (Math.random() < 1 - Math.pow(0.9999, gameTime)) {
        bonuses.push({
            pos: [Math.random() * (canvas.width - 50), -50],
            sprite: new Sprite('img/bonuses.png', [0, 0], [50, 50], 7, [0, 1, 2, 1, 0])
        });
    }
    checkCollisions();
};

function handleInput(dt) {
    if (input.isDown('DOWN') || input.isDown('s')) {
        player.pos[1] += playerSpeed * dt;
    }
    if (input.isDown('UP') || input.isDown('w')) {
        player.pos[1] -= playerSpeed * dt;
    }
    if (input.isDown('LEFT') || input.isDown('a')) {
        player.pos[0] -= playerSpeed * dt;
    }
    if (input.isDown('RIGHT') || input.isDown('d')) {
        player.pos[0] += playerSpeed * dt;
    }
    if (input.isDown('SPACE') &&
        !isGameOver && !isLevelComplete &&
        Date.now() - lastFire > 500) {
        let x = player.pos[0] + 17;
        let y = player.pos[1];

        bullets.push({
            pos: [x, y],
            sprite: new Sprite('img/sprites.png', [395, 5], [25, 25])
        });
        lastFire = Date.now();
    }
}

function updateEntities(dt) {
    player.sprite.update(dt);

    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];
        bullet.pos[1] -= bulletSpeed * dt;

        if (bullet.pos[1] < 0 || bullet.pos[1] > canvas.height ||
            bullet.pos[0] > canvas.width) {
            bullets.splice(i, 1);
            i--;
        }
    }

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].pos[1] += enemySpeed * dt;
        enemies[i].sprite.update(dt);

        if (enemies[i].pos[1] > canvas.height) {
            enemies.splice(i, 1);
            i--;
        }
    }

    for (let i = 0; i < bonuses.length; i++) {
        bonuses[i].pos[1] += bonuseSpees * dt;
        bonuses[i].sprite.update(dt);

        if (bonuses[i].pos[1] > canvas.height) {
            bonuses.splice(i, 1);
            i--;
        }
    }

    for (let i = 0; i < explosions.length; i++) {
        explosions[i].sprite.update(dt);

        if (explosions[i].sprite.done) {
            explosions.splice(i, 1);
            i--;
        }
    }
}

function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 ||
        b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1],
        pos[0] + size[0], pos[1] + size[1],
        pos2[0], pos2[1],
        pos2[0] + size2[0], pos2[1] + size2[1]);
}

function checkCollisions() {
    checkPlayerBounds();

    for (let i = 0; i < enemies.length; i++) {
        let pos = enemies[i].pos;
        let size = enemies[i].sprite.size;

        for (let j = 0; j < bullets.length; j++) {
            let pos2 = bullets[j].pos;
            let size2 = bullets[j].sprite.size;

            if (boxCollides(pos, size, pos2, size2)) {
                enemies.splice(i, 1);
                i--;
                score += 100;

                explosions.push({
                    pos: [pos[0] + 20, pos[1] + 20],
                    sprite: new Sprite('img/sprites.png', [7, 95], [39, 39],
                        15, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                        null,
                        true)
                });

                bullets.splice(j, 1);
                break;
            }
        }
        if (boxCollides(pos, size, player.pos, player.sprite.size) && lives != 0) {
            enemies.splice(i, 1);
            i--;
            score += 100;

            explosions.push({
                pos: [pos[0] + 20, pos[1] + 20],
                sprite: new Sprite('img/sprites.png', [7, 95], [39, 39],
                    15, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    null,
                    true)
            });
            lives--;
            break;
        }
        if (boxCollides(pos, size, player.pos, player.sprite.size) && lives == 0 && !isLevelComplete) {
            gameOver();
        }
    }
    for (let i = 0; i < bonuses.length; i++) {
        let pos = bonuses[i].pos;
        let size = bonuses[i].sprite.size;

        if (boxCollides(pos, size, player.pos, player.sprite.size) && lives != 0) {
            bonuses.splice(i, 1);
            i--;
            lives++;
        }
    }
}

function checkPlayerBounds() {
    if (player.pos[0] < 0) {
        player.pos[0] = 0;
    } else if (player.pos[0] > canvas.width - player.sprite.size[0]) {
        player.pos[0] = canvas.width - player.sprite.size[0];
    }

    if (player.pos[1] < 0) {
        player.pos[1] = 0;
    } else if (player.pos[1] > canvas.height - player.sprite.size[1]) {
        player.pos[1] = canvas.height - player.sprite.size[1];
    }
}

function render() {
    ctx.fillStyle = terrainPattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!isGameOver && !isLevelComplete) {
        renderEntity(player);
    }

    renderEntities(bullets);
    renderEntities(enemies);
    renderEntities(bonuses);
    renderEntities(explosions);
};

function renderEntities(list) {
    for (let i = 0; i < list.length; i++) {
        renderEntity(list[i]);
    }
}

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}

function levelComplete() {
    document.getElementById('next-level').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
    isLevelComplete = true;
    console.log('hhjh]', enemySpeed);
    enemySpeed += 50;
    gameLength += 5;
}

function gameOver() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
    isGameOver = true;
    enemySpeed = 50;
    gameLength = 25;
    generalScore = 0;
    level = 1;
}

function reset() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('next-level').style.display = "none";
    document.getElementById('game-over-overlay').style.display = 'none';
    isGameOver = false;
    isLevelComplete = false;
    gameTime = 0;
    score = 0;
    lives = 5;

    enemies = [];
    bullets = [];
    bonuses = [];

    player.pos = [canvas.width / 2, canvas.height / 2];
};
