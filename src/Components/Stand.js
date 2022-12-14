
export const Stand = (props)=>{


    const handleClick=()=>{
        props.stand()
    }

    return(
            <button type="button" className="btn btn-primary" onClick={handleClick}>
                        Stand
            </button>
              
    )
}
