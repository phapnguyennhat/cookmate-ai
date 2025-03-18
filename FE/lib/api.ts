import { fetcher } from "./util"

export const callBe = () =>{
  return fetcher(process.env.BACKEND_URL!, {
    method: 'GET'
  })
}