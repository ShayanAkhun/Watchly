import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React,{useState} from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'


const Search = () => {
   const [searchQuery, setSearchQuery] = useState('')
    const { data: movies, loading, error } = useFetch(() => fetchMovies({
        query: searchQuery
      }),false)
  return (
    <View className='bg-primary flex-1'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover' />
        <FlatList data={movies}
            renderItem={({item})=> <MovieCard {...item}/>}
            keyExtractor={(item) => item.id.toString()}
            className='px-5'
            numColumns={3}
            columnWrapperStyle={{
                justifyContent: "center",
                gap: 16,
                marginVertical:16
            }}
            contentContainerStyle={{paddingBottom: 100}}
            ListHeaderComponent={
                <>
                    <View className='w-full flex-row justify-center mt-20 items-center'>
                        <Image source={icons.logo} className='w-12 h-10'/>
                    </View>
                    <View className='my-5'>
                        <SearchBar
                        placeholder='Search for movies...'
                        value={searchQuery}
                        onChangeText={(text : string)=> setSearchQuery(text)}
                        />
                    </View>
                    {
                        loading && (
                            <ActivityIndicator size="large" className='my-3' color="#0000ff"/>
                        )
                    }
                    {
                        error && (
                            <Text className='text-red-500 px-5 py-3'>
                                Error : {error.message}
                            </Text>
                        )
                    }
                    {
                        !loading && !error  && searchQuery.trim() &&  movies?.length > 0 &&
                        (
                        <Text className='text-xl text-accent font-bold'>
                            Search results for {" "}
                            <Text className="text-accent">{searchQuery}</Text>
                        </Text>)
                    }
                </>
            }
        />
    </View>
  )
}

export default Search
