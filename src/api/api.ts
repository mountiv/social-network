import axios from "axios";
import {UsersType} from "../redux/UsersPageReducer";
import {AuthResponse} from "../components/Header/HeaderContainer";
import {FormDataType} from "../components/Login/Login";
import {ProfileDataType} from "../components/Profile/ProfileInfo/ProfileData/ProfileDataForm";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY as string
    },
})

type UsersResponse = {
    items: UsersType[]
    totalCount?: number
    error?: string | null
}

export const usersApi = {
    getUsers(currentPage: number, pageSize: number, term: string = '') {
        return instance.get<UsersResponse>(`users?page=${currentPage}&count=${pageSize}&term=${term}`)
            .then(response => response.data)
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
}

export const profileApi = {
    getUserProfile(userId: number | null) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },

    getUserStatus(userId: number | null) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },

    updateUserStatus(status: string) {
        return instance.put(`profile/status/`, {status})
    },

    updatePhoto(photo: string) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    saveProfile(profile: ProfileDataType) {
        return instance.put<AuthResponse>('profile', profile)
    }
}

export const authApi = {
    authMe() {
        return instance.get<AuthResponse>(`auth/me`)
            .then(response => response.data)
    },

    login(formData: FormDataType) {
        return instance.post<AuthResponse>(`auth/login`, {...formData})
            .then(response => response.data)
    },

    logout() {
        return instance.delete<AuthResponse>(`auth/login`)
            .then(response => response.data)
    }
}


export const securityApi = {
    getCaptchaUrl() {
        return instance.get<{ url: string }>(`security/get-captcha-url`)
            .then(response => response.data)
    }
}