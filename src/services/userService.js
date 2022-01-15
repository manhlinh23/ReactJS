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

const getDetailDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor?id=${id}`)
}

//xai params
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInfoDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const postBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}


export {
    createInfoDoctorService, getAllDoctors, getTopDoctorHomeService,
    handleLoginApi, getAllUsers,
    createNewUserServices, deleteUserServices,
    editUserServices, getAllCodeServives, getDetailDoctor, saveBulkScheduleDoctor,
    getScheduleDoctorByDate, getExtraInfoDoctorById, getProfileDoctorById, postBookAppointment, postVerifyBookAppointment,

}