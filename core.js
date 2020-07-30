// finna clap
let boardArray = [],
  orderArray = []
let resourceBank = [
    {name: 'wood', left: 4}, 
    {name: 'wheat', left: 4}, 
    {name: 'brick', left: 3}, 
    {name: 'stone', left: 3}, 
    {name: 'sheep', left: 4},
    {name: 'robber', left: 1}]

let getCombination = (rollTotal) => {
        if (rollTotal == 2 ||rollTotal == 12) return 1                 
        if (rollTotal == 3 ||rollTotal == 11) return 2                
        if (rollTotal == 4 ||rollTotal == 10) return 3                
        if (rollTotal == 5 ||rollTotal == 9) return 4               
        if (rollTotal == 6 ||rollTotal == 8) return 5         
        return 6
}

let getResource = () => {
    let dice1 = Math.floor((Math.random() * 6) + 1)
    let dice2 = Math.floor((Math.random() * 6) + 1)

    console.log(dice1 + dice2)
    return dice1 + dice2
}

let getRollRequirementOrder = () => {
    orderArray = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11]
    let robberIndex = Math.floor(Math.random() * 18)
    orderArray.splice(robberIndex, 0, 7)
    return orderArray
}

let createHex = (idx) => {
  let hex = {}, resourceIndex = 0
  hex.rollRequirement = orderArray[idx]
  hex.probability = getCombination(hex.rollRequirement)
  if(hex.rollRequirement == 7) resourceIndex = 5
  else {
    resourceIndex = Math.floor(Math.random() * 5)
    while (resourceBank[resourceIndex].left == 0) {
      resourceIndex = Math.floor(Math.random() * 5)
    }
  }
  resourceBank[resourceIndex].left -= 1
  hex.resource = resourceBank[resourceIndex].name
  return hex
}

let createBoard = () => {
  for ( let idx = 0; idx < 19; idx++ ){
    boardArray.push(createHex(idx))
  }
}

let appendTile = (row, hex) => {
    let tile = document.createElement('div')
        tile.className = 'resourceTile ' + hex.resource
        let tD = document.createElement('div')
            tD.className = 'tileDetails'
        let tRR = document.createElement('div')
            tRR.className = 'tileRollRequirements'
            tRR.innerHTML = hex.rollRequirement
            let tP = document.createElement('div')
            tP.className = 'tileProbability'
            tP.innerHTML = hex.probability

    tD.appendChild(tRR) 
    tD.appendChild(tP)
    tile.appendChild(tD)
    document.getElementById(row).appendChild(tile)
}

let getOrderFromStart = (startingPoint) => {
  let fullArray = []
  let outerRingArray = [0, 1, 2, 6, 11, 15, 18, 17, 16, 12, 7, 3]
  let transitionRing = [4, 4, 5, 5, 10, 10, 14, 14, 13, 13, 8, 8]
  let innerRingArray = [4, 5, 10, 14, 13, 8]

  let outerRingIndices = splitArray(outerRingArray, startingPoint)
  let transitionIndices = splitArray(transitionRing, startingPoint)
  let innerStartIndex = innerRingArray.indexOf(transitionIndices[11])
  let innerRingIndices = splitArray(innerRingArray, innerStartIndex)

  fullArray.push(...outerRingIndices)
  fullArray.push(...innerRingIndices)
  fullArray.push(9)

  return fullArray
}

let splitArray = (arr, number) => {
  let firstHalfArray = arr.slice(0, number)
let lastHalfArray = arr.slice(number, boardArray.length)
lastHalfArray.push(...firstHalfArray)
return lastHalfArray
}

let getLoopedValue = (arr, index) => {
  while(index > arr.length - 1) {index -= arr.length}
  console.log('loopedvalue', index)
  return arr[index]
}

window.onload = () => {
    getRollRequirementOrder()
    createBoard()
    boardArray = getOrderFromStart(8)
    // placeTiles()
}
