export {};


declare global {
 
  interface IToken {
    token :string 
    accessTime: string
  }

  interface IResponseLogin {
    accessTokenCookie: IToken,
    refreshTokenCookie: IToken
  }
  
  interface IError {
    statusCode: number
    message: string
  }
}