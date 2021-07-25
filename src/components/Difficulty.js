const Difficulty = ({ startGame }) => {
    return ( 
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
     );
}
 
export default Difficulty;