$(document).ready(under);



function under(){
  
    $('#fig').click(function(){
        $('.conten').animate({left: '0'},2000);
        $('#icons').animate({left: '26em'},2200);
        $('#fig').animate({left: '-100%'},1500);
           
        
    });
    $('#icons').click(function(){
        $('.conten').animate({left: '-100%'},2000);
        $('#icons').animate({left: '-100%'},2200);
        $('#fig').animate({left: '0%'},1000);
    });
    document.getElementById("defaultOpen").click();

    //Desplazamiento de directorios Hycom
    con = 1;
    $('#hycomser').click(function(){
        if(con == 1){
            $('#hycomcont').html('<input type="checkbox" id="hycomtemp"/><label for="check1">   Temperatura del mar</label><br>'
                +'<input type="checkbox" id="hycomvelo"/><label for="check1">   Velocidad del mar</label><br>');
                
            $('#hycomtemp').click(function(){
                if($(this).is(':checked')){
                    map.addLayer(wmsLayerHYCOMtem);
                    // $('#imagen').append('<img src="'+imgest+'" class="imgest"/>');
                } else {
                    map.removeLayer(wmsLayerHYCOMtem);
                    // $('img').remove('.imgest');
                }
            });

            $('#hycomvelo').click(function(){
                // var imgest =  "static/img/Simbo/estados.png";
                if($(this).is(':checked')){
                    map.addLayer(wmsLayerHYCOMvel);
                    // $('#imagen').append('<img src="'+imgest+'" class="imgest"/>');
                } else {
                    map.removeLayer(wmsLayerHYCOMvel);
                    // $('img').remove('.imgest');
                }
            });

            con = 0;
        }else{
            $('#hycomcont').html('');
            con = 1;
        }
    });
    
    //Layer Hycomtemperatura
    var wmsSourceHYCOMtem = new ol.source.TileWMS({
        visible: true,
        url: 'https://wms.hycom.org/thredds/wms/GLBy0.08/latest?crs=EPSG:4326&dpiMode=7&format=image/png&layers=water_temp&styles',
        
        serverType: 'mapserver'
        });

    var wmsLayerHYCOMtem = new  ol.layer.Tile({
        source: wmsSourceHYCOMtem,
        zIndex: 0.5
    });
    

    //Layer Hycom velocidad
    var wmsSourceHYCOMvel = new ol.source.TileWMS({
        visible: true,
        url: 'https://wms.hycom.org/thredds/wms/GLBy0.08/latest?crs=EPSG:4326&dpiMode=7&format=image/png&layers=sea_water_velocity&styles',
        
        serverType: 'mapserver'
        });

    var wmsLayerHYCOMvel = new  ol.layer.Tile({
        source: wmsSourceHYCOMvel,
        zIndex: 0.5
    });
    
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

//función de descarga de info

function download(){
    
    document.getElementById("downloadpage").style.display = "block";

    return true;
  
}

function salida(){
    document.getElementById("downloadpage").style.display = "none";
}