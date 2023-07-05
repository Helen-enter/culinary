export interface IRecipe {
  title: string,
  ingredients: string,
  description: string,
  category: string,
  // id: string
  recipeId: string | undefined
  userId: string
  img: string
  _id: string
}
