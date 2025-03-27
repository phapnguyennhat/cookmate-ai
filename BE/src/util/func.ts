export const get_complete_recipe_prompt = (categoryListString: string[])=>{
  return `
  - As per recipe Name and Description, Give me all list of ingredients as ingredient,
  - emoji icons for each ingredient as icon, quantity as quantity, along with detail step by step recipe as steps
  - Total Calories as calories (only number), Minutes to cook as cookTime and serving number to serveTo
  - relastic image Text prompt as per recipe as imagePrompt
  - Give me category List for recipe from ${JSON.stringify(categoryListString)} as category
  - Give me response in JSON format only`
} 

export function extractBrackets(str: string): string | null {
  let start = str.indexOf('[');
  let end = str.lastIndexOf(']');

  if (start !== -1 && end !== -1) {
    return str.substring(start, end + 1);
  }
  return null;
}

export function extractBraces(str: string) {
  let start = str.indexOf('{');
  let end = str.lastIndexOf('}');
  if (start !== -1 && end !== -1) {
    return str.substring(start, end + 1);
  }
  return null;
}