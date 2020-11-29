class Food{
    constructor(){
        this.milkImage = loadImage("images/Milk.png");
        this.foodStock = 0; 
        this.lastFed;
    }
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }
    getFedTime(lastFed){
        this.lastFEd = lastFed;
    }
    deductFood(){
        if(this.foodStock > 0){
            this.foodStock--;
        } else if(this.foodStock === 0){
            alert("What Will He Eat??");
        } else {
            this.foodStock = this.foodStock;
        }
        if(this.foodStock <= 3 && this.foodStock >= 2){
            for(var i = 0; i < 1; i++){
                alert("ALERT : Food Running Low!!!");
            }
        }
    }
    getFoodStock(){
        return this.foodStock;
    }
    display(){
       var x = 80;
       var y = 200;
        imageMode(CENTER);
        if(this.foodStock != 0){
        for(var i = 0; i < this.foodStock; i++){
            if(i%10 === 0){
                y+=50;
                x=80;
            }
            image(this.milkImage, x, y, 50, 50);
            x+=30;
        }
    }
    }
}
