import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"

import useCurrentUser from "@/hooks/useCurrentUser";


export async function getServerSideProps(context: NextPageContext) {
  //fetch our session on the client side
  const session = await getSession(context);

  //If we're not logged in, it's going to redirect us to /auth
  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {

  const {data: user} = useCurrentUser()

  return (
    <>
      <h1 className="text-5xl text-green-500">Hello World</h1>
      <p className="text-white">Logged in as {user?.name}</p>
      <p className="text-white">Logged in as {user?.email}</p>
      <button className="h10 w-full bg-white" onClick={() => signOut()}>Logout</button>
    </>
  )
}
