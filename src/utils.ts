import ResourceCollection from "./resource-collection";

export function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFrom<T>(array: Array<T>): T {
    return array[random(0, array.length - 1)];
}

export function randomWeighted<T>(elements: { [key: string]: number }): string {
    let spread: string[] = [];
    Object.keys(elements).forEach((key, i) => {
        let val = elements[key];
        for (let i = 0; i < val; i++) {
            spread.push(key);
        }
    });
    return randomFrom(spread);
}

/*
export function randomResourcePool(size: number): ResourceCollection {
    for (let i = 0; i < size; i++) {
        
    }
}
*/
