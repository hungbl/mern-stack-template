import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export function setAuthToken(token) {
    if(!token){
        delete api.defaults.headers.common['x-auth-token']
        localStorage.removeItem('token')
    }

    api.defaults.headers.common['x-auth-token'] = token
    localStorage.setItem('token', token)
}

export default api