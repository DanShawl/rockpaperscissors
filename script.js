function rpsGame(yourChoice) {
  console.log(yourChoice);
  let humanChoice, botChoice;
  humanChoice = yourChoice.id;

  botChoice = numberToChoice(randomNumRps());
  console.log('Computer Choice: ', botChoice);

  results = decideWinner(humanChoice, botChoice);
  console.log('[User Score, Bot Score]', results);

  message = finalMessage(results); // {message: "You won", "color: 'green'}
  console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randomNumRps() {
  return Math.floor(Math.random() * 3);
}

//
function numberToChoice(number) {
  return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
  let rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };

  let yourScore = rpsDatabase[yourChoice][computerChoice];
  let computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: 'You Lost', color: 'red' };
  } else if (yourScore === 0.5) {
    return { message: 'You Tied', color: 'rgb(255, 239, 100)' };
  } else {
    return { message: 'You Won', color: 'rgb(116, 219, 85)' };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  let imagesDatabase = {
    rock: document.getElementById('rock').src,
    paper: document.getElementById('paper').src,
    scissors: document.getElementById('scissors').src,
  };

  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  let humanDiv = document.createElement('div');
  let botDiv = document.createElement('div');
  let messageDiv = document.createElement('div');

  humanDiv.innerHTML =
    "<img src='" +
    imagesDatabase[humanImageChoice] +
    "' width= 150px style='box-shadow: 0px 10px 20px #0000009d; border-radius: 50%;'>";
  messageDiv.innerHTML =
    "<h1 style='color: " +
    finalMessage['color'] +
    "; font-size: 4rem; padding: .5em 2em; '>" +
    finalMessage['message'] +
    '</h1>';
  botDiv.innerHTML =
    "<img src='" +
    imagesDatabase[botImageChoice] +
    "' width= 150px style='box-shadow: 0px 10px 20px #ff8585; border-radius: 50%;'>";

  document.querySelector('.flex-box-rps').appendChild(humanDiv);
  document.querySelector('.flex-box-rps').appendChild(messageDiv);
  document.querySelector('.flex-box-rps').appendChild(botDiv);
}
