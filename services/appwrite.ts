
import {Client, Databases, Query} from "react-native-appwrite"

const DATABASE_ID=process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTIONS_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTIONS_ID!;


const client = new Client()
.setEndpoint('https://fra.cloud.appwrite.io/v1')
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database  = new Databases(client)

export const updatesearchCount = async (query: string, movie : Movie) => {
    const result = await database.listDocuments(DATABASE_ID, COLLECTIONS_ID,[
        Query.equal('searchTerm', query)
    ])
    console.log(result)
}
