import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //if request isn't asking for info, they're sending it to the wrong place
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    try {

        //no need for more error checking of whether we are logged in bc that's all
        //handled in the serverAuth function
        const { currentUser } = await serverAuth(req)
        return res.status(200).json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}