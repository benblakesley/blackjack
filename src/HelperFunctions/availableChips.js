


export const availableChips = (balance)=>{



    if(balance >0 && balance<5){
        return [1];
    }
    else if(5<=balance && balance <10 ){
        return [1,5];
    }
    else if(10<=balance && balance<25){
        return [1,5,10];
    }
    else if(25<=balance && balance<50){
        return [1,5,10,25];
    }
    else if(50<=balance&& balance<100){
        return [1,5,10,25,50];
    }
    else if(100<=balance && balance<1000){
        return [1,5,10,25,50,100,500]
    }
    else if(balance >0){
        return [1,5,10,25,50,100, 500, 1000];
    }
    else{
        return[];
    }
    
}