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
    it("should generate 6 rows and 6 columns", () => {
        game.createAreas();
        expect(game.areas.length).toBe(6);
        expect(game.areas[0].length).toBe(6);
    });

    it("should have 2 wood in the fourth column", () => {
        game.createAreas();
        expect(game.areas[2][3].resources.wood).toBe(3);
    });
});
