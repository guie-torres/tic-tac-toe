const cells = document.querySelectorAll(".cell")
const colors = ["blue", "red"]
var turnNum = 0
var cellStatuses = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (getComputedStyle(cell).backgroundColor !== "rgb(255, 255, 255)") return

    cell.style.background = colors[turnNum % 2]

    x = index % 3
    y = Math.floor(index / 3)

    cellStatuses[y][x] = 1 + (turnNum % 2)
    check_victory(x, y)
    turnNum++
  })
})

function check_victory(x, y) {
  if (Horizontal_Check(y) || Vertical_Check(x) || Diagonal_Check())
    console.log("VICTORY")
  else if (turnNum === 8) {
    console.log("DRAW")
  }
}

function Horizontal_Check(y) {
  var n = 0

  for (let i = 0; i < 3; i++) {
    if (cellStatuses[y][i] === 1 + (turnNum % 2)) n++
  }

  return n === 3
}

function Vertical_Check(x) {
  let n = 0

  for (let i = 0; i < 3; i++) {
    if (cellStatuses[i][x] === 1 + (turnNum % 2)) n++
  }

  return n === 3
}

function Diagonal_Check() {
  let upDown = false
  let downUp = false

  const p = 1 + (turnNum % 2)

  upDown =
    cellStatuses[0][0] === p &&
    cellStatuses[1][1] === p &&
    cellStatuses[2][2] === p

  downUp =
    cellStatuses[2][0] === p &&
    cellStatuses[1][1] === p &&
    cellStatuses[0][2] === p

  return upDown || downUp
}
