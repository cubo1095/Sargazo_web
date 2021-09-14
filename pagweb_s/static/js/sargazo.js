$(document).ready(sargazo);

function sargazo(){
        
    
    $('#sargazod').click(function(){
        var imgsargazo = "http://132.247.103.145:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&WIDTH=60&HEIGHT=20&LAYER=sargazo:sargazo&legend_options=fontColor:0x00000;fontSize:14;bgcolor=D5D50C;labelMargin:5;countMatched;hideEmptyRules";
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
