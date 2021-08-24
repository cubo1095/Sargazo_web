$(document).ready(main);

var contador = 1;

function main(){
    $('.menu').click(function(){
        if(contador == 1){
            document.getElementById("body-grapper").style.display = "block";
            $('nav').animate({
                left: '0'
            });
            contador = 0;
        } else {
            contador = 1;
            document.getElementById("body-grapper").style.display = "none";
            $('nav').animate({
                left: '-100%'
            });
            
        }

    });

};


