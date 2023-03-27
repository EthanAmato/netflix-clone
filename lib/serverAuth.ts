import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb";



const serverAuth = async (req: NextApiRequest) => {
    //getSession will retrieve the session from the JWT which we can use to get the logged
    //in user
    const session = await getSession({ req })

    if (!session?.user?.email) {
        throw new Error("Not Signed In");
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    console.log(currentUser)

    if (!currentUser) {
        throw new Error("Not Signed In");
    }

    return { currentUser };

}

export default serverAuth;