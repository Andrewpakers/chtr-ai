import "@testing-library/jest-dom";
import getImages from "../utils/imageManager";
import truncateString from "../utils/truncateString";


describe("imageManager tests", () => {
    it('Returns the proper objects with our image', () => {
        const images = getImages();
        expect(images[0]).toHaveProperty('img');
        expect(images[0]).toHaveProperty('alt');
    })
})

describe("truncateString tests", () => {
    it('Properly truncates string', () => {
        const exampleCopy = "This is a super long message so that we make sure the string is properly truncated";
        const truncatedString = truncateString(exampleCopy, 30);
        const expectedString = 'This is a super long message s...';
        expect(truncatedString).toMatch(expectedString);
    })
})