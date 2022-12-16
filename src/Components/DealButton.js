


export const DealButton = (props)=>{


    const handleClick =()=>{
        props.deal()
    }

return  <button type="button" className="btn btn-success" onClick={handleClick}>
                    Deal
        </button>
          
    
}