$(document).ready(main);

    function main(){
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
                
                               
                viewparameters = 'f:'+fecha_1+' ;f1:'+fecha_2 ;
                puntosconlayer.getSource().updateParams({'LAYERS': 'fires:puntos_d', 'viewparams': viewparameters }); 
                
                if($('#pconsulta').html()==''){
                    $('#pconsulta').html('<input type="checkbox" id="pconsul" value="1" checked=""/>'+
                    '<label for="check1"> Puntos Consulta</label><br>');
                    imgcon = "static/img/Simbo/PuntosConsulta.png";
                    // swal($('#pconsulta').html());
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
                
                // var features = vectorSource.readFeatures();
                // vectorSource.clear(true);
                // vectorSource.addFeatures(features);

                
                
                


                
                /*wmsSourcepuntos.refresh();             
                map.addLayer(puntosconlayer);*/
            

            // $('.botton-Buscar').click(function(){
            //         var imgcon = "static/img/Simbo/PuntosConsulta.png";
            //         $('#imagen').append('<img src="'+imgcon+'" class="imgcon"/>');
            //         $('#pconsulta').append('<input type="checkbox" id="pconsul" value="1" checked=""/>'+
            //             '<label for="check1">Puntos Consulta</label><br>');
            // });

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


        
    }
