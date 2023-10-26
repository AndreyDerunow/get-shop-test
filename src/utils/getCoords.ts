import { Icoords } from "../interfaces";

const getCoords = (str: string, arr: string[][]) => {
    const coords = { x: 0, y: 0 };
    arr.forEach((arr, i) => {
        if (arr.includes(str)) {
            coords.y = i;
            coords.x = arr.findIndex((el) => el === str);
        }
    });
    return coords as Icoords;
};

export default getCoords;
