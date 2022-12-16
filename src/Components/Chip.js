


export const Chip = (props)=>{


    const handleClick = ()=>{
        props.addToStake(props.amount)
    }

    return(
        <button type="button" className="btn btn-dark" onClick={handleClick}>{props.amount}</button>
    )
}