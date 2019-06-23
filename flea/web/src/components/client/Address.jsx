// 显示地址的封装
const Address = ({ province, city, country, detail }) =>
  `${province === city ? '' : province}${city}${country}${detail}`

export default Address
