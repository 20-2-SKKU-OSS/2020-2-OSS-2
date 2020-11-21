
module.exports = async (countryName) => {

    if(countryName == "korea" || countryName == "Korea" || countryName == "S.Korea" || countryName == "ROK" || 
       countryName == "southkorea" || countryName == "SouthKorea" || countryName == "Hanguk" || countryName == "hanguk"){
        return "S. korea";
    }
    else {
        return countryName;
    }
}