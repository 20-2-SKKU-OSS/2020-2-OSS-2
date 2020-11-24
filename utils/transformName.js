
module.exports = async (countryName) => {

    //Sources of all country names are referenced at "en.wikipedia.org".

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

    else {
        return countryName;
    }
}