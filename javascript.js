
$(document).ready(function(){
    
    let i, l, button="", toDoCount=0;
    let topics=["lion","tiger","panther","chetah","elephant","giraffe","fox","bear","leopards"];
    let loopCounter = sessionStorage.getItem("count");
    console.log(loopCounter)
    
    for(l=0;l <= loopCounter;l++){
       
      if(loopCounter!=null){
        topics.push(sessionStorage.getItem("topic-" + l));
        console.log(topics);
      }
      
    }

    renderButtons();
    function renderButtons(){

        $("#Gifbuttons").empty();
        $("#Gif-input").val("");
        
        for (i in topics){
            button = `<button type="button" class="GifButtons col-md-1 col-sm-2 col-xs-3 btn btn-primary" value= "${topics[i]}" >${topics[i]}</button>`;
            $("#Gifbuttons").append(button);
         }
       
    }

    $("#addGif").on("click", function(event) {

        event.preventDefault();
        let topic = $("#Gif-input").val().trim(); 
        
        if (topic!==""){
            
            sessionStorage.setItem("topic-" + toDoCount, topic)
            
            sessionStorage.setItem('count', toDoCount)
            toDoCount++;
                
            topics.push(topic);
            renderButtons();

        }
    });

    $(document).on("click",".GifButtons", function(){
        $("#Gifs").empty();
        let GifName = $(this).val();
      
    
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + GifName + "&api_key=x6zEGRPjNewqghUFhFCM5jfo1gglXifU&limit=10"
        let j, images=""
        let x = "480w_still";
        $.ajax({
            url:queryURL,
            
            method: "GET"
            }).then(function(response){
                
                for (j in response.data){
                    console.log(response.data[j].images[x].url);
               
                    images =`<div class="panel panel-primary col-md-4 col-sm-4 col-xs-6">
                                <img class="staticImage img-circle col-md-12 " data-name="${j}" src="${response.data[j].images[x].url}" alt="${GifName}" width="250px" height="250px">
                                <h3 class="col-md-offset-3 col-md-3 col-sm-offset-3 col-sm-3 col-xs-offset-3 col-xs-3"><span class="label label-primary">${response.data[j].rating}</span></h3>
                                <a class="button col-md-offset-3 col-md-3 col-sm-offset-3 col-sm-3 col-xs-offset-3 col-xs-3" href="${response.data[j].images[x].url}" download="${GifName}.jpg"><span class="glyphicon glyphicon-download-alt"></span></a>
                            </div>`
                            console.log(GifName)
                    $("#Gifs").append(images);
                    
                }


                $(document).on("click",".staticImage", function(){
                    let dataNumber = $(this).attr("data-name");

                    $(this).attr("src",response.data[dataNumber].images.downsized.url);
                    $(this).removeClass("staticImage");
                    $(this).addClass("animatedImage");
                });  
                

                $(document).on("click",".animatedImage", function(){
                    let dataNumber = $(this).attr("data-name");
                    $(this).attr("src",response.data[dataNumber].images[x].url); 
                    $(this).removeClass("animatedImage");
                    $(this).addClass("staticImage");
                });  

            });

         

    });

   
});