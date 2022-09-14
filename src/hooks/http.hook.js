import axios from "axios";

export const useHttp = () => {

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        try {
           switch(method) {
                case 'GET':
                    return await axios.get(url).then(res => res.data);
                case 'POST':
                    return await axios.post(url, body).then(res => res => res.data);
                case 'PUT':
                    return await axios.put(url, body).then(res => res => res.data);
                case 'DELETE':
                    return await axios.delete(url).then(res => res => res.data);
                default:
                    throw new Error('Unexpected request');
           }
        } catch(e) {
            throw e;
        }
    };

    return {request}
}