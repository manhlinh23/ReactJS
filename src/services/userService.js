import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    // return axios.post('/api/login', { email, password }) // day la cach viet tat (email:email === email)
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUsers = (inputId) => {
    //${inputId}: template string es6 thay cho viec thay cho viec sd + va ten bien
    return axios.get(`/api/get-all-user?id=${inputId}`)
}

const createNewUserServices = (data) => {
    // console.log('check data from service: ', data)
    return axios.post('/api/create-new-user', data)  // ket noi api ben nodejs
}

const deleteUserServices = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        },
    })
}

const editUserServices = (edit) => {
    return axios.put('/api/edit-user', edit)
}

export { handleLoginApi, getAllUsers, createNewUserServices, deleteUserServices, editUserServices }
