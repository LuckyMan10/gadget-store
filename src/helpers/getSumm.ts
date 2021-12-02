interface productI {
  company: string;
  name: string;
  price: number;
  images: string[];
  description: any[];
  category: string;
  id: string;
}
interface productsVar1 {
  [key: string]: {
    productId: string;
    quantity: number;
    productData: productI;
  };
}
interface productsVar2 {
  productId: string;
  quantity: number;
  product: productI;
}

export function getSumm(products: productsVar1 | Array<productsVar2>): number {
  const check = Array.isArray(products);
  if (check) {
    const result = products.reduce((acc, el, index) => {
      return acc + products[index].product.price * products[index].quantity;
    }, 0);
    return result;
  };
  if (!check) {
    const keysOfObject = Object.keys(products);
    const result = keysOfObject.reduce((acc, el) => {
      return acc + products[el].productData.price * products[el].quantity;
    }, 0);
    return result;
  };
  return 0;
}
