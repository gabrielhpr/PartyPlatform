import axios from "axios";

export default axios.create({
    // PROD
    //baseURL: "https://api.festafy.com.br",
    // TESTE
    baseURL: "http://localhost:5000",
});