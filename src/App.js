import './App.css';
// import Difficulty from './components/Difficulty';
// import Duration from './components/Duration';
// import Theme from './components/Theme';
// import Stats from './components/Stats';
// import Game from './components/Game';

import { easy, medium, hard } from './components/Board';
import swal from 'sweetalert'

function App() {

  let timer, timeRemaining, lives, selectedNum, selectedTile, disableSelect
  // console.log(easy, medium, hard)
  window.onload = () => {
      qs('.start-btn').addEventListener('click', startGame)

      // add click event listener to each number in number-container
      for(let i = 0; i < qs('.number-container').children.length; i++) {
        qs('.number-container').children[i].addEventListener('click', function() {
          // if selection is not disabled
          if(!disableSelect) {
            // if number is already selected
            if(this.classList.contains('selected')) {
              // remove selection
              this.classList.remove('selected')
              selectedNum = null
            }
            else {
              // deselect all other numbers
              for(let i = 0; i < 9; i++) {
                qs('.number-container').children[i].classList.remove('selected')
              }

              // select and update selectedNum
              this.classList.add('selected')
              selectedNum = this
              updateMove()
            }
          }
        })
      }
  }
  

  const startGame = () => {
      console.log('start!!!!')
      let board
      if(qs('#dif-1').checked) board = easy[0]
      else if(qs('#dif-2').checked) board = medium[0]
      else board = hard[0]

      // set lives 3 and enable selecting numbers and tiles
      lives = 3
      disableSelect = false
      qs('.lives').textContent = "Lives remaining: 3"

      // creates board based on difficulty
      generateBoard(board)

      // start the timer
      startTimer()

      // set theme based on input
      if(qs('#theme-1').checked) {
        qs('body').classList.remove('dark')
      }
      else {
        qs('body').classList.add('dark')
      }

      // show number container
      qs('.number-container').classList.remove('hidden')
  }

  const startTimer = () => {
    if(qs('#dur-1').checked) timeRemaining = 180
    else if(qs('#dur-2').checked) timeRemaining = 300
    else timeRemaining = 600

    // set timer for first second
    qs('.timer').textContent = timeConversion(timeRemaining)

    // set timer to update every second
    timer = setInterval(() => {
      timeRemaining--
      // if(timeRemaining === 0) endGame()
      qs('.timer').textContent = timeConversion(timeRemaining)
    }, 1000)
  }

  // seconds into string of MM:SS format
  const timeConversion = (time) => {
    let minutes = Math.floor(time / 60)
    if(minutes < 10) minutes = '0' + minutes 
    let seconds = time % 60
    if(seconds < 10) seconds = '0' + seconds
    return minutes + ':' + seconds
  }

  const generateBoard = board => {
    // clear previous board
    clearPrevious()

    let idCount = 0
    for(let i = 0; i < 81; i++) {
      // create a new paragraph element
      let tile = document.createElement('p')

      // if the tile is not blank
      if(board.charAt(i) !== '-') {
        tile.textContent = board.charAt(i)
      }
      else {
        // add click event listener to tile
        tile.addEventListener('click', () => {
          // if selection is not disabled
          if(!disableSelect) {
            // if the tile is already selected
            if(tile.classList.contains('selected')) {
              // remove selection
              tile.classList.remove('selected')
              selectedTile = null
            }
            else {
              // deselect all other tiles
              for(let i = 0; i < 81; i++) {
                qsa('.tile')[i].classList.remove('selected')
              }
              // add selection and update selectedTile
              tile.classList.add('selected')
              selectedTile = tile
              updateMove()
            }
          }
        })
      }

      // assign tile id
      tile.id = idCount;
      idCount++;
      tile.classList.add('tile')

      // add border classes
      if((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54)) {
        tile.classList.add('bottom-border')
      }

      if((tile.id + 1) % 9 === 3 || (tile.id + 1) % 9 === 6) {
        tile.classList.add('right-border')  
      }

      // add tile to board
      qs('.board').appendChild(tile)
    }
  }

  const updateMove = () => {
    // if a tile and a number is selected
    if(selectedTile && selectedNum) {
      // set the tile to the correct number
      selectedTile.textContent = selectedNum.textContent

      // if the number matches the corresponding number in the solution
      if(checkCorrect(selectedTile)) {
        // deselect the tile
        selectedTile.classList.remove('selected')
        selectedNum.classList.remove('selected')

        // clear the selected variables
        selectedNum = null
        selectedTile = null

        //check if board is filled
        if(checkDone()) {
          endGame()
        }

      }
      else {
        // disable selecting new numbers for one second
        disableSelect = true;

        // make the tile turn red
        selectedTile.classList.add('incorrect')

        // run in one second
        setTimeout(() => {
          // subtract lives
          lives--

          // if null lives left end the game
          if(lives === 0) {
            endGame()
          }
          else {
            // if lives not null
            // update lives text
            qs('.lives').textContent = "Lives Remaining: " + lives

            // renable seleting tile and numbers
            disableSelect = false
          }

          // restore tile color and remove selected from both
          selectedTile.classList.remove('incorrect')
          selectedTile.classList.remove('selected')
          selectedNum.classList.remove('selected')

          // clear the tile's text and selected variables
          selectedTile.textContent = ''
          selectedTile = null
          selectedNum = null
        }, 1000)
      }
    }
  }

  const checkDone = () => {
    let tiles = qsa('.tile')

    for(let i = 0; i < 81; i++) {
      if(tiles[i].textContent === '') return false;
    }
    return true;
  }

  const endGame = () => {
    // disable moves and stop the timer
    disableSelect = true
    clearTimeout(timer)

    // display outcome
    let outcome
    if(lives === 0 || timeRemaining === 0) {
      qs('.lives').textContent = 'You Lost!!'
      outcome = 0
    }
    else {
      qs('.lives').textContent = 'You Won!!'
      outcome = 1
    }

    setTimeout(() => outcome ? swal('You won, Play Again') : swal('You lost, Play Again'), 500)
  }

  const checkCorrect = (tile) => {
    // set solution based on difficulty solution
    let solution
    if(qs('#dif-1').checked) solution = easy[1]
    else if(qs('#dif-2').checked) solution = medium[1]
    else solution = hard[1]

    // if tile's number is equal to soltion's number
    return solution.charAt(tile.id) === tile.textContent
  }

  const clearPrevious = () => {
    let tiles = qsa('.tile')
    console.log(tiles)
    // remove each tile
    for(let i = 0; i < tiles.length; i++) {
      tiles[i].remove()
    }

    // if there is a timer clear it
    if(timer) clearInterval(timer)

    // deselect any numbers
    // console.log(qs('.number-container').children)
    for(let i = 0; i < qs('.number-container').children.length; i++) {
      qs('.number-container').children[i].classList.remove('selected')
    }

    // clear selected variables
    selectedNum = null
    selectedTile = null
  }

  // helper functions

  const qs = clsName => {
    return document.querySelector(`${clsName}`)
  }

  const qsa = selector => {
    return document.querySelectorAll(`${selector}`)
  }




  return (
    <div className='container'>
      <header>
        <h1>Sudoku</h1>
        <div className='game-setup'>
          <div className='difficulty'>
              <h3>Choose Difficulty: </h3>
              <label>
                  <input id='dif-1' type='radio' name='dif' value='easy' defaultChecked/>
                  Easy
              </label>
              <label>
                  <input id='dif-2' type='radio' name='dif' value='medium'/>
                  Medium
              </label>
              <label>
                  <input id='dif-3' type='radio' name='dif' value='hard'/>
                  Hard
              </label>
          </div>

          <div className='duration'>
            <h3>Choose duration: </h3>
            <label>
                <input id='dur-1' type='radio' name='dur' value='three' defaultChecked/>
                3 Min
            </label>
            <label>
                <input id='dur-2' type='radio' name='dur' value='five' />
                5 Min
            </label>
            <label>
                <input id='dur-3' type='radio' name='dur' value='tem' />
                10 Min
            </label>
          </div>

          <div className='theme'>
            <h3>Choose Theme: </h3>
            <label>
                <input id='theme-1' type='radio' name='theme' value='light' defaultChecked/>
                Light
            </label>
            <label>
                <input id='theme-2' type='radio' name='theme' value='dark'/>
                Dark
            </label>
          </div>
        </div>
        <button className='start-btn'>Create New Game</button>
      </header>
      
      <div className='stats'>
            <p className='timer'></p>
            <p className='lives'></p>
      </div>

      <div className='game'>
          <div className='board'></div>
          <div className='number-container hidden'>
              <p className="one">1</p>
              <p className="two">2</p>
              <p className="three">3</p>
              <p className="four">4</p>
              <p className="five">5</p>
              <p className="six">6</p>
              <p className="seven">7</p>
              <p className="eight">8</p>
              <p className="nine">9</p>
          </div>
      </div>

    <footer>
      <p>Made with 💘 by codeantik</p>
      <p>Copyright &copy; 2021 RTT</p>
    </footer>
    </div>
  );
}

export default App;
