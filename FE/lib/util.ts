export async function fetcher<T> (input: string, init?: RequestInit) {
  try {
    console.log(process.env.BACKEND_URL)
    const response = await fetch(`${process.env.BACKEND_URL}/${input}`, init)
  
    const data = await response.json()

  
    return data as T | IError
  
  } catch (error) {
    console.log({error})
    return {
      statusCode: 500,
      message: 'Server Error'
    } as IError
  }
}