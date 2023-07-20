export function toCent(price?: number | string) {
  if (price === undefined) {
    throw new Error("Preço não pode ser undefined");
  }

  return parseInt(price.toString().replace('.', '').replace(",", ""));
}
