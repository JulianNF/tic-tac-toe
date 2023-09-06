import { ReactElement, useState } from 'react';
import './Game.scss';
import Board from '../Board';
import { AllowedValues, Players } from '../interfaces/interfaces';
import { UndoIcon } from '../assets/images/UndoIcon';
import { RedoIcon } from '../assets/images/RedoIcon';
import { RestartIcon } from '../assets/images/RestartIcon';

function Game(): ReactElement {
    const [currentPlayer, setCurrentPlayer] = useState<Players>('X');
    const [squares, setSquares] = useState<AllowedValues[]>(
        Array(9).fill(null)
    );
    const [gameHistory, setGameHistory] = useState<AllowedValues[][]>([
        squares,
    ]);
    const [moveCounter, setMoveCounter] = useState(0);

    const winner: AllowedValues = checkForWinner(squares);
    const gameIsFinished: boolean = isGameFinished(squares);
    let status: string;
    if (winner) status = `Winner ${winner}!`;
    else if (gameIsFinished) status = `Tie game!`;
    else status = `Current player: ${currentPlayer}`;

    function isGameFinished(squares: AllowedValues[]): boolean {
        return !squares.includes(null);
    }

    function checkForWinner(squares: AllowedValues[]): AllowedValues {
        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
        ];

        for (let i = 0; i < winningLines.length; i++) {
            const [a, b, c] = winningLines[i];
            if (
                squares[a] !== null &&
                squares[a] === squares[b] &&
                squares[b] === squares[c]
            ) {
                return squares[a];
            }
        }

        return null; //fallback
    }

    function changeCurrentPlayer() {
        currentPlayer === 'X' ? setCurrentPlayer('O') : setCurrentPlayer('X');
    }

    function resetGame(): void {
        setCurrentPlayer('X');
        const emptyBoard = Array(9).fill(null);
        setSquares(emptyBoard);
        setGameHistory([emptyBoard]);
        setMoveCounter(0);
    }

    function onBoardClick(index: number): void {
        if (squares[index] !== null) return;
        if (winner) return;
        if (isGameFinished(squares)) return;

        const updatedSquares = [...squares];
        updatedSquares[index] = currentPlayer;
        setSquares(updatedSquares);

        if (moveCounter !== gameHistory.length - 1) {
            setGameHistory([
                ...gameHistory.slice(0, moveCounter + 1),
                updatedSquares,
            ]);
        } else {
            setGameHistory([...gameHistory, updatedSquares]);
        }

        setMoveCounter(moveCounter + 1);
        changeCurrentPlayer();
    }

    function undoMove() {
        if (moveCounter <= 0) return;

        setSquares(gameHistory[moveCounter - 1]);
        setMoveCounter(moveCounter - 1);
        changeCurrentPlayer();
    }

    function redoMove() {
        if (moveCounter >= gameHistory.length - 1) return;

        setSquares(gameHistory[moveCounter + 1]);
        setMoveCounter(moveCounter + 1);
        changeCurrentPlayer();
    }

    return (
        <div className="game">
            <h1>{status}</h1>
            <Board squares={squares} onBoardClick={onBoardClick} />
            <div className="toolbar">
                <button onClick={() => resetGame()}>
                    <RestartIcon />
                </button>
                <button
                    onClick={() => undoMove()}
                    disabled={gameIsFinished || moveCounter <= 0}
                >
                    <UndoIcon />
                </button>
                <button
                    onClick={() => redoMove()}
                    disabled={
                        gameIsFinished || moveCounter >= gameHistory.length - 1
                    }
                >
                    <RedoIcon />
                </button>
            </div>
        </div>
    );
}

export default Game;
