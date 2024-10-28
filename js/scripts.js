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

    return {squares, buildBoard};
})();

const gameProgress = (function () {
    const placeMarker = function (x, y, marker) {
        if (gameBoard.squares[x][y] === null) {
            gameBoard.squares[x][y] = marker;
        }   
    }
    return {placeMarker};
})();

function createPlayer(name) {
    return {name};
}

gameBoard.buildBoard();
const player1 = createPlayer('Me');
const player2 = createPlayer('Mac');
console.log(gameBoard.squares);