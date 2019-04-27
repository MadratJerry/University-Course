const Address = ({ province, city, country, detail }) =>
  `${province === city ? '' : province + '省'}${city}市${country}区${detail}`

export default Address
