import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";


//Function for getting a user's list of favorite movies
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end()
    }

    try {
        const { currentUser } = await serverAuth(req);

        //find as many movie Ids as possible that are inside of the currentUser's fav list
        const favoritedMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds,
                }
            }
        });
        
        return res.status(200).json(favoritedMovies);
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }


}