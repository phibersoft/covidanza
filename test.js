const corona_starts = new Date(`11/17/2019`);
const today = new Date();
const oneDay = 24 * 60 * 60 * 1000;

console.log(Math.round(Math.abs((today - corona_starts) / oneDay)));