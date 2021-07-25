const Theme = () => {
    return ( 
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
     );
}
 
export default Theme;