$(document).ready(heightsimbo);

function heightsimbo(){

    switch(true){
        case $('#fire').is(':checked') && $('#goes').is(':checked'):
            $('.Simbologia').css('height','50%');
            break;

        case $('#fire').is(':checked'):
            $('.Simbologia').css('height','50%');
            break;

        case $('#goes').is(':checked'):
            $('.Simbologia').css('height','50%');
            break;

        default:
            $('.Simbologia').css('height','20%');
    }
    
    
};



