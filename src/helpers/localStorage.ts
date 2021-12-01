export function setWithExpiry(id: string, ttl: number) {
  const now = new Date();
  const favoriteList = {};
  const productList = {};
  const item = {
    id,
    favoriteList,
    productList,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem("anonymUser", JSON.stringify(item));
}

export function getWithExpiry(key: string) {
  const anonymUser = localStorage.getItem(key);
  if (!anonymUser) {
    return null;
  }
  const item = JSON.parse(anonymUser);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(anonymUser);
    return null;
  }
}

export function localStorageSave(anonymUser: string, id: string, type?: string) {
  const cartData = JSON.parse(anonymUser);
  cartData.productList && !type && delete cartData.productList[id];
  cartData.favoriteList && !type && delete cartData.favoriteList[id];
  type === "INCREMENT" && cartData.productList[id].quantity++;
  type === "DECREMENT" && cartData.productList[id].quantity--;
  localStorage.setItem("anonymUser", JSON.stringify(cartData));
}
