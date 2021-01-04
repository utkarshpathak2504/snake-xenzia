function init(){
   
    canvas= document.getElementById('mycanvas');
    pen=canvas.getContext('2d');

    //cell sizes 
   cs=65;
//canvas sizes
   w=1300;
   h=600;
   //json based snake object using arrays named cells
   score=5;

   gameover=false;
   //getting food
   foodimage=new Image();
   foodimage.src= "apple.png";

   trophyimage=new Image();
   trophyimage.src= "trophy.png";


   food=getrandomfood();

   snake={
             init_len:5,
             color:"blue",
             cells:[],
             direction:"right",



             createsnake:function()

           { for(var i=this.init_len ;i>0;i--){

                this.cells.push({x:i,y:0});

            }
        },
        drawsnake:function(){

            pen.fillStyle=this.color; // to chnage the color of snalke accordingly

            // we use *cs cause otherwise the blocks will cover up each other and we will not get distinct objects
            for(var i=0;i<this.cells.length;i++)
              {     pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs, cs-3,cs-3);  // to draw the snake which is bydefault of black color 


        }
    },

    updatesnake:function(){
        console.log("updating snke acc to the direction");
         // changing the coordinates of the new head of the snake
         var headX= this.cells[0].x;
         var headY= this.cells[0].y;

         if(headX==food.x  && headY==food.y){
             console.log("food eaten");
             food=getrandomfood();
             score++;
         }
else{
        this.cells.pop(); // removing the last element of the snake and adding a new haed using unshift

}
var nextX,nextY;
        if(this.direction=="right"){
             nextX=headX+1;
           nextY=headY;

        }
       else  if(this.direction=="left"){
            nextX=headX-1;
          nextY=headY;

       }
       else  if(this.direction=="down"){
        nextX=headX;
      nextY=headY+1;

   }
   else  {
    nextX=headX;
  nextY=headY-1;

}

        
//adding the new block in front 
        this.cells.unshift({x:nextX,y:nextY});



        //preventing the snake from going out 

        var last_x=Math.round(w/cs);
        var last_y=Math.round(h/cs);


        if(this.cells[0].y<0 || this.cells[0].x<0 ||this.cells[0].x>last_x-.20|| this.cells[0].y>last_y){
            gameover=true;
        }





    }

    };

    snake.createsnake();

    function keyPressed(e){
		//Conditional Statments
		if(e.key=="ArrowRight"){
			snake.direction = "right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction = "left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction = "down";
		}
		else{
			snake.direction = "up";
		}
		console.log(snake.direction);
	}


    document.addEventListener('keydown',keyPressed) ;
}

function draw(){
    pen.clearRect(0,0,w,h);  // to remove the old frames of the snake and update it  like it is moving
    snake.drawsnake();
    pen.drawImage( trophyimage,24,20,cs,cs);
    pen.drawImage( foodimage,food.x*cs,food.y*cs,cs,cs);
    pen.font="25px Roboto";
    pen.fillText(score,50,50);
    
}


function update(){
    snake.updatesnake();
}

function getrandomfood(){
    var foodX= Math.round(Math.random()*(w-cs-1)/cs);
    var foodY= Math.round(Math.random()*(h-cs-1)/cs);


    var food={

        x:foodX,
        y:foodY,
        color:"red",





    };

    return food

}

function gameloop(){

    if(gameover==true){
        clearInterval(f);  
        alert("game over");
        return;
    }
    draw();
    update();
    
}

 init();


 var f=setInterval(gameloop,100);
    

