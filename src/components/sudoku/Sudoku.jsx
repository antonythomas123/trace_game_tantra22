import React, { useState } from 'react'
import './Sudoku.css'

const initial = [
    [-1, 5, -1, 9, -1, -1, -1, -1, -1],
    [8, -1, -1, -1, 4, -1, 3, -1, 7],
    [-1, -1, -1, 2, 8, -1, 1, 9, -1],
    [5, 3, 8, 6, -1, 7, 9, 4, -1],
    [-1, 2, -1, 3, -1, 1, -1, -1, -1],
    [1, -1, 9, 8, -1, 4, 6, 2, 3],
    [9, -1, 7, 4, -1, -1, -1, -1, -1],
    [-1, 4, 5, -1, -1, -1, 2, -1, 9],
    [-1, -1, -1, -1, 3, -1, -1, 7, -1]
]

function Sudoku() {
    const [sudokuArr, setSudokuArr] = useState(initial);

    const getDeepCopy = (arr) => {
        return JSON.parse(JSON.stringify(arr));
    }

    const onInputChange = (e, row, col) => {
        var val = parseInt(e.target.value) || -1, grid = getDeepCopy(sudokuArr);
        if (val === -1 || val >= 1 && val <= 9) {
            grid[row][col] = val;
        }
        setSudokuArr(grid);
    }


    const compareSudokus = (currentSudoku, solvedSudoku) => {
        let res = {
            isComplete: true,
            isSolvable: true
        }
        for (var i = 0;i < 9; i++){
           for(var j= 0;j<9;j++){
                if(currentSudoku[i][j] != solvedSudoku[i][j]){
                    if(currentSudoku[i][j] != -1){
                        resetSudoku.isSolvable = false;
                    }
                    res.isComplete = false;
                }
            }    
        }
        return res;
    }
    const checkSudoku = () => {
        let sudoku = getDeepCopy(initial);
        solver(sudoku);
        let compare = compareSudokus(sudokuArr, sudoku);
        if(compare.isComplete){
            alert('Congratualtions! You have solved the Sudoku');
        }else if(compare.isSolvable){
            alert('Keep going!');
        }else{
            alert("Sudoku can't be solved. Try Again!!");
        }
    }
    const checkRow = (grid, row, num) => {
        return grid[row].indexOf(num) === -1
    }
    const checkCol = (grid, col, num) => {
        return grid.map(row => row[col]).indexOf(num) === -1;
    }
    const checkBox = (grid, row, col, num) => {
        let boxArr = [],
            rowStart = row - (row % 3),
            colStart = col - (col % 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                boxArr.push(grid[rowStart + i][colStart + j])
            }
        }
        return boxArr.indexOf(num) === -1;
    }
    const checkValid = (grid, row, col, num) => {
        //num should be unique in row, col and in the square 3  x 3
        if (checkRow(grid, row, num) && checkCol(grid, col, num) && checkBox(grid, row, col, num)) {
            return true;
        }
        return false;
    }
    const getNext = (row, col) => {
        return col !== 8 ? [row, col + 1] : row != 8 ? [row + 1, 0] : [0, 0];
    }
    const solver = (grid, row=0, col=0) => {
        if (grid[row][col] !== -1) {
            let isLast = row >= 8 && col >= 8;
            if (!isLast) {
                let [newRow, newCol] = getNext(row, col);
                return solver(grid, newRow, newCol);
            }
        }

        for (let num = 1; num <= 9; num++) {
            if (checkValid(grid, row, col, num)) {
                grid[row][col] = num;
                let [newRow, newCol] = getNext(row, col);

                if (!newRow && !newCol) {
                    return true;
                }
                if (solver(grid, newRow, newCol)) {
                    return true;
                }
            }
        }
        grid[row][col] = -1;
        return false;
    }
    const solveSudoku = () => {
        let sudoku = getDeepCopy(initial);
        solver(sudoku);
        setSudokuArr(sudoku);
    }

    const resetSudoku = () => {
        let sudoku = getDeepCopy(initial);
        setSudokuArr(sudoku);
    }
    return (
        <div className='sudoku'>
            <div className="sudoku_header">
                <h3>Sudoku Solver</h3>
                <table>
                    <tbody>
                        {
                            [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
                                return <tr key={rIndex} className={(row + 1) % 3 === 0 ? 'bBorder' : ''}>
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                                        return <td key={rIndex + cIndex} className={(col + 1) % 3 === 0 ? 'rBorder' : ''}>
                                            <input
                                                onChange={(e) => onInputChange(e, row, col)}
                                                value={sudokuArr[row][col] === -1 ? '' : sudokuArr[row][col]}
                                                className='cellInput'
                                                disabled={initial[row][col] !== -1}
                                            />
                                        </td>
                                    })}
                                </tr>
                            })
                        }

                    </tbody>
                </table>
                <div className='buttonContainer'>
                    <button className='checkButton' onClick={checkSudoku}>Check</button>
                    {/* <button className='solveButton' onClick={solveSudoku}>Solve</button> */}
                    <button className='resetButton' onClick={resetSudoku}>Reset</button>
                </div>
            </div>
        </div>
    )
}

export default Sudoku