import { useState } from 'react';
import styles from './Board.module.scss';
import Square from '../Square/Square';
import { AllowedValues, Players } from '../interfaces/interfaces';

function Board() {
    const [player, setPlayer] = useState<Players>('X');
    const [squares, setSquares] = useState<AllowedValues[]>(
        Array(9).fill(null)
    );

    const winner: AllowedValues = checkForWinner(squares);
    let status: string;
    if (winner) status = `Winner ${winner}!`;
    else status = `Current player: ${player}`;

    function onSquareClick(index: number): void {
        if (squares[index] !== null) return;
        if (winner) return;
        if (isGameFinished(squares)) return;

        const updatedSquares = [...squares];
        updatedSquares[index] = player;
        setSquares(updatedSquares);

        player === 'X' ? setPlayer('O') : setPlayer('X');
    }

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

    function resetGame(): void {
        setPlayer('X');
        setSquares(Array(9).fill(null));
    }

    return (
        <>
            <div>{status}</div>
            <div className={styles.content}>
                {squares.map((square, index) => {
                    return (
                        <Square
                            key={index}
                            value={square}
                            onSquareClick={(): void => onSquareClick(index)}
                        />
                    );
                })}
            </div>
            <button onClick={() => resetGame()}>Reset board</button>
        </>
    );
}

export default Board;
