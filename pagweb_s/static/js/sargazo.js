$(window).on("load",sargazo);

function sargazo(){
    var con= 1;
    sarfe='<input type="checkbox" id="sargazo_31" checked />'+
    '<label for="check1">Sargazo 31/05/2021</label><br>'+
    '<input type="checkbox" id="sargazo_26" checked />'+
    '<label for="check1">Sargazo 26/05/2021</label><br>'+
    '<input type="checkbox" id="sargazo_05"  checked/>'+
    '<label for="check1">Sargazo 05/05/2021</label><br></br>'
    
    
    $('#sargazo').click(function(){
        if(con==1){
            $('#sargazofecha').html(sarfe);
            $('#sargazo_26').click(function(){
                if($(this).is(':checked')){
                    map.addLayer(wmsLayersargazo_26);
                } else {
                    map.removeLayer(wmsLayersargazo_26);
                }
            });
            $('#sargazo_31').click(function(){
                if($(this).is(':checked')){
                    map.addLayer(wmsLayersargazo_31);
                } else {
                    map.removeLayer(wmsLayersargazo_31);
                }
            });
            $('#sargazo_05').click(function(){
                if($(this).is(':checked')){
                    map.addLayer(wmsLayersargazo_05);
                } else {
                    map.removeLayer(wmsLayersargazo_05);
                }
            });
            con= 0;
        }else{
            con=1;
            $('#sargazofecha').empty(sarfe);
        }
    })
      
    
    $('#sargazolight').click(function(){
        var imgsar =  "static/img/Simbo/sargazo.png";
        if($(this).is(':checked')){
            $("#sargazo_31").prop("checked", true);
            $("#sargazo_26").prop("checked", true);
            $("#sargazo_05").prop("checked", true);
            map.addLayer(wmsLayersargazo_31);
            map.addLayer(wmsLayersargazo_26);
            map.addLayer(wmsLayersargazo_05);
            $('#imagen').append('<img src="'+imgsar+'" class="imgsarg"/>');
        } else {
            $("#sargazo_31").prop("checked", false);
            $("#sargazo_26").prop("checked", false);
            $("#sargazo_05").prop("checked", false);
            map.removeLayer(wmsLayersargazo_31);
            map.removeLayer(wmsLayersargazo_26);
            map.removeLayer(wmsLayersargazo_05);
            $('img').remove('.imgsarg');
        }
    });

}
