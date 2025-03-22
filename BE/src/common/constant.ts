export const JWT_REFRESH_TOKEN = 'jwt-refresh-token';

export const OPENAI_BASE_URL = 'https://openrouter.ai/api/v1'
export const GURUAI_BASE_URL = 'https://aigurulab.tech'

export const OPEN_MODEL_AI = 'google/gemini-2.0-pro-exp-02-05:free'
export const GURU_MODEL_AI = 'sdxl'


export const GENERATE_RECIPE_OPTION_PROMPT = ':Depends on user instruction create 3 different Recipe varient with Recipe Name with Emoji, 2 line description and main ingredient list in JSON format with field recipeName, description, ingredients (without size) only'

export const GENERATE_COMPLETE_RECIPE_PROMPT =`
  - As per recipe Name and Description, Give me all list of ingredients as ingredient,
  - emoji icons for each ingredient as icon, quantity as quantity, along with detail step by step recipe as steps
  - Total Calories as calories (only number), Minutes to cook as cookTime and serving number to serveTo
  - relastic image Text prompt as per recipe as imagePrompt
  - Give me response in JSON format only`