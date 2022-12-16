

import { useEffect } from "react";


export const StartPage = (props)=>{

    return(
        <div className="container">
            <div className="row text-center my-5">
                <h1>Welcome to BlackJack</h1>
                <p>When you begin a game you will start with £1000. When you 
                    lose all your money you will start again with £1000.
                    Click on the buttons to add to your stake.
                </p>
                <p>Your current record is £{props.highScore}</p>
            </div>

        </div>
        
    )
}