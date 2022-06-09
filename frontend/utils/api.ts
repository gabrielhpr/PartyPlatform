import axios from "axios";

export default axios.create({
    // TESTE
    //baseURL: "http://localhost:5000",
    // PROD
    baseURL: "https://api.festafy.com.br",
});