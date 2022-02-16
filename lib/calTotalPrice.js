export default function calTotalPrice(cart) {
  //   let total = 0;
  //   cart.map((item) => {
  //     total += item.product.price * item.product.quantity;
  //   });
  //   return total;
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally;
    const { product } = cartItem;
    return tally + product.price * cartItem.quantity;
  }, 0);
}
