import { faker } from '@faker-js/faker';

// Local placeholder images for faster loading - using deterministic IDs
const localImages = [
  'https://picsum.photos/seed/1/300/200',
  'https://picsum.photos/seed/2/300/200',
  'https://picsum.photos/seed/3/300/200',
  'https://picsum.photos/seed/4/300/200',
  'https://picsum.photos/seed/5/300/200',
  'https://picsum.photos/seed/6/300/200',
  'https://picsum.photos/seed/7/300/200',
  'https://picsum.photos/seed/8/300/200',
  'https://picsum.photos/seed/9/300/200',
  'https://picsum.photos/seed/10/300/200',
  'https://picsum.photos/seed/11/300/200',
  'https://picsum.photos/seed/12/300/200',
];

export const generateProducts = (count = 10000) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image:  localImages[index % localImages.length],
      // : faker.image.urlLoremFlickr({ category: 'product' }),
    price: parseFloat(faker.commerce.price()),
  }));
};

export const allProducts = generateProducts(10000); // Use local images for better performance
