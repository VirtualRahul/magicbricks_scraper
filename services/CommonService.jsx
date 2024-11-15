const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'api/';
import axios from "axios";

export const saveAllProperties = (data, callback) => {
    const url = `${baseUrl}scrape-information`;
    return axios.post(url, data)
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            const errors = error.response ? error.response.data : { message: error.message };
            callback(errors);
        });
};


export const getSavedProperties = (callback) => {
    const url = `${baseUrl}get-properties`;
    return axios.get(url)
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            const errors = error.response ? error.response.data : { message: error.message };
            callback(errors);
        });
};