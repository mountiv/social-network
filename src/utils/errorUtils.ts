import {AxiosError} from 'axios';
import {toast} from "react-toastify";
import {ErrorResponseType} from "../redux/AuthReducer";

export const handleNetworkError = (err: AxiosError<ErrorResponseType>) => {
    if (err.response && err.response.data?.messages) {
        toast.error(err.response.data.messages[0]);
    } else {
        toast.error('Network error, try later');
    }
};