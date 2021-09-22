$(document).ready(infolay);

function infolay(){
    $('input[type=checkbox]').click(function(){
        //Función para actulización del select 
        var ids;
    
        ids = $('input[type=checkbox]:checked').map(function() {
            return $(this).attr('id');
        }).get();
        idS=$('input[type=checkbox]:checked').size();
        // alert(idS);
        // alert('IDS: ' + ids.join(', '));
        $('#selectcapas').html("");
        for(var i=0; i<idS; i++ ){
            switch (true){
                case ids[i]=='sargazod':
                $('#selectcapas').append('<option value="sargazod">Sargazo</option>')
                break;
                case ids[i]=='estados':
                $('#selectcapas').append('<option value="estados">Estados y linea</option>')
                break;
                case ids[i]=='anp':
                $('#selectcapas').append('<option value="anp">Área natural protegida</option>')
                break;
                case ids[i]=='hum':
                $('#selectcapas').append('<option value="hum">Humedales</option>')
                break;
                case ids[i]=='nidos':
                $('#selectcapas').append('<option value="nidos">Nidos de tortugas</option>')
                break;
                case ids[i]=='man':
                $('#selectcapas').append('<option value="man">Manglares</option>')
                break;
                case ids[i]=='insu':
                $('#selectcapas').append('<option value="insu">Islasr</option>')
                break;
                case ids[i]=='estudio':
                $('#selectcapas').append('<option value="estudio">Zona de estudio</option>')
                break;
                case ids[i]=='sentineltc':
                $('#selectcapas').append('<option value="sentineltc">Sentinel TC</option>')
                break;
                case ids[i]=='sentinelfal':
                $('#selectcapas').append('<option value="sentinelfal">Sentinel FC</option>')
                break;
            }
        }

                    
                    
    });

    //Función de selección de capas para información
    $('#elegir').click(function(){
        cap = $('#selectcapas').val();
        swal("Usted eligio la capa:"+cap);
        var infopuntoslayer =  function(){
            /*alert("Si funciona");*/
            
            var view1 = new ol.View({
                center: ol.proj.transform([-90, 20], 'EPSG:4326', 'EPSG:3857'),//Cambiamos proyección a WGS84
            });
            map.on('singleclick', function (evt) {
                document.getElementById('infolay').innerHTML = 'Espere un momento por favor';
                var viewResolution = /** @type {number} **/ (view1.getResolution());

                switch(true){
                    case cap=='sargazod':
                        // infopuntoslayer();
                        var url = wmsSourcesargazo.getFeatureInfoUrl(
                            evt.coordinate,
                            viewResolution,
                            'EPSG:4326',
                            {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
                        );
                        // alert(evt.coordinate);
                        document.getElementById('infolay').innerHTML = '<iframe seamless id="24pc" src="' + url + '"></iframe>';
                    break;
                    case cap=='estados':
                        // infopuntoslayer();
                        var url = wmsSourceestados.getFeatureInfoUrl(
                            evt.coordinate,
                            viewResolution,
                            'EPSG:3857',
                            {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
                        );
                        document.getElementById('infolay').innerHTML = '<iframe seamless id="24pc" src="' + url + '"></iframe>';
                    break;
                    case cap=='anp':
                        // infopuntoslayer();
                        var url = wmsSourceANP.getFeatureInfoUrl(
                            evt.coordinate,
                            viewResolution,
                            'EPSG:3857',
                            {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
                        );
                        document.getElementById('infolay').innerHTML = '<iframe seamless id="24pc" src="' + url + '"></iframe>';
                    break;
                    case cap=='hum':
                        // infopuntoslayer();
                        var url = wmsSourcehumedales.getFeatureInfoUrl(
                            evt.coordinate,
                            viewResolution,
                            'EPSG:3857',
                            {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
                        );
                        document.getElementById('infolay').innerHTML = '<iframe seamless id="24pc" src="' + url + '"></iframe>';
                    break;
                    case cap=='nidos':
                        // infopuntoslayer();
                        var url = wmsSourcenidos.getFeatureInfoUrl(
                            evt.coordinate,
                            viewResolution,
                            'EPSG:3857',
                            {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
                        );
                        document.getElementById('infolay').innerHTML = '<iframe seamless id="24pc" src="' + url + '"></iframe>';
                    break;
                    case cap=='man':
                        // infopuntoslayer();
                        var url = wmsSourceman.getFeatureInfoUrl(
                            evt.coordinate,
                            viewResolution,
                            'EPSG:3857',
                            {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
                        );
                        document.getElementById('infolay').innerHTML = '<iframe seamless id="24pc" src="' + url + '"></iframe>';
                    break;
                    case cap=='insu':
                        // infopuntoslayer();
                        var url = wmsSourceinsu.getFeatureInfoUrl(
                            evt.coordinate,
                            viewResolution,
                            'EPSG:3857',
                            {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
                        );
                        document.getElementById('infolay').innerHTML = '<iframe seamless id="24pc" src="' + url + '"></iframe>';
                    break;
                    case cap=='sentineltc':
                        // infopuntoslayer();
                        var url = wmsSourceSentinel.getFeatureInfoUrl(
                            evt.coordinate,
                            viewResolution,
                            'EPSG:3857',
                            {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
                        );
                        document.getElementById('infolay').innerHTML = '<iframe seamless id="24pc" src="' + url + '"></iframe>';
                    break;
                    case cap=='sentinelfal':
                        // infopuntoslayer();
                        var url = wmsSourceSentinelfal.getFeatureInfoUrl(
                            evt.coordinate,
                            viewResolution,
                            'EPSG:3857',
                            {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
                        );
                        document.getElementById('infolay').innerHTML = '<iframe seamless id="24pc" src="' + url + '"></iframe>';
                    break;
                }
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
                
    });
};






// // const ipunt = document.querySelector("#infolay");
       
// if($(this).is(':checked')){
//     // console.log('#infolay');
//     var infopuntoslayer =  function(){
//         /*alert("Si funciona");*/
        
//         var view1 = new ol.View({
//             center: ol.proj.transform([-90, 20], 'EPSG:4326', 'EPSG:3857'),//Cambiamos proyección a WGS84
//             zoom: 4.5
//         });
//         map.on('singleclick', function (evt) {
//         document.getElementById('infolay').innerHTML = 'Espere un momento por favor';
//         var viewResolution = /** @type {number} **/ (view1.getResolution());
//         var url = wmsSourcenidos.getFeatureInfoUrl(
//             evt.coordinate,
//             viewResolution,
//             'EPSG:3857',
//             {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
//         );
//         // var urlin = wmsSourcenidos.getFeatureInfoUrl(
//         //     evt.coordinate,
//         //     viewResolution,
//         //     'EPSG:3857',
//         //     {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
//         // );
//         if ($('#nidos').is(':checked')) {
//             // $('infopuntos').remove('#conpc');
//             document.getElementById('infolay').innerHTML = '<iframe seamless id="24pc" src="' + url + '"></iframe>';
//         }
//         // } else{
//         //     $('infopuntos').remove('#24pc');
//         // }
//         // if ($('#pconsul').is(':checked')){
//         //     $('infopuntos').remove('#24pc');
//         //     document.getElementById('infopuntos').innerHTML = '<iframe seamless id="conpc" src="' + urlin + '"></iframe>';
//         // } else{
//         //     $('infopuntos').remove('#conpc');
//         // }
//         });
//         map.on('pointermove', function (evt) {
//             if (evt.dragging) {
//                 return;
//             }
//             var pixel = map.getEventPixel(evt.originalEvent);
//             var hit = map.forEachLayerAtPixel(pixel, function () {
//                 return true;
//             });
//             map.getTargetElement().style.cursor = hit ? 'pointer' : '';
//             });
//         }
//     infopuntoslayer();
//     // ipunt.style.display = "initial";
//     $("#fig1").css({"box-shadow": "0px 0px 15px #1689e3", "border-radius": "10px",  "border": "2px solid", "border-color": "#189907", "background": "white"});           
// } else {
//     document.getElementById('infolay').innerHTML = '';
//     map.on('pointermove', function (evt) {
//         if (evt.dragging) {
//             return;
//         }
//         var pixel = map.getEventPixel(evt.originalEvent);
//         var hit = map.forEachLayerAtPixel(pixel, function () {
//             return true;
//         });
//         map.getTargetElement().style.cursor = hit ? 'default' : '';
//         });
//     /**alert("Ahora se destruira funcion");*/
//     // ipunt.style.display = "none";
//     // document.getElementById('infolayer').innerHTML = '';
//     // document.getElementById('infopuntos1').innerHTML = '';
//     $("#fig1").css({"box-shadow": "none", "border": "none"});
// }