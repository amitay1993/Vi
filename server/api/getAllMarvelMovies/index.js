import {apiService} from "../../index.js";
import axios from "axios";

const keywordId="180547-marvel-cinematic-universe-mcu"

export async function getAllMarvelMoviesNameAndId() {
    const queryParams = new URLSearchParams({
        [apiService.apiKeyName]: apiService.apiKeyValue
    })


    const {data:{results}} = await axios.get(`
    ${apiService.baseUrl}/keyword/${keywordId}/movies?${queryParams}`);

    const response=results.map(({id,original_title})=>{
        return {
            id,original_title
        }
    })
    return response;
}

