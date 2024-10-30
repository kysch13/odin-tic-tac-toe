const gameBoard = (function () {
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

    return {squares, buildBoard, resetBoard};
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