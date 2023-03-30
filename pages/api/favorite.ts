import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";


//Function for adding and removing a movie to/from a user's favorite property
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {

            //get current user
            const { currentUser } = await serverAuth(req);

            //post request will contain a movieID that the user wants to add to favorites
            const { movieId } = req.body;

            //get the movie associated with the id
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            });

            if (!existingMovie) {
                throw new Error("Invalid ID")
            }


            const user = await prismadb.user.update({
                where: { //update the db entry where email === currentUser's email
                    email: currentUser.email || '',
                },
                data: { //and update it 
                    favoriteIds: { //at favoriteIds
                        push: movieId //by pushing the following data (movieId)
                    }
                }
            })
            return res.status(200).json(user);
        }

        if (req.method === "DELETE") {
            const { currentUser } = await serverAuth(req);
            const { movieId } = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            })

            if(!existingMovie) {
                throw new Error("Invalid ID")
            }

            //make an array that mimics currentUser.favoriteIds WITHOUT movieId
            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId)
            
            //Actually update the user with the decreased favId array in DB
            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: updatedFavoriteIds
                }
            })

            return res.status(200).json(updatedUser);
        }

        return res.status(405).end()
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}