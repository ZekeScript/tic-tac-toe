import { WINNING_COMBOS } from '../constants'

export const WinnerLogic = (boardToCheck) => {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  return null
}

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square != null)
}
