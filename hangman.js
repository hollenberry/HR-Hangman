$(document).ready(function(){
$(function() {
    $("form").submit(function() { return false; });
});
  $('.input').keypress(function (e) {
    if (e.which == 13) {
      var guess1 = $('#guess').val();
      $('#guess').val('');
      onEnter(guess1);
    }
  });
});
//First I initialize an array so that the user can play the game multiple
//times.

var wordArray = ['Hack', 'Reactor', 'Remote', 'Beta', 'October', 'Fifth',
'Cohort', 'Javascript', 'CSS', 'HTML','Prep', 'Sleepless', 'Eminem'];
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
  $('.wrongBox').text(wrongLetters);
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

//The most important function in the JS file. Checks, replaces, and initiates most
//other functions after being initialized by onEnter below.
function checkLetter (array, guess) {
  var letterFound = false;
  array.forEach(function(letter, index){
    if (letter == guess.toUpperCase()) {
      currentWord = replaceLetter(index, guess.toUpperCase(), currentWord);
      letterFound = true;
    } else if (letter == guess.toLowerCase()) {
        currentWord = replaceLetter(index, guess.toLowerCase(), currentWord);
        letterFound = true;
    }
  });
  if (!letterFound) {
    wrongLetters.push(guess);
  }
  updateWord();
  return currentWord;
}

//What happens when you click enter.
function onEnter (guess) {
  checkLetter(word, guess);
    if (wrongLetters.length == 1) {
      drawHead();
    }
    if (wrongLetters.length == 2) {
      drawBody();
    }
    if (wrongLetters.length == 3) {
      drawArms();
    }
    if (wrongLetters.length == 4) {
      drawLeftLeg();
    }
    if (wrongLetters.length == 5) {
      drawRightLeg();
      lose();
    }
    if (word.join("") == currentWord) {
       win();
    }
}

//Drawing the hangMan
var hangMan = document.getElementById("hangMan");
var context = hangMan.getContext('2d');

var drawHead = function () {
  context.fillStyle = "white";
  context.beginPath();
  context.arc(110, 30, 20, 0, 2*Math.PI);
  context.closePath();
  context.fill();
}

var drawBody = function() {
  context.beginPath();
  context.moveTo(110, 40);
  context.lineTo(110, 110);
  context.strokeStyle = "white";
  context.stroke();
}

var drawArms = function() {
context.beginPath();
context.strokeStyle = "blue";
context.moveTo(110, 60);
context.lineTo(80, 100);
context.moveTo(110, 60);
context.lineTo(140, 100);
context.stroke();
}

var drawLeftLeg = function() {
context.beginPath();
context.strokeStyle = "blue";
context.moveTo(110, 110);
context.lineTo(80, 130);
context.stroke();
}

var drawRightLeg = function() {
context.beginPath();
context.moveTo(110, 110);
context.lineTo(140, 130);
context.stroke();
}

//Win-Loss Conditions
var win = function() {
  alert("You win!");
  location.reload();
}

var lose = function() {
  alert("You lose!")
  location.reload();
}
