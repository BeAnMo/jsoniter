import BFStream from './bf-stream';
import JsonPath from './json-path';
import Doc from './doc';

describe('A breadth-first stream instance', () => {
    const d0 = { a: 1, b: 2, c: [3, 4, 5] };
    const s0 = new BFStream(d0, '.');
    const makePath = p => new JsonPath(p, '.');
    const values = [
        {
            key: 'a',
            value: 1,
            path: makePath('a')
        },
        {
            key: 'b',
            value: 2,
            path: makePath('b')
        },
        {
            key: '0',
            value: 3,
            path: makePath('c.0')
        },
        {
            key: '1',
            value: 4,
            path: makePath('c.1')
        },
        {
            key: '2',
            value: 5,
            path: makePath('c.2')
        }
    ];

    it('should iterate over the expected values', () => {
        let i = 0;

        while (!s0.empty()) {
            const actual = s0.next();
            const expected = values[i];

            expect(actual).toStrictEqual(expected);
            i++;
        }
    });

    it('should return null when the stream has ended', () => {
        const stream = new BFStream(d0, '.');

        for (let i = 0; i < 6; i++) {
            stream.next();
        }

        expect(stream.next()).toBe(null);
    });

    it('should correctly reflect the empty status', () => {
        const stream = new BFStream(d0, '.');

        for (let i = 0; i < 5; i++) {
            expect(stream.empty()).toBeFalsy();

            stream.next();
        }

        expect(stream.empty()).toBeTruthy();
    });
});