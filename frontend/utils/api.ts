import axios from "axios";

export default axios.create({
    // PROD
    //baseURL: "http://44.197.32.186",
    // TESTE
    baseURL: "http://localhost:5000",
});