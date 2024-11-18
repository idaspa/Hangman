//#region 
import * as readlinePromises from 'node:readline/promises';
import fs from "node:fs"
const rl = readlinePromises.createInterface({ input: process.stdin, output: process.stdout });
//#endregion

import { HANGMAN_UI } from './graphics.mjs';
import { GREEN, RED, WHITE, RESET, BLUE, YELLOW } from './colors.mjs';
import dictionary from './dictionary.mjs';


let word = getRandomWord();
let guessedWord = createGuessList(word.length);
let wrongGuesses = [];
let isGameOver = false;
let guesses = 0;
let gameLanguage = dictionary.en;
let choosenLanguage = await rl.question(gameLanguage.chooseLanguage);

if(choosenLanguage == `NO`){ 
    gameLanguage = dictionary.no;
} 

let playGame = await rl.question(gameLanguage.playGame);
if (playGame != gameLanguage.correct) {
    process.exit();
} 
do {

      updateUI();

    // Gjette en bokstav || ord.  (|| betyr eller).
    let guess = (await rl.question(gameLanguage.guessPrompt)).toLowerCase();

    guesses++;

    if (isWordGuessed(word, guess)) {
        print(gameLanguage.winCelibration, GREEN);
        isGameOver = true;
    }
    else if (word.includes(guess) && (wrongGuesses.includes(guess) == false)) {

        uppdateGuessedWord(guess);

        if (isWordGuessed(word, guessedWord)) {
           
            updateUI() 
            
            print(gameLanguage.winCelibration, GREEN);
           
            let replayAswer = (await rl.question(gameLanguage.playAgain)).toLowerCase();
            
            if(replayAswer == gameLanguage.correct){
                isGameOver = false;
                word = getRandomWord();
                guessedWord = createGuessList(word.length);
                wrongGuesses = [];  
            }
            else{
                isGameOver = true;
               }
        }
    } else if(wrongGuesses.includes(guess) == false){
        print(gameLanguage.wrong, RED);
        wrongGuesses.push(guess);

        if (wrongGuesses.length >= HANGMAN_UI.length - 1) {
          
            updateUI()
          
            print(gameLanguage.die, RED); 
            print(`${gameLanguage.tries} ${guesses} ${gameLanguage.guessAmount}`);

           let replayAswer = (await rl.question(gameLanguage.playAgain)).toLowerCase();

           if(replayAswer == gameLanguage.correct){
               isGameOver = false;
               word = getRandomWord();
                guessedWord = createGuessList(word.length);
                wrongGuesses = []; 
           }
           else{
               isGameOver = true;
              }
          
            
        }

    } 
        
    
    // Har du lyst å spille igjen?

 
} while (isGameOver == false)
    
    process.exit();


    
    

function uppdateGuessedWord(guess) {
    for (let i = 0; i < word.length; i++) {
        if (word[i] == guess) {
            guessedWord[i] = guess;
            // Banana og vi tipper a.
            // _ -> a
        }
    }
}

function createGuessList(length) {
    let output = [];
    for (let i = 0; i < length; i++) {
        output[i] = "_";
    }
    return output;
}

function isWordGuessed(correct, guess) {
    for (let i = 0; i < correct.length; i++) {
        if (correct[i] != guess[i]) {
            return false;
        }
    }

    return true;
}

function print(msg, color = WHITE) {
    console.log(color, msg, RESET);
}

function updateUI() {

    console.clear();
    print(guessedWord.join(""), GREEN);
    print(HANGMAN_UI[wrongGuesses.length]);
    if (wrongGuesses.length > 0) {
        print(gameLanguage.wrongGuesses + RED + wrongGuesses.join() + RESET);
    }
}

function getRandomWord() {

    const words = ["Kiwi", "Car", "Dog", "etwas"];
    let index = Math.floor(Math.random() * words.length);
    return words[index].toLowerCase();
    
}


    