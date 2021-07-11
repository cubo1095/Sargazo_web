$(document).ready(sargazo);

function sargazo(){
        
    
    $('#sargazolight').click(function(){
        var imgsargazo = "static/img/Simbo/sargazo.png";
        if($(this).is(':checked')){
            map.addLayer(wmsLayersargazo);
            $('#imagen').append('<img src="'+imgsargazo+'" class="imgsar"/>');
        } else {
            map.removeLayer(wmsLayersargazo);
            $('img').remove('.imgsar');
        }
    });
    
    $('#sargazo_d').click(function(){
        var imgsargazod = "static/img/Simbo/Sargazo_dis.png";
        if($(this).is(':checked')){
            map.addLayer(wmsLayersargazod);
            $('#imagen').append('<img src="'+imgsargazod+'" class="imgsard"/>');
        } else {
            map.removeLayer(wmsLayersargazod);
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
    
    $('#sargazolight').click(function(){
        var imgsar0506 =  "static/img/Simbo/sargazo0506.png";
        
        if($(this).is(':checked')){
            $("#sargazo_05").prop("checked", true);
            map.addLayer(wmsLayersargazo_31);
            map.addLayer(wmsLayersargazo_26);
            map.addLayer(wmsLayersargazo_05);
            $('#imagen').append('<img src="'+imgsar0506+'" class="imgsarg0506"/>');
            $('#imagen').append('<img src="'+imgsar2605+'" class="imgsarg2605"/>');
            $('#imagen').append('<img src="'+imgsar3105+'" class="imgsarg3105"/>');
        } else {
            $("#sargazo_31").prop("checked", false);
            $("#sargazo_26").prop("checked", false);
            $("#sargazo_05").prop("checked", false);
            map.removeLayer(wmsLayersargazo_31);
            map.removeLayer(wmsLayersargazo_26);
            map.removeLayer(wmsLayersargazo_05);
            $('img').remove('.imgsarg0506');
            $('img').remove('.imgsarg2605');
            $('img').remove('.imgsarg3105');
        }
    });

}
