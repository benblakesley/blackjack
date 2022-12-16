


export const Chip = (props)=>{


    const handleClick = ()=>{
        props.addToStake(props.amount)
    }

    return(
        <button type="button" onClick={handleClick}>{props.amount}</button>
    )
}