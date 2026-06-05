let score = JSON.parse(localStorage.getItem('score')) || {
    win:0,
    lose:0,
    tie:0
};

updateScore();

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
    playGame('scissors');
});

document.addEventListener('keydown', (event) => {

    if(event.key === 'r'){
        playGame('rock');
    }
    else if(event.key === 'p'){
        playGame('paper');
    }
    else if(event.key === 's'){
        playGame('scissors');
    }

});

function playGame(playerMove){

    const computerMove = pickComputerMove();

    let result = '';

    if(playerMove === 'rock'){

        if(computerMove === 'rock'){
            result = 'Tie';
            score.tie++;
        }
        else if(computerMove === 'paper'){
            result = 'You Lose';
            score.lose++;
        }
        else{
            result = 'You Win';
            score.win++;
        }

    }

    else if(playerMove === 'paper'){

        if(computerMove === 'rock'){
            result = 'You Win';
            score.win++;
        }
        else if(computerMove === 'paper'){
            result = 'Tie';
            score.tie++;
        }
        else{
            result = 'You Lose';
            score.lose++;
        }

    }

    else if(playerMove === 'scissors'){

        if(computerMove === 'rock'){
            result = 'You Lose';
            score.lose++;
        }
        else if(computerMove === 'paper'){
            result = 'You Win';
            score.win++;
        }
        else{
            result = 'Tie';
            score.tie++;
        }

    }

    localStorage.setItem('score', JSON.stringify(score));

    const resultElement =
    document.querySelector('.js-result');

    resultElement.innerHTML = result;

    if(result === 'You Win'){
        resultElement.style.color = 'lime';
    }
    else if(result === 'You Lose'){
        resultElement.style.color = 'red';
    }
    else{
        resultElement.style.color = 'yellow';
    }

    document.querySelector('.js-moves').innerHTML =
    `
    You picked <strong>${playerMove}</strong>
    |
    Computer picked <strong>${computerMove}</strong>
    `;

    updateScore();
}

function updateScore(){

    const totalGames =
        score.win + score.lose + score.tie;

    const winRate =
        totalGames === 0
        ? 0
        : ((score.win / totalGames) * 100).toFixed(1);

    document.querySelector('.js-score').innerHTML =
    `
    Wins: ${score.win}
    |
    Losses: ${score.lose}
    |
    Ties: ${score.tie}
    |
    Win Rate: ${winRate}%
    `;
}

function resetScore(){

    score = {
        win:0,
        lose:0,
        tie:0
    };

    localStorage.removeItem('score');

    updateScore();

    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
}

function pickComputerMove(){

    const randomNumber = Math.random();

    if(randomNumber < 1/3){
        return 'rock';
    }
    else if(randomNumber < 2/3){
        return 'paper';
    }
    else{
        return 'scissors';
    }
}
