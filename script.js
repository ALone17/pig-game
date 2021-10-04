'use strict';
// select html elements
const roll = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const players = document.querySelectorAll('.player');
const hold = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
dice.src = 'dice-1.png';
//Переменные 
let totalScore;

//Привязка прослушивателей событий к кнопкам
roll.addEventListener('click', rollDice);
hold.addEventListener('click', holdScore);
newBtn.addEventListener('click', newGame);

//Функция ролла дайса
function rollDice() {
    const random = Math.trunc(Math.random() * 6) + 1;
    let [Player] = activePlayer();
    dice.src = `dice-${random}.png`;
    random === 1 ? switchPlayer() : addScore(Player, random);
    if (random === 1) Player.querySelector('.current-score').textContent = '0';
}

//Функция добавления очков
function addScore(activePlayer, score) {
    const NowScore = activePlayer.querySelector('.current-score');
    const current = NowScore.textContent;
    totalScore = NowScore.textContent = `${+current + score}`;
}

//Функция удержания очков
function holdScore() {
    const [Player] = activePlayer();
    Player.querySelector('.current-score').textContent = '0';
    const score = Player.querySelector('.score');
    const a = (+score.textContent) + (+totalScore);
    score.textContent = a;
    if (a >= 100) {
        Player.classList.add('player--winner');
        roll.removeEventListener('click', rollDice);
        hold.removeEventListener('click', holdScore);
        dice.classList.add('hidden');
    }
    else {
        totalScore = 0;
        switchPlayer();
    }
}

//Функция переключения игрока
function switchPlayer() {
    totalScore = 0;
    players.forEach(player => player.classList.toggle('player--active'));
}

//Функция выбора активного игрока
function activePlayer() {
    return [...players].filter(player => player.classList.contains('player--active'));
}

//Функция новой игры
function newGame() {
    totalScore = 0;
    document.querySelectorAll('.score').forEach(score => score.textContent = 0);
    dice.classList.remove('hidden');
    dice.src = 'dice-1.png';
    players.forEach(player => {
        if (player.classList.contains('player--active')) player.classList.remove('player--active');
        if (player.classList.contains('player--0')) player.classList.add('player--active');
        if (player.classList.contains('player--winner')) player.classList.remove('player--winner');
        player.querySelector('.current-score').textContent = 0;
    });
    roll.addEventListener('click', rollDice);
    hold.addEventListener('click', holdScore);
}

