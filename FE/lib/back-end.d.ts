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

  interface IFile {
    url: string
  }

  interface IUser {
    name: string,
    credit: number
    pref: string
    avatar?: IFile
  }

  interface ICategory{
    name: string
    image: IFile
  }

  interface RecipeOption {
    recipeName: string
    description: string
    ingredients: string[]
  }
}