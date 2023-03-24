import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // in order to register we need to get a POST request
    // with data to log to our db, otherwise it's a bad request
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { email, name, password } = req.body;
        console.log(name)
        //check if email has already been taken
        const existingUser=  await prismadb.user.findUnique({
            where: {
                email,
            }
        })
        if(existingUser) {
            return res.status(422).json({error: 'Email Taken'})
        }

        //bcrypt.hash is an async function so use await
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date()
            }
        })
        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}