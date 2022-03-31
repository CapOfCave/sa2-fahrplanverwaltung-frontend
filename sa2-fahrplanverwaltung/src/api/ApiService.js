import axios from "axios";

const BASE_URL = "http://localhost:8080";

export async function apiDeleteLineStop(stopid, lineid) {
    const response = await axios.delete(BASE_URL + "/lines/" + lineid + "/busstops/" + stopid, {
        validateStatus: function (status) {
            return status <= 400;
        }
    });
    return response.data;
}

export async function apiAddLineStop(lineId, busStopId, secondsToNextStop, targetIndex) {
    const response = await axios.post(BASE_URL + "/lines/" + lineId + "/busstops", {
        busStopId: busStopId,
        secondsToNextStop: secondsToNextStop,
        targetIndex: targetIndex,
        validateStatus: function (status) {
            return status <= 400;
        }
    });
    return response.data;
}

export async function apiPatchLineStop(stopid, lineid, secondsToNextStop, targetIndex) {
    const response = await axios.patch(BASE_URL + "/lines/" + lineid + "/busstops/" + stopid, {
        secondsToNextStop: secondsToNextStop,
        targetIndex: targetIndex
    });
    return response.data;
}

export async function apiGetAllBusLines() {
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

export async function getBusLine(id) {
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

export async function apiDeleteBusLine(id) {
    const response = await axios.delete(BASE_URL + "/lines/" + id, {
        validateStatus: function (status) {
            return status <= 400;
        }
    });
    return response.data;
}

export async function apiRenameBusLine(id, name) {
    const response = await axios.patch(BASE_URL + "/lines/" + id, {
        "name": name,
        validateStatus: function (status) {
            return status <= 400;
        }
    });
    return response.data;
}

export async function apiCreateBusLine(name) {
    const response = await axios.post(BASE_URL + "/lines", {
        "name": name,
        validateStatus: function (status) {
            return status <= 400;
        }
    });
    return response.data;
}

export async function apiGetAllBusStops() {
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

export async function getBusStop(id) {
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

export async function apiDeleteBusStop(id) {
    const response = await axios.delete(BASE_URL + "/busstops/" + id, {
        validateStatus: function (status) {
            return status <= 400;
        }
    });
    return response.data;
}

export async function apiRenameBusStop(id, name) {
    const response = await axios.patch(BASE_URL + "/busstops/" + id, {
        "name": name,
        validateStatus: function (status) {
            return status <= 400;
        }
    });
    return response.data;
}

export async function apiCreateBusStop(name) {
    const response = await axios.post(BASE_URL + "/busstops", {
        "name": name,
        validateStatus: function (status) {
            return status <= 400;
        }
    });
    return response.data;
}

export async function apiGetAllSchedules() {
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

export async function apiSearchTimetables(id, time, timespan) {
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

export async function apiGetBusStopLineSchedules(stop, line) {
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

export async function apiDeleteSchedule(id) {
    const response = await axios.delete(BASE_URL + "/schedules/" + id, {
        validateStatus: function (status) {
            return status <= 400;
        }
    });
    return response.data;
}

export async function apiUpdateSchedule(id, time, reverseDirection) {
    const response = await axios.patch(BASE_URL + "/schedules/" + id, {
        "startTime": time,
        "reverseDirection": reverseDirection,
        validateStatus: function (status) {
            return status <= 400;
        }
    });
    return response.data;
}

export async function apiCreateSchedule(line, time, reverseDirection) {
    const response = await axios.post(BASE_URL + "/schedules", {
        "lineId": line,
        "startTime": time,
        "reverseDirection": reverseDirection,
        validateStatus: function (status) {
            return status <= 400;
        }
    });
    return response.data;
}