import confetti from 'canvas-confetti'
import { useState } from 'react'
import { GameBoard } from './components/GameBord'
import { TurnSection } from './components/TurnSection'
import { WinnerModal } from './components/WinnerModal'
import { TURNS } from './constants'
import { WinnerLogic, checkEndGame } from './logic/WinnerLogic'
import { SaveGame, resetGameStorage } from './logic/storage'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const checkWinner = (newBoard) => {
    const newWinner = WinnerLogic(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      resetGameStorage()
      confetti({
        particleCount: 150,
        spread: 120
      })
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
      resetGameStorage()
    }
  }

  const updateBoard = (index) => {
    // If the square is filled, skip
    if (board[index] || winner) return

    // Draw the simbol in the cell
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Turn change
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    SaveGame(newBoard, newTurn)
    checkWinner(newBoard)
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <GameBoard board={board} updateBoard={updateBoard} />
      <TurnSection turn={turn} />
      <button onClick={resetGame}>Reset</button>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
