import './Square.scss';
import { AllowedValues } from '../interfaces/interfaces';

interface SquareProps {
    index: number;
    value: AllowedValues;
    onSquareClick: (index: number) => void;
}

function Square({ index, value, onSquareClick }: SquareProps) {
    return (
        <button className="square" onClick={() => onSquareClick(index)}>
            {value}
        </button>
    );
}

export default Square;
