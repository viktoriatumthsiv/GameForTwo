const elementForScore1 = document.getElementById('score1');
const elementForScore2 = document.getElementById('score2');
const elementTotal = document.getElementById('total');
let total = 0;

let scoreForPlayer1 = 0;
let scoreForPlayer2 = 0;

const updateScore = () => {
    elementForScore1.textContent = scoreForPlayer1;
    elementForScore2.textContent = scoreForPlayer2;
};

const createPlayer = (position, color) => {
    const player = document.createElement('div');
    player.classList.add('player');
    player.style.left = position + '%';
    player.style.background = color;
    document.body.appendChild(player);
    return player;
};

const generateRandomPosition = (block) => {
    const position = {
        top: Math.random() * (window.innerHeight - block.offsetHeight),
        left: Math.random() * (window.innerWidth - block.offsetWidth)
    };

    block.style.top = position.top + 'px';
    block.style.left = position.left + 'px';
};

const createObject = () => {
    const object = document.createElement('div');
    object.classList.add('object');
    document.body.appendChild(object);
    return object;
};

function movePlayers(player1, player1Movement, player2, player2Movement) {
    const STEP = 5;

    if (player1Movement.up) player1.style.top = parseInt(player1.style.top) - STEP + "px";
    if (player1Movement.down) player1.style.top = parseInt(player1.style.top) + STEP + "px";
    if (player1Movement.left) player1.style.left = parseInt(player1.style.left) - STEP + "px";
    if (player1Movement.right) player1.style.left = parseInt(player1.style.left) + STEP + "px";
    if (player2Movement.up) player2.style.top = parseInt(player2.style.top) - STEP + "px";
    if (player2Movement.down) player2.style.top = parseInt(player2.style.top) + STEP + "px";
    if (player2Movement.left) player2.style.left = parseInt(player2.style.left) - STEP + "px";
    if (player2Movement.right) player2.style.left = parseInt(player2.style.left) + STEP + "px";
}

const defaltMovement = {
    up: false, down: false, left: false, right: false
};
const player1Movement = { ...defaltMovement };
const player2Movement = { ...defaltMovement };

function handleKeydown(event) {
    if (event.key === "a" || event.key === "A") { player1Movement.left = true; }
    else if (event.key === "d" || event.key === "D") { player1Movement.right = true; }
    else if (event.key === "w" || event.key === "W") { player1Movement.up = true; }
    else if (event.key === "s" || event.key === "S") { player1Movement.down = true; }
    else if (event.keyCode === 37) { player2Movement.left = true; }
    else if (event.keyCode === 39) { player2Movement.right = true; }
    else if (event.keyCode === 38) { player2Movement.up = true; }
    else if (event.keyCode === 40) { player2Movement.down = true; }
}

function handleKeyup(event) {
    if (event.key === "a" || event.key === "A") { player1Movement.left = false; }
    else if (event.key === "d" || event.key === "D") { player1Movement.right = false; }
    else if (event.key === "w" || event.key === "W") { player1Movement.up = false; }
    else if (event.key === "s" || event.key === "S") { player1Movement.down = false; }
    else if (event.keyCode === 37) { player2Movement.left = false; }
    else if (event.keyCode === 39) { player2Movement.right = false; }
    else if (event.keyCode === 38) { player2Movement.up = false; }
    else if (event.keyCode === 40) { player2Movement.down = false; }
}

function checkCollision(player, object) {
    const playerPosition = player.getBoundingClientRect();
    const objectPosition = object.getBoundingClientRect();

    return (playerPosition.top < objectPosition.top + objectPosition.height &&
        playerPosition.top + playerPosition.height > objectPosition.top &&
        playerPosition.left < objectPosition.left + objectPosition.width &&
        playerPosition.left + playerPosition.width > objectPosition.left);
}

const startGame = (player1, player2, object) => {
  let isGameOver = false;

  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('keyup', handleKeyup);

  const gameLoop = () => {
    if (isGameOver) {
      return;
    }

    movePlayers(player1, player1Movement, player2, player2Movement);

    if (checkCollision(player1, object)) {
      scoreForPlayer1++;
      updateScore();
      generateRandomPosition(object);
    }

    if (checkCollision(player2, object)) {
      scoreForPlayer2++;
      updateScore();
      generateRandomPosition(object);
    }

    // Перевірка на завершення гри
    if (scoreForPlayer1 === total || scoreForPlayer2 === total) {
      isGameOver = true;
      // Вивести повідомлення про перемогу і завершення гри
      if (scoreForPlayer1 === total) {
        alert(` виграв! Гра завершена.`);
      } else {
        alert(`  виграв! Гра завершена.`);
      }
      
      // Прибираємо обробники подій після завершення гри
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyup);
    }

    requestAnimationFrame(gameLoop);
  };

  gameLoop();
};


document.addEventListener('DOMContentLoaded', () => {
    const player1NameInput = document.getElementById('player1NameInput');
    const player2NameInput = document.getElementById('player2NameInput');
    const player1Name = document.getElementById('playerName1');
    const player2Name = document.getElementById('playerName2');
    const player1ColorInput = document.getElementById('player1ColorInput');
    const player2ColorInput = document.getElementById('player2ColorInput');
    const player1Button = document.getElementById('playerNameButton1');
    const player2Button = document.getElementById('playerNameButton2');

    player1Button.addEventListener('click', () => {
        const name = player1NameInput.value.trim();
        const color = player1ColorInput.value;
        if (name) {
            player1Name.textContent = name;
            player1.style.backgroundColor = color;
            player1NameInput.value = '';
        }
    });

    player2Button.addEventListener('click', () => {
        const name = player2NameInput.value.trim();
        const color = player2ColorInput.value;
        if (name) {
            player2Name.textContent = name;
            player2.style.backgroundColor = color;
            player2NameInput.value = '';
        }
    });

    const player1 = createPlayer(48, player1ColorInput.value);
    const player2 = createPlayer(52, player2ColorInput.value);
    const object = createObject();
    generateRandomPosition(object);
    generateRandomPosition(player1);
    generateRandomPosition(player2);

    // Встановлюємо значення total із введеного числа
    total = parseInt(prompt('Введіть максимальну кількість очків'));
    elementTotal.textContent = total;

    startGame(player1, player2, object);
});
// Відкриваємо модальне вікно при натисканні на кнопку Settings
const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settingsModal');
const closeSettingsButton = document.getElementById('closeSettings');
const saveSettingsButton = document.getElementById('saveSettings');

// Змінні для налаштувань
let playerSize = 20; // за замовчуванням
let playerSpeed = 5; // за замовчуванням
let player1Color = "#ffff00"; // жовтий
let player2Color = "#ff6600"; // оранжевий

// Відкриваємо налаштування
settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
});

// Закриваємо модальне вікно
closeSettingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

// Застосовуємо налаштування
saveSettingsButton.addEventListener('click', () => {
  // Зчитуємо налаштування
  playerSize = parseInt(document.getElementById('playerSize').value);
  playerSpeed = parseInt(document.getElementById('playerSpeed').value);
  player1Color = document.getElementById('player1Color').value;
  player2Color = document.getElementById('player2Color').value;
  
  // Оновлюємо кольори та розміри гравців
  player1.style.width = playerSize + 'px';
  player1.style.height = playerSize + 'px';
  player1.style.backgroundColor = player1Color;
  
  player2.style.width = playerSize + 'px';
  player2.style.height = playerSize + 'px';
  player2.style.backgroundColor = player2Color;
  
  // Закриваємо модальне вікно після збереження налаштувань
  settingsModal.style.display = 'none';
});


// Оновлюємо ім'я гравців, коли натискається кнопка "Save"
const player1NameButton = document.getElementById('player1NameButton');
const player2NameButton = document.getElementById('player2NameButton');
const player1NameInput = document.getElementById('player1NameInput');
const player2NameInput = document.getElementById('player2NameInput');

player1NameButton.addEventListener('click', () => {
    const playerName1 = document.getElementById('playerName1');
    playerName1.textContent = player1NameInput.value || 'Гравець 1'; // Якщо ім'я не введено, ставимо дефолт
});

player2NameButton.addEventListener('click', () => {
    const playerName2 = document.getElementById('playerName2');
    playerName2.textContent = player2NameInput.value || 'Гравець 2'; // Якщо ім'я не введено, ставимо дефолт
});

// Створення гравців
const startGamee = (player1, player2, object) => {
    let isGameOver = false;
    
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);

    const gameLoop = () => {
        if (isGameOver) {
            return;
        }

        movePlayers(player1, player1Movement, player2, player2Movement);

        if (checkCollision(player1, object)) {
            scoreForPlayer1++;
            updateScore();
            generateRandomPosition(object);
        }

        if (checkCollision(player2, object)) {
            scoreForPlayer2++;
            updateScore();
            generateRandomPosition(object);
        }

        const startGame = (player1, player2, object) => {
          let isGameOver = false;
      
          document.addEventListener('keydown', handleKeydown);
          document.addEventListener('keyup', handleKeyup);
      
          const gameLoop = () => {
              if (isGameOver) {
                  return;
              }
      
              movePlayers(player1, player1Movement, player2, player2Movement);
      
              if (checkCollision(player1, object)) {
                  scoreForPlayer1++;
                  updateScore();
                  generateRandomPosition(object);
              }
      
              if (checkCollision(player2, object)) {
                  scoreForPlayer2++;
                  updateScore();
                  generateRandomPosition(object);
              }
      
              // Перевірка на завершення гри
              if (scoreForPlayer1 === total || scoreForPlayer2 === total) {
                  isGameOver = true;
                  // Вивести повідомлення про перемогу і завершення гри
                  if (scoreForPlayer1 === total) {
                      alert(` виграв! Гра завершена.`);
                  } else {
                      alert(` виграв! Гра завершена.`);
                  }
      
                  // Прибираємо обробники подій після завершення гри
                  document.removeEventListener('keydown', handleKeydown);
                  document.removeEventListener('keyup', handleKeyup);
              }
      
              requestAnimationFrame(gameLoop);
          };
      
          gameLoop();
      };
      
        requestAnimationFrame(gameLoop);
    }

    if (!isGameOver) {
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}

document.addEventListener('DOMContentLoaded', () => {
    const player1 = createPlayer(48, player1Color);
    const player2 = createPlayer(52, player2Color);
    const object = createObject();
    generateRandomPosition(object);
    generateRandomPosition(player1);
    generateRandomPosition(player2);
    total = prompt('Введіть максимальну кількість очків');
    elementTotal.textContent = total;

    startGamee(player1, player2, object);
});




