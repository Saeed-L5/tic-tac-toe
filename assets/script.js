$(document).ready(function () {
    let currentPlayer = 'X'; // Current player (X or O)
    let game = ['', '', '', '', '', '', '', '', '']; // The game board
    let gameActive = true; // Tracks if the game still active
    let scores = { X: 0, O: 0, D: 0 }; // Tracks scores for X, O and Draws

    // Create game board 
    for (let i = 0; i < 9; i++) {
        $('#board').append('<div class="cell" data-index="' + i + '"></div>');
    }

    // Create Cell Click 
    $('.cell').click(function () {
        let index = $(this).data('index'); // Get the index of Clicked cell
        // Check if the cell is empty and the game is still active
        if (game[index] === '' && gameActive) {
            game[index] = currentPlayer; // Update the game status
            $(this).addClass(currentPlayer === 'X' ? 'x-mark' : 'o-mark').text(currentPlayer); // Update the UI

            // Check if win or draw
            if (checkWin()) {
                handleWin();
            } else if (game.every(cell => cell !== '')) {
                handleDraw();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // For switch players
            }
        }

    });

    /**this function checks the winner
     * winPaterns descripe win combinations
     * return effect to win cells
     * return {boolean} true if current player won
     */
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //Columns
            [0, 4, 8], [2, 4, 6], // Diagonals
        ];

        return winPatterns.some(pattern => {
            if (pattern.every(index => game[index] === currentPlayer)) {
                pattern.forEach(i => {
                    return $(`.cell[data-index="${i}"]`).css('transform', 'scale(1.1)'); // Add effect on wining cells
                });
                return true;
            }
            return false;

        });


    }
    /**
    * This function handles the win
    * it sets the game boolean to false
    * increments the players score and 
    * updates it on screen
    * It does not return anything
    */
    function handleWin() {
        game = false;
        scores[currentPlayer]++;
        updateScores();
    }

    // Reset Button
    $('#resetBtn').click(function () {
        game = ['', '', '', '', '', '', '', '', '']; // Reset game state
        gameActive = true;
        currentPlayer = 'X';
        $('.cell').removeClass('x-mark o-mark draw').text('').css('transform', 'scale(1)'); //restore default styles
    });
    /** this function updates scores
     * display scores that been updated with current values
     * It does not return anything
     */
    function updateScores() {
        $('#xScore').text(scores.X);
        $('#oScore').text(scores.O);
        $('#drawCount').text(scores.D);
    }
    /**  This function handles draw scenario
    * it sets the game boolean to false
    * update draw counter
    * It does not return anything
    */
    function handleDraw() {
        game = false;
        scores.D++;
        updateScores();
        $('.cell').addclass('draw'); // Add draw styling
    }
    
    // Navigation 
    $('.nav-link').click(function (e) {
        e.preventDefault();
        // Get the target page
        const target = $(this).attr('href'); 
        // Hide the target page 
        $('.page').addClass('d-none'); 
        // show the target page
        $(target).removeClass('d-none'); 
        // remove active class from all links
        $('.nav-link').removeClass('active'); 
        // Add active class to the clicked link
        $(this).addClass('active'); 
    });
});

