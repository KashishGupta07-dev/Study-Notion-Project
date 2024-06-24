import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = async(method, url, bodyData=null, headers=null, params=null) => {
    return await axiosInstance({
        method:`${method}`,
        url:`${process.env.REACT_APP_BASE_URL}${url}`,
        data: bodyData,
        headers: headers,
        params: params,
    });
}
