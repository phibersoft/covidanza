import {capitalizeFirstLetter, compareDates} from "./dom";

describe('Dom Testing', () => {
    test('Compare Dates', () => {
        expect(compareDates('1/1/1970', '2/1/1970')).toBe(-1);
        expect(compareDates('2/1/1970', '1/1/1970')).toBe(1);
        expect(compareDates('1/1/1970', '1/1/1970')).toBe(0);
    });

    test('Capitalize First Letter', () => {
        expect(capitalizeFirstLetter('phiber')).toBe('Phiber');
        expect(capitalizeFirstLetter('Phiber')).toBe('Phiber');
        expect(capitalizeFirstLetter('phiber space')).toBe('Phiber space');
    })
})