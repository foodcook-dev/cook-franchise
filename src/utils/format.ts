const formatPrice = (price: number | string | undefined) => {
  if (!price) {
    return '0'
  }
  if (typeof price === 'string') {
    price = parseInt(price)
  }
  return price.toLocaleString()
}

export { formatPrice }
