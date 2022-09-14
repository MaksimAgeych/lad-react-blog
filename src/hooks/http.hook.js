import axios from "axios";

export const useHttp = () => {

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        try {
           switch(method) {
                case 'GET':
                    return await axios.get(url).then(res => {console.log(res.data);return res.data});
                case 'POST':
                    return await axios.post(url, body).then(res => {console.log(res);return res.data});
                case 'PUT':
                    return await axios.put(url, body).then(res => {console.log(res.data);return res.data});
                case 'DELETE':
                    return await axios.delete(url).then(res => {console.log(res.data);return res.data});
                default:
                    throw new Error('Unexpected request');
           }
        } catch(e) {
            throw e;
        }
    };

    return {request}
}