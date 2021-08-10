$(document).ready(main);

function main(){
    $('.puntosinfo').click(function(){
        const ipunt = document.querySelector("#infolay");
        if($(this).is(':checked')){
            console.log('#infolay');
            var infopuntoslayer =  function(){
                /*alert("Si funciona");*/
                
                var view1 = new ol.View({
                    center: ol.proj.transform([-90, 20], 'EPSG:4326', 'EPSG:3857'),//Cambiamos proyección a WGS84
                    zoom: 4.5
                });
                map.on('singleclick', function (evt) {
                document.getElementById('infolay').innerHTML = 'Espere un momento por favor';
                var viewResolution = /** @type {number} **/ (view1.getResolution());
                var url = wmsSourcenidos.getFeatureInfoUrl(
                    evt.coordinate,
                    viewResolution,
                    'EPSG:3857',
                    {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
                );
                // var urlin = wmsSourcenidos.getFeatureInfoUrl(
                //     evt.coordinate,
                //     viewResolution,
                //     'EPSG:3857',
                //     {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
                // );
                if ($('#nidos').is(':checked')) {
                    // $('infopuntos').remove('#conpc');
                    document.getElementById('infolay').innerHTML = '<iframe seamless id="24pc" src="' + url + '"></iframe>';
                }
                // } else{
                //     $('infopuntos').remove('#24pc');
                // }
                // if ($('#pconsul').is(':checked')){
                //     $('infopuntos').remove('#24pc');
                //     document.getElementById('infopuntos').innerHTML = '<iframe seamless id="conpc" src="' + urlin + '"></iframe>';
                // } else{
                //     $('infopuntos').remove('#conpc');
                // }
                });
                map.on('pointermove', function (evt) {
                    if (evt.dragging) {
                        return;
                    }
                    var pixel = map.getEventPixel(evt.originalEvent);
                    var hit = map.forEachLayerAtPixel(pixel, function () {
                        return true;
                    });
                    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
                    });
                }
            infopuntoslayer();
            // ipunt.style.display = "initial";
            $("#fig1").css({"box-shadow": "0px 0px 15px #1689e3", "border-radius": "10px",  "border": "2px solid", "border-color": "#189907", "background": "white"});           
        } else {
            document.getElementById('infolay').innerHTML = '';
            map.on('pointermove', function (evt) {
                if (evt.dragging) {
                    return;
                }
                var pixel = map.getEventPixel(evt.originalEvent);
                var hit = map.forEachLayerAtPixel(pixel, function () {
                    return true;
                });
                map.getTargetElement().style.cursor = hit ? 'default' : '';
                });
            /**alert("Ahora se destruira funcion");*/
            // ipunt.style.display = "none";
            // document.getElementById('infolayer').innerHTML = '';
            // document.getElementById('infopuntos1').innerHTML = '';
            $("#fig1").css({"box-shadow": "none", "border": "none"});
        }


        var ids;
    
        ids = $('input[type=checkbox]:checked').map(function() {
            return $(this).attr('id');
        }).get();
        idS=$('input[type=checkbox]:checked').size();
        alert(idS);
        alert('IDS: ' + ids.join(', '));
        for(var i=0; i<idS; i++ ){
            alert(ids[i]);
            switch (true){
                case ids[i]=='sargazod':
                $('#selectcapas').html('<option value="sargazod">Sargazo</option>')
                alert("Se agregará sargazo")
                case ids[i]=='estados':
                $('#selectcapas').html('<option value="estados">Estados y linea</option>')
            }
        }
       
        
            
    });
    
};
   