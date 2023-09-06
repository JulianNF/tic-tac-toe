import './Square.scss';
import { AllowedValues } from '../interfaces/interfaces';
import { ReactElement } from 'react';

interface SquareProps {
    index: number;
    value: AllowedValues;
    onSquareClick: (index: number) => void;
}

function Square({ index, value, onSquareClick }: SquareProps): ReactElement {
    return (
        <button className="square" onClick={() => onSquareClick(index)}>
            {value}
        </button>
    );
}

export default Square;
