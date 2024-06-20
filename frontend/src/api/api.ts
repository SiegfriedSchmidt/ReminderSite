import axios from "axios";

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
})

async function refreshToken() {
    const response = await api.get('refresh');
    return response.data;
}


