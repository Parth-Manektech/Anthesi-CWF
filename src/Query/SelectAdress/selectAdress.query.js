import Axios from "../../axios";

export async function Getstate(params) {
    return await Axios.get(`/eF/api/toponymy/country/?term=${params?.term}`)
}