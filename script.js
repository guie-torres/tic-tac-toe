const cells = document.querySelectorAll(".cell")
const endText = document.querySelector(".end-text")
const scoreTexts = [
  document.querySelector("#score-blue"),
  document.querySelector("#score-red"),
]

const scores = [0, 0]

const colors = ["blue", "red", "gray"]
const winColors = ["aqua", "coral"]
const endTexts = ["Blue Won!", "Red Won!", "Draw"]

let paused = false

var turnNum = 0
var cellStatuses = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (
      getComputedStyle(cell).backgroundColor !== "rgb(255, 255, 255)" ||
      paused
    )
      return

    cell.style.background = colors[turnNum % 2]

    x = index % 3
    y = Math.floor(index / 3)

    cellStatuses[y][x] = 1 + (turnNum % 2)
    check_victory(x, y)
    turnNum++
  })
})

function check_victory(x, y) {
  if (Horizontal_Check(y)) {
    Next_Round(turnNum % 2, 0, x, y)
  } else if (Vertical_Check(x)) {
    Next_Round(turnNum % 2, 1, x, y)
  } else if (Diagonal_Check() === 1) {
    Next_Round(turnNum % 2, 2, x, y)
  } else if (Diagonal_Check() >= 2) {
    Next_Round(turnNum % 2, 3, x, y)
  } else if (turnNum === 8) {
    Next_Round(2, 0, 0, x, y)
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

  return upDown + downUp * 2
}

async function Next_Round(status, pattern, x, y) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cellStatuses[i][j] = 0
    }
  }

  turnNum = -1

  endText.textContent = endTexts[status]
  endText.style.color = colors[status]
  endText.classList.remove("hide")

  if (status != 2) {
    scores[status] += 1
    scoreTexts[status].textContent = scores[status]

    switch (pattern) {
      case 0:
        for (let i = 0; i < 3; i++) {
          cells[i + 3 * y].style.backgroundColor = winColors[status]
        }
        break

      case 1:
        for (let i = 0; i < 3; i++) {
          cells[3 * i + x].style.backgroundColor = winColors[status]
        }
        break

      case 2:
        cells[0].style.backgroundColor = winColors[status]
        cells[4].style.backgroundColor = winColors[status]
        cells[8].style.backgroundColor = winColors[status]
        break

      case 3:
        cells[2].style.backgroundColor = winColors[status]
        cells[4].style.backgroundColor = winColors[status]
        cells[6].style.backgroundColor = winColors[status]
        break
    }
  }

  paused = true
  await wait(1000)
  paused = false
  cells.forEach((cell) => {
    cell.style.backgroundColor = "rgb(255, 255, 255)"
  })

  endText.classList.add("hide")
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
