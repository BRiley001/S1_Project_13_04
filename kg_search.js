"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 4

   Wordsearch Game Script
   
   Filename: kg_search.js
   Author: Brenden Riley
   Date:   3.26.19
   
   
   Function List
   
   function drawWordSearch(letters, words)
      Returns the HTML code for a word search table based on the entries
      in the letters array and the location of the words
      in the words array
      
   showList(list)
      Returns the HTML for code for an unordered list of words based
      on the items in the list array

*/
window.onload = init;

var wordCells;
var pickedInputLetters = "";
var pickedWord = "";
var crossoutword;
var selectedWord = [];
var numCorrectWords = [];
var solvedWords = [];
var solvedPuzzle = [];
function init() {
      document.getElementById("wordTable").innerHTML = drawWordSearch(letterGrid, wordGrid);
      document.getElementById("wordList").innerHTML = showList(wordArray);
      document.getElementById("wordSearchTitle").innerHTML = wordSearchTitle;
      wordCells = document.querySelectorAll("table#wordSearchTable tbody tr td")
      for (var i = 0; i < wordCells.length; i++) {
            wordCells[i].addEventListener("mousedown", cellBackground)
      }
      for (var i = 0; i < wordCells.length; i++) {
            wordCells[i].addEventListener("mouseup", cellEndBackground)
      }
      document.getElementsByTagName("tbody")[0].addEventListener("mouseenter", function () {
            document.getElementsByTagName("tbody")[0].style.cursor = "pointer";
      })
}

function cellBackground() {
      event.target.style.backgroundColor = "pink";
      selectedWord.push(event.target);
      event.target.removeEventListener("mouseenter", cellExtBackground);
      event.preventDefault();
      for (var i = 0; i < wordCells.length; i++) {
            wordCells[i].addEventListener("mouseenter", cellExtBackground)
      };
      pickedInputLetters += event.target.innerHTML;
      document.getElementById("pickedLetters").value = pickedInputLetters;
}

function cellExtBackground() {
      event.target.style.backgroundColor = "pink";
      event.target.removeEventListener("mouseenter", cellExtBackground);
      pickedInputLetters += event.target.innerHTML;
      document.getElementById("pickedLetters").value = pickedInputLetters;
      selectedWord.push(event.target);
}

function cellEndBackground() {
      selectedWord.push(event.target);
      for (var i = 0; i < wordCells.length; i++) {
            wordCells[i].removeEventListener("mouseenter", cellExtBackground)
      }
      for (var i = 0; i < wordArray.length; i++) {
            if (wordArray[i].includes(pickedInputLetters)) {
                  crossoutword = document.querySelectorAll("figure#wordList ul li")
                  crossoutword[i].style.textDecoration = "line-through";
                  for (var j = 0; j < selectedWord.length; j++) {
                        selectedWord[j].style.backgroundColor = "lightgreen";
                  }
                  crossoutword = "";
                  break;
            } else {
                  for (var j = 0; j < selectedWord.length; j++) {
                        selectedWord[j].style.backgroundColor = "";
                  }
            }

      };
      pickedInputLetters = "";
      document.getElementById("pickedLetters").value = pickedInputLetters;
      selectedWord = [];
      solvedWords = document.querySelectorAll("figure#wordList ul li");
      for (var a = 0; a < solvedWords.length; a++) {
            if (solvedWords[a].style.textDecoration == "line-through") {
                  solvedPuzzle.push(solvedWords[a])
            }
      }
      if (solvedPuzzle.length === 25) {
            window.alert("Congrats! You completed the puzzle")
      }
}




/*============================================================*/

function drawWordSearch(letters, words) {
      var rowSize = letters.length;
      var colSize = letters[0].length;

      var htmlCode = "<table id='wordSearchTable'>";
      htmlCode += "<caption>Word Search</caption>";

      for (var i = 0; i < rowSize; i++) {
            htmlCode += "<tr>";

            for (var j = 0; j < colSize; j++) {
                  if (words[i][j] == " ") {
                        htmlCode += "<td>";
                  } else {
                        htmlCode += "<td class='wordCell'>";
                  }
                  htmlCode += letters[i][j];
                  htmlCode += "</td>";
            }

            htmlCode += "</tr>";
      }
      htmlCode += "</table>";

      return htmlCode;
}

function showList(list) {
      var htmlCode = "<ul id='wordSearchList'>";

      for (var i = 0; i < list.length; i++) {
            htmlCode += "<li>" + list[i] + "</li>";
      }

      htmlCode += "</ul>";

      return htmlCode;
}