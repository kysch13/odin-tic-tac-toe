const gameBoard = (function () {
    const board = document.getElementById('board');
    const boardCells = document.querySelectorAll('.board-cell');
    const actionBar = document.querySelector('.actions');
    const modal = document.querySelector('.modal');
    const modalSettings = document.querySelector('.modal-settings');
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
        gameProgress.currentPlayer = 0;
        console.log(gameProgress.players[gameProgress.currentPlayer].marker);
    }

    return {squares, buildBoard, resetBoard, board, boardCells, modal, modalWindow, actionBar, modalSettings};
})();

const gameProgress = (function () {
    const players = [{marker: 'x', name: 'Player 1'}, {marker: 'o', name: 'Player 2'}];
    let currentPlayer = 0;
    const placeMarker = function (x, y) {
        if (gameBoard.squares[x][y] === null) {
            gameBoard.squares[x][y] = players[gameProgress.currentPlayer].marker;
            gameBoard.boardCells.forEach(cell => {
                if (cell.dataset.x == x && cell.dataset.y == y) {
                    cell.innerText = players[gameProgress.currentPlayer].marker;
                    cell.dataset.played = "true";
                }
            });
            
            checkWin(players[gameProgress.currentPlayer].marker);
            //Switch to other player's turn
            gameProgress.currentPlayer = gameProgress.currentPlayer == 0 ? 1 : 0;
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
                console.log(`${players[gameProgress.currentPlayer].name} wins!!`);
                gameProgress.endGame(`${players[gameProgress.currentPlayer].name} wins!!`);
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
    return {placeMarker, currentPlayer, endGame, players};
})();

gameBoard.board.addEventListener('click', (e) => {
    if (e.target.dataset.x != undefined) {
        gameProgress.placeMarker(e.target.dataset.x, e.target.dataset.y);
    }
})

gameBoard.modal.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.classList[0] == 'modal' || e.target.dataset.action == 'close') {
        gameBoard.modal.classList.remove('active');
    }
})

gameBoard.modalSettings.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.classList[0] == 'modal-settings' || e.target.dataset.action == 'close') {
        gameBoard.modalSettings.classList.remove('active');
    } else if (e.target.dataset.action == 'save') {
        gameProgress.players[0].name = document.getElementById('p1_name').value;
        gameProgress.players[1].name = document.getElementById('p2_name').value;
        gameBoard.modalSettings.classList.remove('active');
    }
})

gameBoard.actionBar.addEventListener('click', (e) => {
    if (e.target.dataset.action == 'reset') {
        gameBoard.resetBoard();
    } else if (e.target.dataset.action = 'settings') {
        gameBoard.modalSettings.classList.add('active');
    }
    
})

gameBoard.buildBoard();