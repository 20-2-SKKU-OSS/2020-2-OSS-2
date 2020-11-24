
module.exports = async (countryName) => {

    //S. korea
    if(countryName == "korea" || countryName == "Korea" || countryName == "S.Korea" || countryName == "Korea, Republic of" || countryName == "ROK" || 
       countryName == "southkorea" || countryName == "SouthKorea" || countryName == "Hanguk" || countryName == "hanguk"){

        return "S. korea";
    }

    //USA
    else if(countryName == "UnitedStates" || countryName == "U.S." || countryName == "UnitedStatesofAmerica"){

        return "usa";
    }

    //China
    //PRC = People's Republic of China
    else if(countryName == "PRC" || countryName == "People's Republic of China" || countryName == "People'sRepublicofChina"){

        return "China";
    }

    //Japan
    else if(countryName == "State of Japan" || countryName == "Nihon"){

        return "Japan";
    }


    else {
        return countryName;
    }
}