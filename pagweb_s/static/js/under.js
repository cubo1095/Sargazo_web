$(document).ready(main);

var contador = 1;

function main(){
  
    $('#fig').click(function(){
        if(contador == 1){
            $('.Capas').animate({right: '0%'});
            $("#fig").css({"box-shadow": "0px 0px 15px #1689e3", "border-radius": "5px", "border": "2px solid", "border-color": "#1689e3", "background": "white"});
            $('#fig').animate({right: '265px'});
            $('#fig1').animate({right: '265px'});
            $('.ol-zoom').animate({right: '265px'});
            contador = 0;
        } else {
            contador = 1;
            $('.Capas').animate({right: '-100%'});
            $('#fig').animate({right: '3%'});
            $("#fig").css({"box-shadow": "none", "border": "2px solid", "border-color":"black", "border-radius": "5px"});
            $('#fig1').animate({right: '3%'});
            $('.ol-zoom').animate({right: '3%'});
        }

    });
    $('.map').click(function(){
        if (contador == 0){
            contador = 1;
            $('.con').animate({left: '-100%'});
            $('.Descarga').animate({left: '-100%'});
                
        }
    });
    
};
