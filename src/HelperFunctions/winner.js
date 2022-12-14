
/* This function checks conditions and returns 1 for player win,
 -1 for player loss and 0 for draw */
export const winner = (playerScore, dealerScore)=>{

    if(playerScore>21){
        return -1
    }
    else{
        if(dealerScore>21){
            return 1;
        }
        else{
            if(playerScore>dealerScore){
                return 1;
            }
            if(playerScore<dealerScore){
                return -1;
            }
            if(playerScore==dealerScore){
                return 0;
            }
        }
    }
}