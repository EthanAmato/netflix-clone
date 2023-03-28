import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"

import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/navbar";
import Billboard from "@/components/billboard";


export async function getServerSideProps(context: NextPageContext) {
  //fetch our session on the client side
  const session = await getSession(context);

  //If we're not logged in, it's going to redirect us to /auth
  if (!session) {
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

  const { data: user } = useCurrentUser()

  return (
    <>
      <Navbar />
      <Billboard />
    </>
  )
}
