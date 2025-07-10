import { faker } from '@faker-js/faker';

// Local placeholder images for faster loading
const localImages = [
  'https://picsum.photos/300/200?random=1',
  'https://picsum.photos/300/200?random=2',
  'https://picsum.photos/300/200?random=3',
  'https://picsum.photos/300/200?random=4',
  'https://picsum.photos/300/200?random=5',
  'https://picsum.photos/300/200?random=6',
  'https://picsum.photos/300/200?random=7',
  'https://picsum.photos/300/200?random=8',
  'https://picsum.photos/300/200?random=9',
  'https://picsum.photos/300/200?random=10',
  'https://picsum.photos/300/200?random=11',
  'https://picsum.photos/300/200?random=12',
];

export const generateProducts = (count = 10000, useLocalImages = true) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: useLocalImages 
      ? localImages[index % localImages.length] 
      : faker.image.urlLoremFlickr({ category: 'product' }),
    price: parseFloat(faker.commerce.price()),
  }));
};

export const allProducts = generateProducts(10000, true); // Use local images for better performance
