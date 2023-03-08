import { setActivePinia, createPinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useGameStore } from "./game";

let game: ReturnType<typeof useGameStore>;

beforeEach(() => {
    setActivePinia(createPinia());
    game = useGameStore();
});

describe("createGame method", () => {
    it("should generate players", () => {

    });
});

describe("createAreas method", () => {
    it("should generate 5 rows and 5 columns", () => {
        game.createAreas();
        expect(game.areas.length).toBe(5);
        expect(game.areas[0].length).toBe(5);
    });

    it("should have 2 wood in the fourth column", () => {
        game.createAreas();
        console.log(game.areas.map(area => area.map(a => a.resources)));
        expect(game.areas[2][3].resources.wood).toBe(2);
    });
});
