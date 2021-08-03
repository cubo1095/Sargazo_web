$(document).ready(under);

var contador = 1;

function under(){
  
    $('#fig').click(function(){
        if(contador == 1){
            $('.Capas').animate({right: '0%'});
            $("#fig").css({"box-shadow": "0px 0px 15px #e766f8", "border-radius": "5px", "border": "2px solid", "border-color": "#e766f8", "background": "white"});
            $('#fig').animate({right: '265px'});
            $('#fig1').animate({right: '265px'});
            $('#fig2').animate({right: '265px'});
            $('.ol-zoom').animate({right: '265px'});
            $('#mouse-position').animate({right: '265px'})
            contador = 0;
        } else {
            contador = 1;
            $('.Capas').animate({right: '-100%'});
            $('#fig').animate({right: '3%'});
            $("#fig").css({"box-shadow": "none", "border": "2px solid", "border-color":"black", "border-radius": "5px"});
            $('#fig1').animate({right: '3%'});
            $('#fig2').animate({right: '3%'});
            $('.ol-zoom').animate({right: '3%'});
            $('#mouse-position').animate({right: '5%'})
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

function openc(evt, act) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(act).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();