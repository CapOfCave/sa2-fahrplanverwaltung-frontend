import axios from "axios";

const BASE_URL = "http://localhost:8080";

export default function apiService() {
    return new APIService();
}

class APIService {
    async apiDeleteLineStop(stopid, lineid) {
        try {
            const response = await axios.delete(BASE_URL + "/lines/" + lineid + "/busstops/" + stopid, {
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.response.data);
        }
    }

    async apiAddLineStop(line, stop, time, target) {
        try {
            const response = await axios.post(BASE_URL + "/lines/" + line + "/busstops", {
                "busStopId": stop,
                "secondsToNextStop": time,
                "targetIndex": target,
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.response.data);
        }
    }

    async apiGetAllBusLines() {
        try {
            const response = await axios.get(BASE_URL + "/lines/", {
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.response.data);
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
            alert(error.response.data);
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
                "name": name,
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.response.data);
        }
    }

    async apiCreateBusLine(name) {
        try {
            const response = await axios.post(BASE_URL + "/lines", {
                "name": name,
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.response.data);
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
            alert(error.response.data);
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
            alert(error.response.data);
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
                "name": name,
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.response.data);
        }
    }

    async apiCreateBusStop(name) {
        try {
            const response = await axios.post(BASE_URL + "/busstops", {
                "name": name,
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.response.data);
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
            alert(error.response.data);
        }
    }

    async apiSearchTimetables(id, time, timespan) {
        time = time.substring(0, 19).concat("Z");
        try {
            const response = await axios.get(BASE_URL + "/busstops/" + id + "/timetable?startTime=" + time + "&durationSeconds=" + (timespan * 3600), {
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.response.data);
        }
    }

    async apiGetBusStopLineSchedules(stop, line) {
        try {
            const response = await axios.get(BASE_URL + "/busstops/" + stop + "/schedule/" + line, {
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.response.data);
        }
    }

    async apiDeleteSchedule(id) {
        try {
            const response = await axios.delete(BASE_URL + "/schedules/" + id, {
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.response.data);
        }
    }

    async apiUpdateSchedule(id, time, reverseDirection) {
        console.log(time);
        try {
            const response = await axios.patch(BASE_URL + "/schedules/" + id, {
                "startTime": time,
                "reverseDirection": reverseDirection,
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.response.data);
        }
    }

    async apiCreateSchedule(line, time, reverseDirection) {
        try {
            const response = await axios.post(BASE_URL + "/schedules", {
                "lineId": line,
                "startTime": time,
                "reverseDirection": reverseDirection,
                validateStatus: function (status) {
                    return status <= 400;
                }
            });
            return response.data;
        } catch (error) {
            alert(error.response.data);
        }
    }
}