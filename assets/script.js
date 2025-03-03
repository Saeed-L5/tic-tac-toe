$(document).ready(function () {
    let currentPlayer = 'X';
    let game = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let scores = { X: 0, O: 0, D: 0 };

    // Create game board 
    for (let i = 0; i < 9; i++) {
        $('#board').append('<div class="cell" data-index="' + i + '"></div>');
    }

    // Create Cell Click 
    $('.cell').click(function () {
        let index = $(this).data('index');

        if (game[index] === '' && gameActive) {
            game[index] = currentPlayer;
            $(this).addClass(currentPlayer === 'X' ? 'x-mark' : 'o-mark').text(currentPlayer);

            if (checkWin()) {
                handleWin();
            } else if (game.every(cell => cell !== '')) {
                handleDraw();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
            }
        }

    });

    // Check win conditions
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //Columns
            [0, 4, 8], [2, 4, 6], // Diagonals
        ];

        return winPatterns.some(pattern => {
            if (pattern.every(index => game[index] === currentPlayer)) {
                pattern.forEach(i => {
                    return $(`.cell[data-index="${i}"]`).css('transform', 'scale(1)'); // Add effect on win cells
                });
                return true;
            }
            return false;

        });

    
    }
    // Handle win score
    function handleWin() {
        game = false;
        scores[currentPlayer]++;
        updateScores();
    }

    // Reset Button
    $('#resetBtn').click(function() {
        game = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        $('.cell').removeClass('x-mark o-mark draw').text('').css('transform', 'scale(1)');
    })
    //Create update score function
    function updateScores() {
        $('#xScore').text(scores.X);
        $('#oScore').text(scores.O)
        $('#drawCount').text(scores.D);
    }
    // Create draw score function
    function handleDraw() {
        game = false;
        scores.D++;
        updateScores();
        $('.cell').addclass('draw');
    }
})
