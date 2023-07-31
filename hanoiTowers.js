let totalNumOfRings = 6;
const totalMoves = (2**totalNumOfRings) - 1;
let moves = 0;
const columnsToBeInverted = [4];
let currentMove = 4;
let addedMove = 8;
let numberOfEights = 1;
let numberOfFours = 2;
const firstTowerRings = [];
const secondTowerRings = [];
const thirdTowerRings = [];
const towers = [firstTowerRings, secondTowerRings, thirdTowerRings];

const populateFirstTower = (tower) => {
    for (let i = 1; i <= totalNumOfRings; i++) {
        tower.push(i);
    }
}

const populateColumnsToBeInverted = (arr, currentMove, addedMove) => {
    
    for (let i = 0; i <= totalMoves + 1; i+=addedMove) {

        addedMove = 8;
        for (let i = 1; i <= numberOfEights; i++) {
            currentMove += addedMove;
            arr.push(currentMove);
        }
        numberOfEights = 3;
        
        if (addedMove === 8) {
            addedMove = 4;
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

    if (moves < (totalMoves - 1)) {
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

    if (moves === (totalMoves - 1)) {
        towerMoves.push([counter, counter + 1]);
        moves++;
        return towerMoves;
    }
    
}

const hanoiTowers = (...args/*firstTower, secondTower, thirdTower*/) => {

    calculateCurrentMoves().forEach((move) => {
        args[move[1]].unshift(args[move[0]].shift());
    });

}

const recursive = () => {

    populateFirstTower(firstTowerRings);
    populateColumnsToBeInverted(columnsToBeInverted, currentMove, addedMove);

    while (moves < totalMoves) {
        hanoiTowers(towers[0], towers[1], towers[2]);
        const swappedTower = towers.shift();
        towers.push(swappedTower);
    }
    console.log(firstTowerRings, secondTowerRings, thirdTowerRings);
}

recursive();
