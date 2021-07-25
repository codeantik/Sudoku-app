const Game = () => {
    return ( 
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
     );
}
 
export default Game;