//App.js
import React, { useState, useEffect } from "react";
import "./App.css";

const sampleWords = [
  {
    word: "HELLO",
    description: "A common greeting to say hi."
  },
  {
    word: "WORLD",
    description: "The planet we live on, which is full of land and water."
  },
  {
    word: "JAVASCRIPT",
    description: "A popular programming language for building interactive websites and provides behavior to applications."
  },
  {
    word: "REACT",
    description: "A JavaScript library for building user interfaces."
  },
  {
    word: "PROGRAMMING",
    description: "The process of developing code to assist computers to perform tasks."
  },
  {
    word: "PYTHON",
    description: "A versatile programming language used for various tasks, from web development to data science."
  },
  {
    word: "MACHINE LEARNING",
    description: "A field of artificial intelligence that enables computers to learn from data without explicit programming."
  },
  {
    word: "DATA SCIENCE",
    description: "The field of extracting knowledge and insights from large datasets."
  },
  {
    word: "ALGORITHM",
    description: "A step-by-step procedure for solving a problem or accomplishing a task."
  },
  {
    word: "DATABASE",
    description: "A structured collection of data organized for easy access and management."
  },
  {
    word: "CLOUD COMPUTING",
    description: "The delivery of computing services over the internet."
  },
  {
    word: "CYBERSECURITY",
    description: "The practice of protecting computer systems and networks from digital attacks."
  },
  {
    word: "INTERNET OF THINGS (IoT)",
    description: "The interconnection of physical devices embedded with sensors, actuators, and network connectivity."
  },
  {
    word: "ARTIFICIAL INTELLIGENCE (AI)",
    description: "The simulation of human intelligence processes by machines, especially computer systems."
  },
  {
    word: "VIRTUAL REALITY (VR)",
    description: "A simulated experience that can be similar to or completely different from the real world."
  },
  {
    word: "AUGMENTED REALITY (AR)",
    description: "The integration of digital information with the real world through technology."
  },
  {
    word: "BLOCKCHAIN",
    description: "A decentralized and distributed digital ledger technology."
  },
  {
    word: "CRYPTOCURRENCY",
    description: "A digital or virtual currency that uses cryptography for security."
  },
  {
    word: "QUANTUM COMPUTING",
    description: "A type of computing that harnesses the principles of quantum mechanics."
  },
  {
    word: "SOFTWARE ENGINEERING",
    description: "The systematic approach to the design, development, testing, and maintenance of software."
  },
  {
    word: "USER EXPERIENCE (UX)",
    description: "The overall experience and satisfaction a user has with a product or service."
  },
  {
    word: "USER INTERFACE (UI)",
    description: "The graphical layout of an application, including buttons, menus, and other visual elements."
  },
  {
    word: "FRONT-END DEVELOPMENT",
    description: "The development of the client-side of web applications, focusing on the visual elements and user interaction."
  },
  {
    word: "BACK-END DEVELOPMENT",
    description: "The development of the server-side of web applications, handling data storage, processing, and business logic."
  },
  {
    word: "FULL-STACK DEVELOPMENT",
    description: "The development of both the front-end and back-end of web applications."
  },
  {
    word: "API",
    description: "An application programming interface, allowing software applications to communicate with each other."
  }
];

const getRandomWord = () => {
    const randomPlace = Math.floor(Math.random() * sampleWords.length);
    return sampleWords[randomPlace];
};

const GFGWordGame = () => {
    const [wordData, setWordData] = useState(getRandomWord());
    const [msg, setMsg] = useState("");
    const [chosenLetters, setChosenLetters] = useState([]);
    const [hints, setHints] = useState(3);
    const [displayWord, setDisplayWord] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [wrongGuesses, setWrongGuesses] = useState(0);

    useEffect(() => {
        if (wrongGuesses >= 3) {
            // Code to show the popup or message for game over
            window.alert("Game Over! You made too many wrong guesses.");
            restartGameFunction();
        }
    }, [wrongGuesses]);

    const letterSelectFunction = (letter) => {
        if (!chosenLetters.includes(letter)) {
            setChosenLetters([...chosenLetters, letter]);
            if (!wordData.word.includes(letter)) {
                setWrongGuesses(wrongGuesses + 1);
            }
        }
    };

    const hintFunction = () => {
        if (hints > 0) {
            const hiddenLetterIndex = wordData.word
                .split("")
                .findIndex((letter) => !chosenLetters.includes(letter));
            setChosenLetters([...chosenLetters, wordData.word[hiddenLetterIndex]]);
            setHints(hints - 1);
        }
    };

    const removeCharacterFunction = () => {
        setChosenLetters(chosenLetters.slice(0, -1));
    };

    const displayLettersFunction = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        return Array.from(letters).map((letter, index) => (
            <button
                key={index}
                onClick={() => letterSelectFunction(letter)}
                disabled={chosenLetters.includes(letter)}
                className={`letter-button ${
                    chosenLetters.includes(letter) ? "selected" : ""
                }`}
            >
                {letter}
            </button>
        ));
    };

    const checkWordGuessedFunction = () => {
        return wordData.word.split("").every((letter) => chosenLetters.includes(letter));
    };

    const guessFunction = () => {
        if (checkWordGuessedFunction()) {
            setMsg("You have guessed the word correctly!");
        } else {
            setMsg("You made a Wrong Guess!. Try again!");
            setDisplayWord(true);
        }
    };

    const restartGameFunction = () => {
        setWordData(getRandomWord());
        setMsg("");
        setChosenLetters([]);
        setHints(3);
        setDisplayWord(false);
        setGameOver(false);
        setWrongGuesses(0);
    };

    return (
        <div className="container">
            <h1>Word Game</h1>
            <div className="word-container">
                {Array.from(wordData.word).map((letter, index) => (
                    <div
                        key={index}
                        className={`letter ${
                            chosenLetters.includes(letter) ? "visible" : ""
                        }`}
                    >
                        {chosenLetters.includes(letter) ? letter : ""}
                    </div>
                ))}
            </div>
            <p className="word-description">Hint: {wordData.description}</p>
            {msg && (
                <div className="message">
                    <p>{msg}</p>
                    {displayWord && <p>Correct word was: {wordData.word}</p>}
                </div>
            )}
            <div className="button-section">
                <div className="guess-section">
                    <button
                        onClick={restartGameFunction}
                        className="restart-button"
                    >
                        Restart
                    </button>
                    <button
                        onClick={removeCharacterFunction}
                        disabled={!chosenLetters.length}
                        className="remove-button"
                    >
                        Remove Letter
                    </button>
                </div>
                <div className="letter-selection">
                    {displayLettersFunction()}
                </div>
                <div className="hints">
                    Hints Remaining: {hints}{" "}
                    <button
                        onClick={hintFunction}
                        disabled={hints === 0}
                        className="hint-button"
                    >
                        Get Hint
                    </button>
                </div>
                {!msg && (
                    <button
                        onClick={guessFunction}
                        disabled={!chosenLetters.length}
                        className="guess-button"
                    >
                        Guess
                    </button>
                )}
            </div>
        </div>
    );
};

export default GFGWordGame;
