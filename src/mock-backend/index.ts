import { createServer, Response } from "miragejs";

import type { City } from "../types";

const allCitiesJSON: Array<[string, number, number]> = require("./cities.json");

interface Location {
	lat: number;
	lon: number;
}

const cities: Array<City> = allCitiesJSON.map((city) => ({
	name: city[0],
	latitude: city[1],
	longitude: city[2],
}));

function findLocationByName(cityName: string) {
	const city = cities.filter((item) => item.name === cityName)[0];
	return {
		lat: city.latitude,
		lon: city.longitude,
	};
}

function calculateDistance(location1: Location, location2: Location) {
	const earthRadius = 6371; // radius of the Earth in km
	const dLat = toRadians(location2.lat - location1.lat);
	const dLon = toRadians(location2.lon - location1.lon);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRadians(location1.lat)) *
			Math.cos(toRadians(location2.lat)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = earthRadius * c;
	return distance;
}

function toRadians(degrees: number) {
	return degrees * (Math.PI / 180);
}

export function makeServer({ environment = "development" } = {}) {
	let server = createServer({
		environment,
		routes() {
			this.namespace = "api";

			this.post(
				"/search_cities",
				(_, request) => {
					console.log(request);
					const keyword: string = request.requestBody;
					// console.log(keyword);
					let filteredByKeywordCities: City[] = [];

					if (keyword === "fail")
						return new Response(400, {}, { error: "fail_search_city" });
					if (keyword)
						filteredByKeywordCities = cities.filter((city) =>
							city.name.toLowerCase().includes(keyword),
						);

					return {
						cities: filteredByKeywordCities,
					};
				},
				{ timing: 1000 },
			);

			this.post(
				"/calculate_distances",
				(_, request) => {
					const distances = [];
					const requestBody = JSON.parse(request.requestBody);

					for (let i in requestBody) {
						const index = Number(i);

						if (requestBody[index] === "Dijon")
							return new Response(
								400,
								{},
								{ error: "fail_calculate_distances" },
							);
						if (index === 0) continue;
						const location1 = findLocationByName(requestBody[index - 1]),
							location2 = findLocationByName(requestBody[index]);
						const distance = calculateDistance(location1, location2);

						distances.push(distance.toFixed(2));
					}

					return {
						distances,
					};
				},
				{ timing: 1000 },
			);
		},
	});

	return server;
}
