import Axios from "../../axios";

export async function Getstate() {
    return await Axios.get(`/eF/api/toponymy/country/?term=%`)
}

export async function Getprovince(countryIsoCode) {
    return await Axios.get(`/eF/api/toponymy/province/?term=%&countryIsoCode=${countryIsoCode?.value}`)
}

export async function GetmunicipalityData(countryIsoCode, licensePlateCode) {
    return await Axios.get(`https://api-developer01.elixdev.it/eF/api/toponymy/municipality/?term=%&countryIsoCode=${countryIsoCode?.value}&licensePlateCode=${licensePlateCode?.value}`)
}