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
var pickedLetters = "";

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
}

function cellBackground() {
      event.target.style.backgroundColor = "pink";
      event.preventDefault();
      for (var i = 0; i < wordCells.length; i++) {
            wordCells[i].addEventListener("mouseenter", cellExtBackground)
      };
      pickedLetters += event.target.innerHTML;
      document.getElementById("pickedLetters").value = pickedLetters;
}

function cellExtBackground() {
      event.target.style.backgroundColor = "pink";
      pickedLetters += event.target.innerHTML;
      document.getElementById("pickedLetters").value = pickedLetters;
}

function cellEndBackground() {
      for (var i = 0; i < wordCells.length; i++) {
            wordCells[i].removeEventListener("mouseenter", cellExtBackground)
      }
      pickedLetters = "";
      document.getElementById("pickedLetters").value = pickedLetters;
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