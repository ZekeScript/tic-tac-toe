import { Square } from './Square'

export function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'Draw' : 'Winner:'

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>
        <div className='win'>
          {winner && <Square>{winner}</Square>}
        </div>
        <div>
          <button onClick={resetGame}>Reset</button>
        </div>
      </div>
    </section>
  )
}
