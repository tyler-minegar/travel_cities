import axios from "axios";

const serverURL =
	process.env.REACT_APP_SERVER_URL || "https://localhost:3000/api";

const searchCity = (keyword: string) => {
	return axios.post(`${serverURL}/search_cities`, keyword);
};

const calcuateDistances = (cities: string[]) => {
	return axios.post(`${serverURL}/calculate_distances`, cities);
};

export { searchCity, calcuateDistances };
