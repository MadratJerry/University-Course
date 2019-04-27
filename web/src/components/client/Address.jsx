const Address = ({ province, city, country, detail }) =>
  `${province === city ? '' : province}${city}${country}${detail}`

export default Address
