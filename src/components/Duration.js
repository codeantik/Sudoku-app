const Duration = () => {
    return ( 
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
     );
}
 
export default Duration;