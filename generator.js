// @ts-check

import { faker } from "@faker-js/faker";

const generateRow = () => {
  const result = "TODO: write generator";
  return result;
};

const result = faker.helpers.multiple(generateRow, {
  count: { min: 10, max: 20 },
});

console.log(result);
