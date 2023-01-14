import axios from 'axios';
const base_url = "https://innovo-api.vcon.ae/wp-json/vcon/auth/v1/token";
const login = async (data) => {
    console.log(data)
    const response = await axios.post(`${base_url}`, data)
        .then((res) => {
            console.log("login in", res.data.token);
            localStorage.setItem("api_token", res.data?.token);
            localStorage.setItem("user_name", data?.username);
            console.log(localStorage.api_token, localStorage.user_name)
            return true
        })
        .catch(error => {
            console.log(error.message);
            alert('enter a valid data', error.message);
            return false
        });
    return response

}
export default login;