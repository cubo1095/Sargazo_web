$(document).ready(searchsargazo);

    function searchsargazo(){
        //Función para buscar fecha y mostrar en mapa
        $('.botton-Buscar').click(function(){
                                
            fecha_1 = $("#date3").val();
            fecha_2 = $("#date4").val();
            
            switch (true){
                case fecha_1 == '' && fecha_2 == '':
                swal('Por favor selecciona una fecha de inicio y de termino para realizar tu consulta');
                break;

                case fecha_1 == '':
                swal('Faltó ingresar la fecha inicial de su consulta.');
                break;

                case fecha_2 == '':
                swal('Faltó ingresar la fecha de termino de su consulta.');
                break;

                case fecha_2 < fecha_1:
                swal('Su fecha de termino es menor que la de inicio.');
                break;

                default:
                swal('Tu consulta comprende de: '+fecha_1+' a '+fecha_2);
                
                               
                cql_filter = "fechadia between '"+fecha_1+"' and '"+fecha_2+"'";
                
                wmsLayersargazo.getSource().updateParams({'LAYERS': 'sargazo:sargazo', 'CQL_FILTER': cql_filter}); 
                //////////////////////////////////////////////
                if($('#pconsulta').html()==''){
                    $('#pconsulta').html('<input type="checkbox" id="pconsul" value="1" checked=""/>'+
                    '<label for="check1"> Puntos Consulta</label><br>');
                    imgcon = "static/img/Simbo/PuntosConsulta.png";
                    
                    $('#imagen').append('<img src="'+imgcon+'" class="imgcon"/>');
                }
                
               
                    
                
                $('#pconsul').click(function(){
                    imgcon = "static/img/Simbo/PuntosConsulta.png";    
                    if($(this).is(':checked')){
                        $('#imagen').append('<img src="'+imgcon+'" class="imgcon"/>');
                        map.addLayer(puntosconlayer);
                    }else{
                        $('img').remove(".imgcon");
                        map.removeLayer(puntosconlayer);
                    }
                });
                
                document.getElementById("body-grapper").style.display = "none";
  
            //Función de descarga botton-Json    
            $('.botton-Json').click(function(){
            if (fecha_1 == '' && fecha_2 == ''){
                swal('Por favor selecciona una fecha de inicio y de termino para realizar tu descarga.');
            } else if(fecha_1 == '' || fecha_2 == ''){
                swal('Revisa por favor las fechas de tu consulta, para realizar la descarga.')    
            } else{
                url=('http://132.247.103.145:8080/geoserver/fires/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fires:puntos_d&viewparams=f:'+fecha_1+ ';f1:'+fecha_2+ '&outputFormat=application/json')
                swal("Usted descargará el archivo en formato GeoJson.");
                return  window.location = url
            }
            });

            //Función de descarga CSV    
            $('.botton-CSV').click(function(){
            if (fecha_1 == '' && fecha_2 == ''){
                swal('Por favor selecciona una fecha de inicio y de termino para realizar tu descarga.');
            } else if(fecha_1 == '' || fecha_2 == ''){
                swal('Revisa por favor las fechas de tu consulta, para realizar la descarga.')    
            } else{
                url=('http://132.247.103.145:8080/geoserver/fires/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fires:puntos_d&viewparams=f:'+fecha_1+ ';f1:'+fecha_2+ '&outputFormat=CSV')
                swal("Usted descargará el archivo en formato Archivo delimitado por comas (CSV).");
                return  window.location = url
            }
            });

            //Función de descarga SHP    
            $('.botton-Shape').click(function(){
            if (fecha_1 == '' && fecha_2 == ''){
                swal('Por favor selecciona una fecha de inicio y de termino para realizar tu descarga.');
            } else if(fecha_1 == '' || fecha_2 == ''){
                swal('Revisa por favor las fechas de tu consulta, para realizar la descarga.')    
            } else{
                url=('http://132.247.103.145:8080/geoserver/fires/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fires:puntos_d&viewparams=f:'+fecha_1+ ';f1:'+fecha_2+ '&outputFormat=shape-zip')
                swal("Usted descargará el archivo en formato Shapefile comprimido en .ZIP .");
                return  window.location = url
            }
            });                     

            }
            
            
            
        });
        //Función busqueda por área
        $('#ejecutar').click(function(){
            signo = $('#mayormenor').val();
            area = $('#area').val();
            cql_filter = "fecha between '"+fecha_1+"' and '"+fecha_2+"' and area_km2"+signo+""+area;
            swal('Su consulta corresponde a las fechas: '+fecha_1+' y '+fecha_2+'. Área'+signo+''+area+' metros cuadrados.');       
            wmsLayersargazo.getSource().updateParams({'LAYERS': 'sargazo:sargazo', 'CQL_FILTER': cql_filter});
        })
            
        //Función de rectángulo
        var contador = 1; 
        $('#fig2').click(function(){
            //Poligono
            boxControl =new ol.interaction.DragBox ({ 
                condition: ol.events.condition.always, 
                style: new ol.style.Style ({ 
                    stroke: new ol.style.Stroke({color: [0, 255, 0, 1]}) 
                }) 
            }); 
            map.addInteraction(boxControl);
            
            boxControl.on('boxend', function () { 
                var a= boxControl.getGeometry().transform('EPSG:3857','EPSG:4326').getCoordinates(); 
                p1 = a[0][0];
                p2 = a[0][1];
                p3 = a[0][2];
                p4 = a[0][3];

                
                var poligono = new ol.Feature({
                        geometry: new ol.geom.Polygon([a])
                    });

                // poligono.getGeometry().transform('EPSG:4326','EPSG:3857' );
                // b = poligono.getGeometry().getCoordinates();
                alert(a);
                var polySource= new ol.source.Vector({
                        features: [poligono]
                    });

                var polyLayer = new ol.layer.Vector({
                        source: polySource
                });
                map.addLayer(polyLayer);
            });
        })
        

        
    }
