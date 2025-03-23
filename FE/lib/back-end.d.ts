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
    email: string
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

  interface IRecipe {
    id: string
    recipeName: string
    description: string
    ingredients: Ingredient[]
    steps: string[]
    calories: number
    cookTime: number
    serveTo: number
    imagePrompt: string
    recipeImageUrl:string
    userFavorites: Object[]
  }

  interface Ingredient {
    ingredient: string,
    icon: string,
    quantity: string
  }

  interface QueryRecipe {
    page?: number, 
    limit?: number
    categoryName ?:string
    createAt?: 'asc'|'desc'
    collection?: 'all'|'my-recipe' | 'my-favorite'
  }
}