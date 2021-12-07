function getSumm<T>(products: T): number {
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

export {
  getSumm 
}