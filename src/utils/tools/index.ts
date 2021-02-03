import { getBaseConfig } from "src/config"

export const getImageLink = (name, token) => {
  return `${getBaseConfig().fireBaseEndPoint}/${name}?alt=media&token=${token}`
}