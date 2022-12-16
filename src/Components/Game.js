import { useEffect, useState } from "react";
import { getCard } from "../ApiRequests/GetCard";
import { getCardValue } from "../HelperFunctions/getCardValue";
import { DrawCardButton } from "./DrawCardButton";
import { Hand } from "./Hand";
import { Stand } from "./Stand";
import { winner } from "../HelperFunctions/winner";
import { DealButton } from "./DealButton";
import { getHandValue } from "../HelperFunctions/getHandValue";

import { StartPage } from "./StartPage";
import { SetOfChips } from "./SetOfChips";


import { useLocalStorage } from "../HelperFunctions/useLocalStorage";
import { UndoStake } from "./UndoStake";

export const Game = () =>{



    /*We want to store some things in local storage.
        These will be the user's high score and the users balance
    */

    const [gameOver, setGameOver] = useState(false);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [gameBeingPlayed, setGameBeingPlayed] = useState(false);

    const [balance, setBalance] = useLocalStorage('balance', 1000);
    const [stake, setStake] = useLocalStorage('stake', 0);
    const [highScore, setHighScore] = useLocalStorage('high score', 1000);
    const [playerBankrupt, setPlayerBankrupt] = useState(false);


    useEffect(()=>{

        if(balance==0){
            setBalance(1000);
        }

    },[])
   
    const addCardToDealerHand = async()=>{
        const cardPromise = await getCard();

        const jsonCard = await cardPromise.json();

        const card = {
            cardValue: jsonCard.cards[0].value,
            cardImageUrl: jsonCard.cards[0].image
        }

        setDealerHand(oldDealerHand=>[...oldDealerHand, card]);

        const cardValueAsInteger = getCardValue(card.cardValue);

       

        

        return cardValueAsInteger;
    }
    

    const addCardToPlayerHand = async()=>{
        const cardPromise = await getCard();

        const jsonCard = await cardPromise.json();

        const card = {
            cardValue: jsonCard.cards[0].value,
            cardImageUrl: jsonCard.cards[0].image
        }
       setPlayerHand(oldPlayerHand => [...oldPlayerHand, card]);  
    }
    

    // hook to track player score
    //If a player busts then the game is over, the player is no longer playing and the dealer plays
    useEffect(()=>{
        if(getHandValue(playerHand) > 21){
                setGameOver(true);
                addCardToDealerHand();
        }
            
        
    },[playerHand]);


    //hook to track dealer score and end game at correct point
    useEffect(()=>{
        /* this first if statement is to ensure that the dealer only draws
            when the player has stopped drawing 
        */
        if(dealerHand.length>1){
        if(getHandValue(dealerHand)>=17){
            setGameOver(true);
        }
        else if(getHandValue(dealerHand)<17){
            addCardToDealerHand();
        }
    }
    },[dealerHand]);

    const addToStake = (amount) => {
        setStake(stake => stake+amount);
    }

    //hook to track if the game is over and do something when it is
    useEffect(()=>{
        if(gameOver){
            
           
            if(winner(getHandValue(playerHand), getHandValue(dealerHand))==1){
                console.log("you won");
                const newBalance = balance + stake;
                setBalance(newBalance);
                if(newBalance>highScore){
                    setHighScore(newBalance);
                }
            }
            else if(winner(getHandValue(playerHand),getHandValue(dealerHand))==-1){
                console.log("you lost");
                const newBalance = balance - stake;
                setBalance(newBalance)
                if(newBalance==0){
                    setTimeout(()=>setPlayerBankrupt(true), 2000);
                }
            }
            else if(winner(getHandValue(playerHand), getHandValue(dealerHand))==0){
                console.log("push");
            }
        
        setStake(0);

        

    }}, [gameOver]);

  
    

    const deal = ()=>{
        if(stake!=0){
        setGameBeingPlayed(true);
        setGameOver(false);
        setPlayerHand([]);
        setDealerHand([]);
        addCardToDealerHand();
        addCardToPlayerHand();
        addCardToPlayerHand();
        }
        else{
            console.log("You need to set a stake");
        }
       }

    const undoStake = ()=>{
        setStake(0);
    }

       const refreshPage = () =>{
        window.location.reload(false);
       }

       if(playerBankrupt){
        return(
            <div className="container">
            <h1 className="text-center">
                You are bankrupt. Your record is £{highScore}!
            </h1>
            <div className="text-center">
            <button type="button" className="btn btn-success" onClick={refreshPage}>Home</button>
            </div>
            </div>
        )
    }
   
       //when the game is over we re-render with a button to play again
    else if(gameOver){
        return(
            <div>
            <h1 className="text-center my-2">Blackjack</h1>
            <h3 className="text-center mb-1">Dealer Hand - {getHandValue(dealerHand)}</h3>
            <Hand cards={dealerHand}/>
            
            <h3 className="text-center">Your Hand - {getHandValue(playerHand)}</h3>
            <Hand cards={playerHand}/>
            <div className="text-center mt-2">
            <div className="text-center mb-2">
                Balance: £{balance}    Current Stake: £{stake}
            </div>
            <UndoStake undoStake={undoStake}/>
            </div>
            <div className="text-center mt-3">
            <SetOfChips addToStake={addToStake} balance={balance} stake={stake}/>
            </div>
            <div className="text-center mt-3">
            <DealButton deal={deal}/>
            </div>
        </div>
        )
    }
    
    else if(!gameBeingPlayed){
        return(
            <div>
            <StartPage highScore={highScore}/>
            <div className="text-center my-5">
            <div className="text-center mb-2">
                Balance: £{balance}    Current Stake: £{stake}
            </div>
            <UndoStake undoStake={undoStake}/>
            </div>
            <SetOfChips addToStake={addToStake} balance={balance} stake={stake}/>
            <div className="text-center my-5">
            <DealButton deal={deal}/>
            </div>
            </div>
        )

    }

    
    
    return(
        <div>
            <h1 className="text-center my-2">Blackjack</h1>
            <h3 className="text-center mb-1">Dealer Hand - {getHandValue(dealerHand)}</h3>
            <Hand cards={dealerHand}/>
           
            <h3 className="text-center mb-1">Your Hand - {getHandValue(playerHand)}</h3>
            <Hand cards={playerHand}/>
            
            <div className="row">
                <div className="col text-end">
            <DrawCardButton hit={addCardToPlayerHand}/>
            </div>
            <div className="col">
            <Stand stand={addCardToDealerHand}/>
            </div>
            </div>

            
        </div>
    )

    
}





