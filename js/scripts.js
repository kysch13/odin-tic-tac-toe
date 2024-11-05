const gameBoard = (function () {
    const board = document.getElementById('board');
    const squares = [];
    const buildBoard = function () {
        for (let x=0; x<3; x++){
            squares[x] = [];
            for (let y=0; y<3; y++){
                squares[x].push(null);
            }
        }
    }
    const resetBoard = function () {
        for (let x=0; x<3; x++){
            for (let y=0; y<3; y++){
                squares[x][y] = null;
            }
        }
        // Reset current player to X
        gameProgress.currentPlayer[0] = 'x';
    }

    return {squares, buildBoard, resetBoard, board};
})();

const gameProgress = (function () {
    const currentPlayer = ['x'];
    const placeMarker = function (x, y, marker) {
        if (gameBoard.squares[x][y] === null) {
            gameBoard.squares[x][y] = marker;
            checkWin(marker);
            //Switch to other player's turn
            currentPlayer[0] = currentPlayer[0] == 'x' ? 'o' : 'x';
            
        }   
    }
    const checkWin = function (marker) { {
        console.log(marker);
            if ((gameBoard.squares[0][0] == marker && gameBoard.squares[0][1] == marker && gameBoard.squares[0][2] == marker) ||
                (gameBoard.squares[1][0] == marker && gameBoard.squares[1][1] == marker && gameBoard.squares[1][2] == marker) ||
                (gameBoard.squares[2][0] == marker && gameBoard.squares[2][1] == marker && gameBoard.squares[2][2] == marker) ||
                (gameBoard.squares[0][0] == marker && gameBoard.squares[1][0] == marker && gameBoard.squares[2][0] == marker) ||
                (gameBoard.squares[0][1] == marker && gameBoard.squares[1][1] == marker && gameBoard.squares[2][1] == marker) ||
                (gameBoard.squares[0][2] == marker && gameBoard.squares[1][2] == marker && gameBoard.squares[2][2] == marker) ||
                (gameBoard.squares[0][0] == marker && gameBoard.squares[1][1] == marker && gameBoard.squares[2][2] == marker) ||
                (gameBoard.squares[2][0] == marker && gameBoard.squares[1][1] == marker && gameBoard.squares[0][2] == marker)

            ) {
                console.log(`${marker} wins!!`);
                gameBoard.resetBoard();
                return marker;
            } else {
                // If no win condition is present, check for unplayed squares. If no win, and no unplayed squares, return a draw
                for (let i=0; i<3; i++) {
                    for (let j=0; j<3; j++) {
                        if (gameBoard.squares[i][j] == null) {
                            return;
                        }
                    }
                }
                console.log('Draw');
                gameBoard.resetBoard();
                return 'Draw';
            }

        }
    }
    return {placeMarker, currentPlayer};
})();

function createPlayer(name) {
    return {name};
}

gameBoard.buildBoard();
const player1 = createPlayer('Me');
const player2 = createPlayer('Mac');
console.log(gameBoard.squares);


gameBoard.board.addEventListener('click', (e) => {
    e.target.innerText = gameProgress.currentPlayer;
    gameProgress.placeMarker(e.target.dataset.x, e.target.dataset.y, gameProgress.currentPlayer);
    
})