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
  console.log(boardArray)
}

getRollRequirementOrder()
createBoard()
console.log(resourceBank)
