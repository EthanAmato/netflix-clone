import { PrismaClient } from "@prisma/client";
// The purpose of this code is to create a single instance of the PrismaClient class 
// that can be reused across multiple modules in the application. By creating a global 
// variable, the application avoids the overhead of creating a new instance of the PrismaClient 
// class every time it needs to interact with the database. In addition, in production mode, it 
// ensures that only one instance of the PrismaClient class is created and reused across the entire 
// application, which can help to improve performance and reduce memory usage.


//Do this because of hotreloading in NextJS - everytime we make a change, this code will rerun
//we write this code to save the prismaclient in a global file (which is apparently not affected by hot reloading)
//to prevent prisma from making many instances of the client
const client = global.prismadb || new PrismaClient();
//in production this last issue doesn't matter
if(process.env.NODE_ENV === 'production') global.prismadb = client;

export default client
