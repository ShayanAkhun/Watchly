import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React,{useEffect, useState} from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'
import { updatesearchCount } from '@/services/appwrite'




const Search = () => {
   const [searchQuery, setSearchQuery] = useState('')
    const { data: movies,refetch:loadMovies, loading, error ,reset} = useFetch(() => fetchMovies({
        query: searchQuery
      }),false)

      useEffect(()=> {
    updatesearchCount(searchQuery, movies[0])
        const timeoutId = setTimeout( async() => {
            if(searchQuery.trim()) {
                await loadMovies()
            } else {
                reset
            }
        },500)
        return ()=> clearTimeout(timeoutId)
        }, [searchQuery])
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
            ListEmptyComponent={
                !loading && !error ? (
                    <View className='mt-10 px-5'>
                        <Text className='text-center text-gray-500'>
                            {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
                        </Text>
                    </View>
                ) : null
            }
        />
    </View>
  )
}

export default Search
