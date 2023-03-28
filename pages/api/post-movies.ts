// pages/api/add-movies.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Db } from 'mongodb';
// movie.ts
interface Movie {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    genre: string;
    duration: string;
}

const movies: Movie[] = [
    {
        "title": "Big Buck Bunny",
        "description": "Three rodents amuse themselves by harassing creatures of the forest. However, when they mess with a bunny, he decides to teach them a lesson.",
        "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png",
        "genre": "Comedy",
        "duration": "10 minutes"
    },
    {
        "title": "Sintel",
        "description": "A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales. But when he is kidnapped by an adult dragon, Sintel decides to embark on a dangerous quest to find her lost friend Scales.",
        "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        "thumbnailUrl": "http://uhdtv.io/wp-content/uploads/2020/10/Sintel-3.jpg",
        "genre": "Adventure",
        "duration": "15 minutes"
    },
    {
        "title": "Tears of Steel",
        "description": "In an apocalyptic future, a group of soldiers and scientists takes refuge in Amsterdam to try to stop an army of robots that threatens the planet.",
        "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        "thumbnailUrl": "https://mango.blender.org/wp-content/uploads/2013/05/01_thom_celia_bridge.jpg",
        "genre": "Action",
        "duration": "12 minutes"
    },
    {
        "title": "Elephant's Dream",
        "description": "Friends Proog and Emo journey inside the folds of a seemingly infinite Machine, exploring the dark and twisted complex of wires, gears, and cogs, until a moment of conflict negates all their assumptions.",
        "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        "thumbnailUrl": "https://download.blender.org/ED/cover.jpg",
        "genre": "Sci-Fi",
        "duration": "15 minutes"
    }
]


async function importMovies(movies: Movie[], db: Db) {
    const collection = db.collection<Movie>('Movie');

    return await collection.insertMany(movies);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            res.status(405).json({ message: 'Method not allowed' });
            return;
        }

        const db = await connectToDatabase(); // Add the missing 'await' here
        const result = await importMovies(movies, db);

        res.status(200).json({ message: `${result.insertedCount} movies added successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Error connecting to the database' });
    }
}