import { useEffect, useState } from "react";
import { getCard } from "../ApiRequests/GetCard";
import { getCardValue } from "../HelperFunctions/getCardValue";
import { DrawCardButton } from "./DrawCardButton";
import { Hand } from "./Hand";
import { Stand } from "./Stand";
import { winner } from "../HelperFunctions/winner";
import { PlayAgainButton } from "./PlayAgainButton";
import { getHandValue } from "../HelperFunctions/getHandValue";


export const Game = () =>{


    const [gameOver, setGameOver] = useState(false);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [playerPlaying, setPlayerPlaying] = useState(true);
   

    
   
   
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
    
 
   //when the game starts the player should have 2 cards
    useEffect(()=>{
        addCardToPlayerHand().then(addCardToPlayerHand());
    },[]);

    //when the game starts the dealer should have 2 cards
    useEffect(()=>{
        addCardToDealerHand();
    },[])
    

   
  
    // hook to track player score
    //If a player busts then the game is over, the player is no longer playing and the dealer plays
    useEffect(()=>{
          
    
        if(getHandValue(playerHand) > 21){
                setGameOver(true);
                setPlayerPlaying(false);
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



    //hook to track if the game is over and do something when it is
    useEffect(()=>{
        if(gameOver){
            if(winner(getHandValue(playerHand), getHandValue(dealerHand))==1){
                console.log("you won");
            }
            else if(winner(getHandValue(playerHand),getHandValue(dealerHand))==-1){
                console.log("you lost");
            }
            else if(winner(getHandValue(playerHand), getHandValue(dealerHand))==0){
                console.log("push");
            }
           
    }}, [gameOver]);

    const playAgain = ()=>{
        setGameOver(false);
        setPlayerHand([]);
        setDealerHand([]);
        setPlayerPlaying(true);
        addCardToDealerHand();
        addCardToPlayerHand();
        addCardToPlayerHand();

       }
   
       //when the game is over we re-render with a button to play again
    if(gameOver){
        return(
            <div>
            <h1 className="text-center my-5">Blackjack</h1>
            <h3 className="text-center mb-1">Dealer Hand - {getHandValue(dealerHand)}</h3>
            <Hand cards={dealerHand}/>
            
            <h3 className="text-center">Your Hand - {getHandValue(playerHand)}</h3>
            <Hand cards={playerHand}/>
            <div className="text-center">
            <PlayAgainButton playAgain={playAgain}/>
            </div>
        </div>
        )
    }
    //If the player has finished their turn then we re-render without the buttons
    if(!playerPlaying){
        return(
            <div>
                <h1 className="text-center my-5">Blackjack</h1>
                <h3 className="text-center mb-1">Dealer Hand - {getHandValue(dealerHand)}</h3>
                <Hand cards={dealerHand}/>
                
                <h3 className="text-center">Your Hand - {getHandValue(playerHand)}</h3>
                <Hand cards={playerHand}/>
                
            </div>
        )
    }
    
    
    return(
        <div>
            <h1 className="text-center my-5">Blackjack</h1>
            <h3 className="text-center">Dealer Hand - {getHandValue(dealerHand)}</h3>
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





