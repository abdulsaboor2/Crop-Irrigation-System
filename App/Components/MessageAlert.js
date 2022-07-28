import { showMessage } from "react-native-flash-message";

const errorMessage = (message) => {
    showMessage({
        message,
        type: 'danger',
        icon:'danger'
    })
}

const successMessage = (message) => {
    showMessage({
        message,
        type: 'success',
        icon:'success'
    })
}
export { errorMessage, successMessage }