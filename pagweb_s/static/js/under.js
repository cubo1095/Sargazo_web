$(document).ready(under);



function under(){
  
    $('#fig').click(function(){
        $('.conten').animate({left: '0'});
        $('#barras').animate({left: '26em'});
        $('#fig').animate({left: '-100%'});
           
        
    });
    $('#barras').click(function(){
        $('.conten').animate({left: '-100%'});
        $('#barras').animate({left: '-100%'});
        $('#fig').animate({left: '0.5%'});
    })
    document.getElementById("defaultOpen").click();
        
};

//función de pestañas
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
    evt.currentTarget.className += "active";
}

