import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    // return axios.post('/api/login', { email, password }) // day la cach viet tat (email:email === email)
    return axios.post('/api/login', { email: userEmail, password: userPassword })

}

export { handleLoginApi }
