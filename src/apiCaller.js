import axios from "axios";

//Generic API Call function which serves both pages
const apiCaller = async (param) => { 
    param.apikey = 'b9bd48a6'
    try {
        const response = await axios.get('https://www.omdbapi.com/', { params: param })
        console.log("get response: ", response, param)

        if (response.status == 200) {
            return response.data;
        }
        else {
            return { Response: "False", Error: "Something went wrong!!" }
        }
    } catch (e) {
        console.log('Error', e)
        return { Response: "False", Error: "Something went wrong!" }
    }
}

export default apiCaller;