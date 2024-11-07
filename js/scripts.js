const gameBoard = (function () {
    const board = document.getElementById('board');
    const boardCells = document.querySelectorAll('.board-cell');
    const actionBar = document.querySelector('.actions');
    const modal = document.querySelector('.modal');
    const modalWindow = document.querySelector('.modal-window > div');
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
        gameBoard.boardCells.forEach(cell => {
            cell.dataset.played = "false";
            cell.innerText = '';
        });
        for (let x=0; x<3; x++){
            for (let y=0; y<3; y++){
                squares[x][y] = null;
            }
        }
        // Reset current player to X
        gameProgress.currentPlayer[0] = 'x';
    }

    return {squares, buildBoard, resetBoard, board, boardCells, modal, modalWindow, actionBar};
})();

const gameProgress = (function () {
    const currentPlayer = ['x'];
    const placeMarker = function (x, y) {
        if (gameBoard.squares[x][y] === null) {
            gameBoard.squares[x][y] = currentPlayer[0];
            gameBoard.boardCells.forEach(cell => {
                if (cell.dataset.x == x && cell.dataset.y == y) {
                    cell.innerText = currentPlayer[0];
                    cell.dataset.played = "true";
                }
            });
            checkWin(currentPlayer[0]);
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
                gameProgress.endGame(`${marker} wins!!`);
                //gameBoard.resetBoard();
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
                //gameBoard.resetBoard();
                gameProgress.endGame(`It's a draw.`);
                return 'Draw';
            }

        }
    }
    const endGame = function (modalMsg) {
        gameBoard.modal.classList.add('active');
        gameBoard.modalWindow.innerText = modalMsg;
        
        // set each cell/square to played so that play can't continue without reset
        gameBoard.boardCells.forEach(cell => {
            cell.dataset.played = "true";
        });
        for (let x=0; x<3; x++){
            for (let y=0; y<3; y++){
                gameBoard.squares[x][y] = '-';
            }
        }
    }
    return {placeMarker, currentPlayer, endGame};
})();

gameBoard.board.addEventListener('click', (e) => {
    if (e.target.dataset.x != undefined) {
        gameProgress.placeMarker(e.target.dataset.x, e.target.dataset.y, gameProgress.currentPlayer);
    }
})

gameBoard.modal.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.classList[0] == 'modal' || e.target.classList[0] == 'modal-close-btn') {
        gameBoard.modal.classList.remove('active');
    }
})

gameBoard.actionBar.addEventListener('click', (e) => {
    if (e.target.dataset.action == 'reset') {
        gameBoard.resetBoard();
    }
})

gameBoard.buildBoard();