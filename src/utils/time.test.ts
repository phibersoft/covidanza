import {getDayCountBetweenCoronaAndToday, timestampToDate} from "./time";

describe('Time Testings', () => {
    test('Day Count between Corona', () => {
        const dayCount = getDayCountBetweenCoronaAndToday();
        expect(dayCount).toBeGreaterThan(635);
    });

    test('Timestamp To Date', () => {
        expect(timestampToDate('1628816841')).toBe('13.08.2021 04:07:21');
    })
})