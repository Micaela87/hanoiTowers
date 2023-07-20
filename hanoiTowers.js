let totalNumOfRings = 6;
const totalMoves = (2**totalNumOfRings) - 1;
let moves = 0;
const columnsToBeInverted = [4];
let currentMove = 4;
let addedMove = 8;
let ringsLeft = 6;
let numberOfEights = 0;
let numberOfFours = 1;
const firstTowerRings = [];
const secondTowerRings = [];
const thirdTowerRings = [];

const populateFirstTower = (tower) => {
    for (let i = 1; i <= totalNumOfRings; i++) {
        tower.push(i);
    }
}

const populateColumnsToBeInverted = (arr, currentMove, addedMove) => {
    
    for (let i = 1; i <= totalMoves + 1; i+=addedMove) {
        
        addedMove = 8;
        numberOfEights++;
        for (let i = 1; i <= numberOfEights; i++) {
            currentMove += addedMove;
            arr.push(currentMove);
        }
        
        if (addedMove === 8) {
            addedMove = 4;
            numberOfFours++;
            for (let i = 1; i <= numberOfFours; i++) {
                currentMove += addedMove;
                arr.push(currentMove);
            }
        }
    }

}

const calculateCurrentMoves = () => {
    const towerMoves = [];
    let counter = 0;

    if (moves > totalMoves) {
        return towerMoves;
    }

    moves += 2;
    if (columnsToBeInverted.includes(moves)) {
        towerMoves.push([counter, counter + 1]);
        towerMoves.push([counter + 2, counter]);
    } else {
        towerMoves.push([counter, counter + 1]);
        towerMoves.push([counter, counter + 2]);
    }
   
    return towerMoves;
}

const hanoiTowers = (...args/*firstTower, secondTower, thirdTower*/) => {

    calculateCurrentMoves().forEach((move) => {
        args[move[1]].unshift(args[move[0]].shift());
    });

}

const recursive = () => {

    populateFirstTower(firstTowerRings);
    populateColumnsToBeInverted(columnsToBeInverted, currentMove, addedMove);

    while (moves <= totalMoves) {
        hanoiTowers(firstTowerRings, secondTowerRings, thirdTowerRings);
        hanoiTowers(secondTowerRings, thirdTowerRings, firstTowerRings);
        hanoiTowers(thirdTowerRings, firstTowerRings, secondTowerRings);
    }
    
}

recursive();