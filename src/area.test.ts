import { describe, expect, it } from "vitest";
import Area from "./area";

const resourceConfig = {
    food: 0,
    wood: 0,
    stone: 0,
    metal: 0,
}

describe("isAdjacent method", () => {
    it("should return true for adjacent areas", () => {
        const a = new Area(1, 1, resourceConfig);
        const b = new Area(1, 2, resourceConfig);
        expect(a.isAdjacentTo(b)).toBeTruthy();
    });

    it("should return false for non adjacent areas", () => {
        const a = new Area(1, 1, resourceConfig);
        const b = new Area(2, 0, resourceConfig);
        expect(a.isAdjacentTo(b)).toBeFalsy();
    });

    it("should return false if areas are the same location", () => {
        const a = new Area(1, 1, resourceConfig);
        const b = new Area(1, 1, resourceConfig);
        expect(a.isAdjacentTo(b)).toBeFalsy();
    });

    it("should return false for diagonal areas", () => {
        const a = new Area(1, 1, resourceConfig);
        const b = new Area(2, 2, resourceConfig);
        expect(a.isAdjacentTo(b)).toBeFalsy();
    });
});
