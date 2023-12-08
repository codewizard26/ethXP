import crypto from "crypto";

//eslint-disable-next-line
const app_id = BigInt(
  parseInt(crypto.randomBytes(20).toString("hex"), 16)
).toString(); // random value.

console.log(`----------------------------------------------------------------`);
console.log(`Your app_id `, app_id);
console.log(`----------------------------------------------------------------`);
