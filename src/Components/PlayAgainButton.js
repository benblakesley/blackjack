


export const PlayAgainButton = (props)=>{


    const handleClick =()=>{
        props.playAgain()
    }

return  <button type="button" className="btn btn-success" onClick={handleClick}>
                    Play Again
        </button>
          
    
}