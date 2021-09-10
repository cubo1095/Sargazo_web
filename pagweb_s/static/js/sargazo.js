$(document).ready(sargazo);

function sargazo(){
        
    
    $('#sargazod').click(function(){
        var imgsargazo = "static/img/Simbo/Sargazo_dis.png";
        if($(this).is(':checked')){
            map.addLayer(wmsLayersargazo);
            $('#imagen').append('<img src="'+imgsargazo+'" class="imgsard"/>');
        } else {
            map.removeLayer(wmsLayersargazo);
            $('img').remove('.imgsard');
        }
    });
 

    $('#estudio').click(function(){
        // var imgsargazo = "static/img/Simbo/sargazo.png";
        if($(this).is(':checked')){
            map.addLayer(wmsLayerzona);
            // $('#imagen').append('<img src="'+imgsargazo+'" class="imgsar"/>');
        } else {
            map.removeLayer(wmsLayerzona);
            // $('img').remove('.imgsar');
        }
    });
    
   
   
}
