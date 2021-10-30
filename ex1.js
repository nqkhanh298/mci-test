/*
OUTPUT: Winning probality
MOVE:
    - get 1 or 2 => -1f
    - get 3 to 5 => +1f
    - get 6 => 1 more: +nf (1 <= n <= 6)
TOTAL MOVE: 100
WINNING CONDITION: f >= 60
NOTE:
    - 0.1% go to f0
    - f >= 0
    - unlimited turn
*/

const MOVE_CONDITION = 100
const FLOOR_CONDITION = 60

run(100)

function run(runTotal, winningProbability = 0, successTotal = 0, failTotal = 0) {
    // NOTE: more runTotal, more exactly winning probality
    for (let i = 0; i < runTotal; i++) {
        let totalFloor = calculateFloor(MOVE_CONDITION, FLOOR_CONDITION)
        let isSuccess = checkSuccess(totalFloor)

        isSuccess ? successTotal += 1 : failTotal += 1

        console.log('Turn:', i + 1) 
        console.log('Total floor: ', totalFloor)
        console.log('----------')
    }

    winningProbability = (successTotal / runTotal) * 100

    console.log('RESULT: ')
    console.log('successTotal:', successTotal)
    console.log('failTotal:', failTotal)
    console.log('Winning probality:', winningProbability, '%')
}

function calculateFloor(moveCondition, floorCondition, moveCount = 0, currentFloor = 0) {
    // Dice till condition is not available
    while (moveCount < moveCondition && currentFloor < floorCondition) {
        let floorCanMove = getStep(currentFloor)
        currentFloor += floorCanMove

        // Back to floor 0 if get trap
        if (getTrap()) currentFloor = 0

        moveCount += 1
    }

    return currentFloor
}

function checkSuccess(floor) {
    // Success if go to floor greater or equal than 60
    return floor >= 60 ? true : false
}

function getStep(currentFloor, floorCanMove) {
    let num = rollDice()

    // Move action
    if (num === 1 || num === 2) {
        currentFloor >= 1 ? floorCanMove = -1 : floorCanMove = 0
    } else if (num >= 3 && num <= 5) {
        floorCanMove = 1
    } else if (num === 6) {
        let step_bonus = rollDice()
        floorCanMove = step_bonus
    }

    return floorCanMove
}

function rollDice() {
    // Random dice from 1 to 6
    return Math.floor(Math.random() * 6 + 1)
}

function getTrap() {
    // 0.1% get trap
    let trap = Math.floor(Math.random() * 1000 + 1)
    return trap === 1 ? true : false
}