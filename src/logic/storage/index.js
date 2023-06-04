export const SaveGame = (boar, turn) => {
  window.localStorage.setItem('board', JSON.stringify(boar))
  window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}
