interface productI {
  company: string;
  name: string;
  price: number;
  images: string[];
  description: any[];
  category: string;
  id: string;
}
interface products {
  [key: string]: {
    productId: string;
    quantity: number;
    productData: productI;
  };
}

export function getSumm(products: products) {
  const keysOfObject = Object.keys(products);
  const result = keysOfObject.reduce((acc, el) => {
    return acc + products[el].productData.price * products[el].quantity;
  }, 0);
  return result;
}
