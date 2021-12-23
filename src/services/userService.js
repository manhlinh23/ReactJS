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

const getAllCodeServives = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctor`)
}

const createInfoDoctorService = (data) => {
    return axios.post(`/api/create-infor-doctor`, data)
}

export {
    createInfoDoctorService, getAllDoctors, getTopDoctorHomeService,
    handleLoginApi, getAllUsers,
    createNewUserServices, deleteUserServices,
    editUserServices, getAllCodeServives
}
