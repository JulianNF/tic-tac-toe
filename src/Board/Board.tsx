import './Board.scss';
import Square from '../Square/Square';
import { AllowedValues } from '../interfaces/interfaces';
import { ReactElement } from 'react';

interface BoardProps {
    squares: AllowedValues[];
    onBoardClick: (index: number) => void;
}

function Board({ squares, onBoardClick }: BoardProps): ReactElement {
    return (
        <>
            <div className="board">
                {squares.map((square, index) => {
                    return (
                        <Square
                            key={index}
                            index={index}
                            value={square}
                            onSquareClick={(index) => onBoardClick(index)}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default Board;
