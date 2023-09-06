import './Board.scss';
import Square from '../Square/Square';
import { AllowedValues } from '../interfaces/interfaces';

interface BoardProps {
    squares: AllowedValues[];
    onBoardClick: (index: number) => void;
}

function Board({ squares, onBoardClick }: BoardProps) {
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
