$(document).ready(main);

var contador = 1;

function main(){
    $('#fecha').click(function(){
        if(contador == 1){
            $('.con').animate({ left:'55px'});
            document.getElementById("body-grapper").style.display = "block";
            $(this).css('z-index','4')
            contador = 0;
        } 
        else {
            contador = 1;
            $('.con').animate({left: '-100%'});
            document.getElementById("body-grapper").style.display = "none";
            $(this).css('z-index','2')        
        }

    });

    $('#download').click(function(){
        if(contador == 1){
            $('.Descarga').animate({ left:'0.7em'});
            document.getElementById("body-grapper").style.display = "block";
            $(this).css('z-index','4')
            contador = 0;
        } 
        else {
            contador = 1;
            $('.Descarga').animate({left: '-100%'});
            document.getElementById("body-grapper").style.display = "none";
            $(this).css('z-index','2')         
        }

    });
}