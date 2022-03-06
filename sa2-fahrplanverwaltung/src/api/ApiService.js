import axios from "axios";

const BASE_URL = "http://localhost:8080";

export default function apiService() {
    return new APIService();
}

class APIService {
    async apiGetAllBusStops() {
        try {
            const response = await axios.get(BASE_URL + "/busstops/", {
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.message);
        }
    }

    async getBusStop(id) {
        try {
            const response = await axios.get(BASE_URL + "/busstops/" + id, {
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.message);
        }
    }

    async apiGetAllSchedules() {
        try {
            const response = await axios.get(BASE_URL + "/schedules/", {
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.message);
        }
    }
}