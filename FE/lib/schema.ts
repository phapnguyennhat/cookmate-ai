import {z} from 'zod'


export const loginSchema = z.object({
    account: z.string({message: 'Account is required'}).min(1, 'Account is required'),
    password: z.string({message: 'Password is required'}).min(1, 'Password is required'),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const createRecipeSchema = z.object({
    recipeName: z.string({message: 'Recipe name is required'}).min(1, 'Recipe name is required'),  
    description: z.string({message: 'Description is required'}).min(1, 'Description is required'),  
    ingredients: z.array(z.object({
        ingredient: z.string({message: 'Ingredient is required'}).min(1, 'Ingredient is required'),
        icon: z.string({message: 'Icon is required'}).min(1, 'Icon is required'),
        quantity: z.string({message: 'Quantity is required'}).min(1, 'Quantity is required'),
    }), {message: 'Ingredients is required'}).min(1, 'Ingredients is required'),
    steps: z.array(z.string({message: 'Step is required'}).min(1, 'Step is required'), {message: 'Steps is required'}).min(1, 'Steps is required'),
    calories: z.number({message: 'Calories is required'}),
    cookTime: z.number({message: 'Cook time is required'}),
    serveTo: z.number({message: 'Serve to is required'}),
    imagePrompt: z.string({message: 'Image prompt is required'}).min(1, 'Image prompt is required'),
    });

export type CreateRecipeForm = z.infer<typeof createRecipeSchema>;
    