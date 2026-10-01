 
 
    function moveIt(direction){
        if(direction == "left")
        {
            
                $("#dot").animate({
                    
                    left: "-=50"
                
                    }, 200, function() {
                    // Animation complete.
                    });
                position = "right";
            
        }
        if(direction == "right")
        {
            
                $("#dot").animate({
                    
                    left: "+=50"
                
                    }, 200, function() {
                    // Animation complete.
                    });
                    position = "left";   
            
        }

        }
        