/* eslint-disable no-self-assign */
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'

export const decodeProps = (props) => {
  let buff = Base64.parse(props)
  const decoded = Utf8.stringify(buff)
  const decodedJSON = JSON.parse(decoded)
  return decodedJSON
}
