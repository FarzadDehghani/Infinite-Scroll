import { faker } from "@faker-js/faker";

export const generateProducts = () => {
  return Array.from({ length: 20 }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    image: faker.image.avatar(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
  }));
};
