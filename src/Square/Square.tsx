import { MouseEventHandler } from 'react';
import styles from './Square.module.scss';
import { AllowedValues } from '../interfaces/interfaces';

function Square({
    value,
    onSquareClick,
}: {
    value: AllowedValues;
    onSquareClick: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button className={styles.content} onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default Square;
