import inspector from '../js/inspector.js';
// import ErrorRepository from "../src/mapZ"

const dataList = [

  [
    '[51.50851, −-0.12572]', 2
  ],
  [
    '[--51.50851, −-0.12572]', 2
  ],
  [
    '[96.50851,0.12572]', 1
  ],
  [
    '[[6.50851,   20.12572]]', 2
  ],
  [
    '96.50851, 0.12572', 1
  ],
  [
    '[]96.50851, 0.12572]', 1
  ],
  [
    'adsdsf, sddvxv]', 0
  ],
];

const handler = test.each(dataList);

handler('тестирование валидатора введенных координат', (code, value) => {
  const result = inspector(code);
  expect(result.length).toBe(value);
});