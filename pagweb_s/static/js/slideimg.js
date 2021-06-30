$(document).ready(heightsimbo);

function heightsimbo(){

    switch(true){
        case $('#fire').is(':checked') && $('#sentineltc').is(':checked') && $('#sargazo_d').is(':checked'):
            $('.Simbologia').css('height','50%');
            break;

        case $('#fire').is(':checked'):
            $('.Simbologia').css('height','50%');
            break;

        case $('#sentineltc').is(':checked'):
            $('.Simbologia').css('height','50%');
            break;

        case $('#sargazo_d').is(':checked'):
            $('.Simbologia').css('height','50%');
            break;
        default:
            $('.Simbologia').css('height','20%');
    }
    
    
};



