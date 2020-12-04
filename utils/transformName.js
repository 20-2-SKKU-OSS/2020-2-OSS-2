
module.exports = async (countryName) => {

    /*
        1. Sources of all country names are referenced at "en.wikipedia.org".
        2. Return value should always be a standardized (default output to corona-cli) country name.
        The countries currently supported are:
            S. korea, USA, China, Japan, Russia, United Kingdom, Germany
    */
   
    //S. korea
    if(countryName == "korea" || countryName == "Korea" || countryName == "S.Korea" || countryName == "Korea, Republic of" || countryName == "ROK" || 
       countryName == "southkorea" || countryName == "SouthKorea" || countryName == "Hanguk" || countryName == "hanguk"){

        return "S. korea";
    }

    //USA
    else if(countryName == "UnitedStates" || countryName == "U.S." || countryName == "UnitedStatesofAmerica"){

        return "USA";
    }

    //China
    else if(countryName == "PRC" || countryName == "People's Republic of China" ){

        return "China";
    }

    //Japan
    else if(countryName == "State of Japan" || countryName == "Nihon"){

        return "Japan";
    }

    //Russia
    else if(countryName == "RussianFederation" || countryName == "Rossiyskaya Federatsiya" ){

        return "Russia";
    }

    //United Kingdom
    else if(countryName == "U.K." || countryName == "Britain" || countryName == "United Kingdom of Great Britain and Northern Ireland"){

        return "United Kingdom";
    }
    
    //Germany
    else if(countryName == "Federal Republic of Germany" || countryName == "Deutschland" ){

        return "Germany";
    }

    //Not applicable to transform.
    else {
        return countryName;
    }
}