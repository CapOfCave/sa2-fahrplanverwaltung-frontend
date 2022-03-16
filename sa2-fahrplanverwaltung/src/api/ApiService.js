import axios from "axios";

const BASE_URL = "http://localhost:8080";

export default function apiService() {
    return new APIService();
}

class APIService {
    async apiGetAllBusLines() {
        try {
            const response = await axios.get(BASE_URL + "/lines/", {
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.message);
        }
    }

    async getBusLine(id) {
        try {
            const response = await axios.get(BASE_URL + "/lines/" + id, {
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.message);
        }
    }

    async apiDeleteBusLine(id) {
        try {
            const response = await axios.delete(BASE_URL + "/lines/" + id, {
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.response.data);
        }
    }

    async apiRenameBusLine(id, name) {
        try {
            const response = await axios.patch(BASE_URL + "/lines/" + id, {
                    "name" : name,
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.message);
        }
    }

    async apiCreateBusLine(name) {
        try {
            const response = await axios.post(BASE_URL + "/lines", {
                    "name" : name,
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.message);
        }
    }

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

    async apiDeleteBusStop(id) {
        try {
            const response = await axios.delete(BASE_URL + "/busstops/" + id, {
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.response.data);
        }
    }

    async apiRenameBusStop(id, name) {
        try {
            const response = await axios.patch(BASE_URL + "/busstops/" + id, {
                    "name" : name,
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.message);
        }
    }

    async apiCreateBusStop(name) {
        try {
            const response = await axios.post(BASE_URL + "/busstops", {
                    "name" : name,
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

    async apiSearchTimetables(id, time) {
        try {
            const response = await axios.get(BASE_URL + "/busstops/" + id +"/timetable?startTime="+time+"&durationSeconds=3000", {
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.message);
        }
    }

    async apiDeleteSchedule(id) {
        try {
            const response = await axios.delete(BASE_URL + "/schedules/"+id, {
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