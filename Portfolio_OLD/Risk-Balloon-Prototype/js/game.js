//Daniel Giraldo- 2015
//Risk Balloon Prototype

function Game(){
    //Values coming from server
    this.inflation_rate;
	this.inflation_max;
	this.color;
	this.cash_multiplier;
    this.userId;
    this.sessionId;
    this.adminId;
    
    //initial default variables
    this.isBalloonPopped = false;
	this.turns = 0;
	this.cashEarned = 1;
	this.inflation= 1;
}

Game.prototype.setGameDefaults = function(a,b,c,d,e,f,g){
    //set variables to initials variables
    this.inflation_rate= a;
    this.inflation_max=b;
    this.color = c;
    this.cash_multiplier = d;
    this.userId= e;
    this.sessionId=f;
    this.adminId=g;
}

Game.prototype.listGameVariables = function(){
    console.log("Inflation Rate: "+ this.inflation_rate);
    console.log("Inflation Max: "+ this.inflation_max);
    console.log("Color: "+ this.color);
    console.log("Cash Multiplier: "+ this.cash_multiplier);
    console.log("User Id: "+this.userId);
    console.log("Session Id: "+this.sessionId);
    console.log("Admin Id: "+this.adminId);
    console.log("Is balloon popped?: "+ this.isBalloonPopped);
    console.log("Number of Turns: "+ this.turns);
    console.log("Cashed Earned: "+ this.cashEarned);
    console.log("Inflation: "+ this.inflation);
}


Game.prototype.startGame = function(){
    var url = "../Risk-Balloon-Prototype/JSON/session.JSON"; // url to get JSON content
    //function to handle content returned by AJAX reponse
    //assign object to use in callback function below
    var game = this;
    //use ajax to get JSON content from server
    //assign variable to Game variables
    $.getJSON(url, function(response){
        // assign content from response to initial variables
        //session is the first object in the list
        //eventually we neeed to find the latest version of the session
        var session= response[0];
        //set the content to the default variables
        var ir = session.inflation_rate;
        var im = session.inflation_max;
        var co = session.color;
        var cm = session.cash_multiplier;
        var us = session.userId;
        var si = session.sessionId;
        var ai = session.adminId;
        
        //set up game defaults
        game.setGameDefaults(ir,im, co, cm, us, si, ai);
        
    });
    
    
}

//keeps track of isBalloonPopped variable to see if balloon is popped.
Game.prototype.checkBalloonPop = function(){
    //check to see if balloon is popped 
    if(this.inflation>=this.inflation_max){
			this.isBalloonPopped = true;
    }	
    return this.isBalloonPopped;
}



//Controls command line game and triggers all other functions
Game.prototype.inflate = function(){
    //increase number of turns
    this.turns++;
    
    if(!this.checkBalloonPop()){
        // trigger function to inflate ballon
        this.cashEarned+= this.turns*this.cash_multiplier;
        this.inflation*= this.inflation_rate;
        console.log("You've inflated the balloon "+ this.turns + " times");
        console.log("Total cash: "+ this.cashEarned);
        //populate data to screen
        this.populateDOM();
        inflateBallon();
    }else{
        //populate data to screen
        this.gameOver();
        popBalloon();
        this.cashEarned= 0;
        console.log("You lost");
        console.log("Total cash: "+ this.cashEarned);
        
    } 
}

//ui actions
    //these functions will change the appearance of the content 

Game.prototype.populateDOM = function(){
    $("#cash-earned").html(this.cashEarned);
    $("#times-inflated").html(this.turns);
    
}

//hide buttons so that user can't keep playing
Game.prototype.leaveGame= function(){
    $("#inflate").hide();
    $("#leave").hide();
}

Game.prototype.gameOver = function(){
    //hide buttons
    this.leaveGame();
    //populate DOM with losing amount and game over message
    $("#content").html('<div class="description">You Lost: $<div id="cash-lost">'+this.cashEarned+'</div></div><br><div class="description">Game Over!</div>');
    centerBox();
}


Game.prototype.submitData = function(){
    /// once user either loses or decides to retire
    //this function should be triggered
    //it should contain an ajax POST call to send
    //data to the server
    // The data will then be processed and save to database
    
}

// UI functions
//inflate Balloon
function inflateBallon(){
    //inflates balloon
    $( "#balloon-head" ).animate({
        width: "+=10px",
        height: "+=10px"
      }, 300);
}

//Pop Balloon
function popBalloon(){
   $("#balloon").hide();
     
}

//Centers display box once game is over
function centerBox(){
    $("#right-container").animate({
        width: "50%",
    }, 300);
    $("#right-container").css({'margin':'auto',     float:'none'});    
}


//start game once DOM is loaded
$(document).ready(function(){
    //start new game
    var game = new Game();
    
    //get all the variables ready
    game.startGame();
    
    //list all the variables for debugging purposes
    game.listGameVariables();
    
    //Gets triggered when "inflate" button is clicked
    $("#inflate").click(function() {
        game.inflate();
    });
    //Gets triggered when "inflate" button is clicked
    $("#leave").click(function() {
        game.leaveGame();
    });
});
                        
                        
                    
                


