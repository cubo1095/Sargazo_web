$(window).on("load",sargazo);

function sargazo(){
    var con= 1;
    /*sarfe='<input type="checkbox" id="sargazo_31" checked />'+
    '<label for="check1">Sargazo 31/05/2021</label><br>'+
    '<input type="checkbox" id="sargazo_26" checked />'+
    '<label for="check1">Sargazo 26/05/2021</label><br>'+
    '<input type="checkbox" id="sargazo_05"  checked/>'+
    '<label for="check1">Sargazo 05/06/2021</label><br></br>'*/
    
    
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
