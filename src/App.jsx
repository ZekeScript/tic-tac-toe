import { useState } from 'react'
import { TURNS } from './constants'
import confetti from 'canvas-confetti'
import { GameBoard } from './components/GameBord'
import { TurnSection } from './components/TurnSection'
import { WinnerModal } from './components/WinnerModal'
import { SaveGame, resetGameStorage } from './logic/storage'
import { WinnerLogic, checkEndGame } from './logic/WinnerLogic'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null)
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
    <main>
      <header>
        <h1>Tic Tac Toe</h1>
      </header>
      <section className='board'>
        <GameBoard board={board} updateBoard={updateBoard} />
        <TurnSection turn={turn} />
        <button onClick={resetGame}>Reset</button>
        <WinnerModal resetGame={resetGame} winner={winner} />
      </section>
      <footer>
        <div className='signature'>
          <p>Developed by <span className='signature__author'>ZekeScript</span></p>
          <p>&copy; 2023. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

export default App
