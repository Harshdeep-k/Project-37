class Food
{
    constructor()
    {
        this.milk=loadImage("images/Milk.png");
        this.foodStock=null;
        this.lastFed=null;
        this.visibility=255;
    }
    async getFoodStock()
    {
        await database.ref('Food').on("value",function(data)
        {
            foodStock=data.val();
        });
       
    }
    async getlastFed()
    {
        await database.ref('lastFed').on("value",function(data)
        {
            lastFed=data.val();
        });
        
    }
    addFoods()
    {
        database.ref('/').update({
            Food:foodStock+1
        })
    }  
    
    deductFood()
    {
        if(foodStock<0)
        {
            foodStock=0;
        }
        else{
            foodStock-=1;
            dog.addImage(happyDog);
            lastFed=showTime();
            lastFedhr=parseInt(lastFed.slice(0,2));
            flag=1;
            database.ref('/').update({
                lastFed:lastFed
            })
        }
        
        database.ref('/').update({
            Food:food
        })
    }
    display()
    {
        var x=20, y=250;
        imageMode(CENTER);
       
        this.foodStock=foodStock;
        if(this.foodStock!==0)
        {
            for(var i=0;i<this.foodStock;i++)
            {
                if(i%20==0)
                {
                    x=20;
                    y+=50;
                }
                image(this.milk,x,y,45,45);
                x=x+30;
            }
        }

    }
    bedroom()
    {
        image(bedroomImg,220,130,400,300);
        
    }
    washroom()
    {
        image(washroomImg,220,130,400,300);
    }
    garden()
    {
        image(gardenImg,220,130,400,300);
       
    }
    
}