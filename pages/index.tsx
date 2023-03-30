import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"

import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/navbar";
import Billboard from "@/components/billboard";
import MovieList from "../components/movieList";
import useMovieList from "@/hooks/useMovieList";


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
  //by default data (renamed to movies) is empty array but we replace it with hook return val 
  const {data: movies = []} = useMovieList()
  const { data: user } = useCurrentUser()

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
      </div>
    </>
  )
}
