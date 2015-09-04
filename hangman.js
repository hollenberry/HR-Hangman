$(document).ready(function(){
  $('.input').keypress(function (e) {
    if (e.which == 13) {
      var guess1 = $('#guess').val();
      onEnter(guess1);
    }
  });
});
//First I initialize an array so that the user can play the game multiple
//times.

var wordArray = ['Hack', 'Reactor', 'Remote', 'Beta', 'October', 'Fifth',
'Cohort', 'Javascript', 'CSS', 'HTML', 'San Diego', 'New York City',
'Prep', 'Sleepless', 'Eminem'];
var currentWord;
var wrongLetters = [];

//After this selection is made, we run our word choice function that
//will generate a random word from the array. Here, I use the Math.floor
//and Math.random functions in tandem so that a new number is likely to be
//produced each time, and is then rounded down by floor.

function wordChoice (array) {
    var number = Math.floor(Math.random()* array.length);
    return array[number];
}

var word = wordChoice(wordArray).split("");

//Once the word has been produced, I have created a function that will
//create the proper number of blanks to match the word that has been returned
//from wordChoice.
function blankGenerator(array) {
  var empty = array.map(function(letter){
    return "_";
  });
  return empty.join("");
}

currentWord = blankGenerator(word);
updateWord();

function updateWord () {
  $('#prompt').text(currentWord.split("").join(" "));
};

//Here we have a function that will replace the blanks with letters, after
//user guesses. It does this by taking the unidentified string, and breaking it
//into pieces. It breaks the string into a piece from start - the letter index.
//Then it adds the replacement letter into the string, and returns the rest of the
//string back.

function replaceLetter(stringIndex, newLetter, originalString) {
  return originalString.substr(0, stringIndex) + newLetter +
  originalString.substr(stringIndex + 1, originalString.length);
}

//This function

function checkLetter (array, guess) {
  array.forEach(function(letter, index){
    if (letter == guess.toUpperCase()) {
      currentWord = replaceLetter(index, guess.toUpperCase(), currentWord);
    } else if (letter == guess.toLowerCase()) {
        currentWord = replaceLetter(index, guess.toLowerCase(), currentWord);
    } else {
      wrongLetters.push(guess);
    }
  });
  updateWord();
  return currentWord;
}

function onEnter (guess) {
  checkLetter(word, guess);
    if (wrongLetters.length == 5) {
      lose();
    }
    if (word.join("") == currentWord) {
       win();
    }
}

var win = function() {
  alert("You win!");
}

var lose = function() {
  alert("You lose!")
}
