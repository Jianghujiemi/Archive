
// Interactive Demo Puzzle Handler - Static Version
(function() {
    'use strict';
    
    const ANSWER = "INTERACTIVE";
    
    function submit(index, guess) {
        guess = guess.toUpperCase();
        if (!(guess.length === 1 && guess >= 'A' && guess <= 'Z')) {
            return {
                error: 'Please guess a letter from A to Z.',
                correct: false,
            };
        }
        const correct = ANSWER[index - 1] === guess;
        return { correct: correct };
    }
    
    window.interactiveDemoSubmit = submit;
})();
