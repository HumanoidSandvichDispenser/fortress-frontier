import ResourceCollection from "./resource-collection";

export function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
export function randomResourcePool(size: number): ResourceCollection {
    for (let i = 0; i < size; i++) {
        
    }
}
*/
