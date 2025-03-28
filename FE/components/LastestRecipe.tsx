import React from 'react'
import { FlatList, Text, View } from 'react-native'
import RecipeCardHome from './RecipeCardHome'
import { useFindRecipe } from '@/hook/recipe'

export default function LastestRecipe() {
  const {recipes, isLoading, refetch} = useFindRecipe({createAt: 'desc'})
  
  return (
   <View className=' mt-[20px] mb-[40px]' >
    <Text className=' font-outfit-bold text-[20px]' >Lastest recipes</Text>

    <FlatList
      showsHorizontalScrollIndicator={false}
      data={recipes}
      horizontal
      renderItem={({item,index})=>(
        <View>
          <RecipeCardHome recipe={item}/>
        </View>
      )}
    />
   </View>
  )
}
