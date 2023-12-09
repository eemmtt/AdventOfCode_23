const input = require("./Day5_input.js");

const CleanInput = (input) => {
    
    let cleaned = input
        .split("\n\n")
        .map((d) => d.split(':')[1].trim())
        .map((d) => d.split('\n'))
        .map((d) => d.map((e) => e.trim().split(' ')));
    
    for (let i = 1; i < cleaned.length; i++) {
        cleaned[i] = cleaned[i].map((e) => e={dst: e[0], src: e[1], len: e[2]});
    }
    return ({
        seeds: cleaned[0][0],
        seed_to_soil: cleaned[1],
        soil_to_fertilizer: cleaned[2],
        fertilizer_to_water: cleaned[3],
        water_to_light: cleaned[4],
        light_to_temperature: cleaned[5],
        temperature_to_humidity: cleaned[6],
        humidity_to_location: cleaned[7]
    }); 
};

const Convert = (input, map) => {
    let out = input;
    map.forEach(m => {
        let delta = input - m.src ;
        if (delta >= 0 && delta < m.len){ //if input in range of mapping
            out = Number(m.dst) + delta; //ouput dest + delta
        }
    });

    //if no defined mappings, pass through
    return out;
}

const FindMinLocation = (data) => {
    let min = Infinity;
    data.seeds.forEach((seed) => {
        let soil = Convert(seed, data.seed_to_soil);
        let fertilizer = Convert(soil, data.soil_to_fertilizer);
        let water = Convert(fertilizer, data.fertilizer_to_water);
        let light = Convert(water, data.water_to_light);
        let temperature = Convert(light, data.light_to_temperature);
        let humidity = Convert(temperature, data.temperature_to_humidity);
        let location = Convert(humidity, data.humidity_to_location);
        if (location < min) {
            min = location;
        }
    });
    return min;
}

const data = CleanInput(input.d2);
const closest_location = FindMinLocation(data);


console.log("The closest location is:", closest_location);