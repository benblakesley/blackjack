
export const DrawCardButton = (props) =>{

    const handleClick = ()=>{
        props.hit();
    }

    return(
       
            <button type="button" className="btn btn-danger" onClick={handleClick}>
                        Draw Card/ Hit
            </button>
                    
    )
}