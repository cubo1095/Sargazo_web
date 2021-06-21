
function navfixed(){
    // Cambio de coloración de barra de navegación
    var y = window.scrollY;
    
    if(y>0){
        $('nav').css("background","black");
    }else{
        $('nav').css("background","#243B73");
    }
    
    // Animación de logos
    
    var ey = $("footer").position();
    var ay = ey.top - 500;
    indice=0;
        
        if( y > ay){
            // $('.logos img').css("width", "22%");
            $('.logos img').animate({width: 'show'}, 750);
        }else{
            $('.logos img').animate({width: 'hide'}, 500);
        }
}




