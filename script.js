const cells = document.querySelectorAll(".cell")
const colors = ["blue", "red"]
var turnNum = 0

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (getComputedStyle(cell).backgroundColor !== "rgb(255, 255, 255)") return

    cell.style.background = colors[turnNum % 2]
    turnNum++
  })
})
