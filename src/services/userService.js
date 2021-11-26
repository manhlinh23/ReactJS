import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    // return axios.post('/api/login', { email, password }) // day la cach viet tat (email:email === email)
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUsers = (inputId) => {
    //${inputId}: template string es6
    return axios.get(`/api/get-all-user?id=${inputId}`)
}

export { handleLoginApi, getAllUsers }
