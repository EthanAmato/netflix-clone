import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).end()

    try {
        //all we need to do to see if user is logged in
        await serverAuth(req);

        const movieCount = await prismadb.movie.count();

        const randomIndex = Math.floor(Math.random() * movieCount);

        //only find 1 movie and skip random number of indices to get it
        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        });
        //randomMovies returns an array so we only want the one movie inside
        return res.status(200).json(randomMovies[0]);

    } catch(error) {
        console.log(error)
        return res.status(400).end()
    }


}