import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"

import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";


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


const Profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Who is Watching?</h1>
        <div className="flex items-center justify-center gap-6 mt-10">
          <div onClick={() => router.push('/')}>
            <div className="group flex-row w-44 mx-auto">
              <div
                className="
                        w-44
                        h-44
                        rounded-md
                        flex
                        items-center
                        justify-center
                        border-2
                        border-transparent
                        group-hover:cursor-pointer
                        group-hover:border-white
                        overflow-hidden
                        ">
                {/* Group hover means that when u hover over the parent div with 'group' class, 
                          it applies the following styles (cursor-pointer, border-white)*/}
                <img src="/images/default-red.png" alt="Profile" />
              </div>
              <div
                className="
                          mt-4
                          text-gray-400
                          text-2xl
                          text-center
                          group-hover:text-white
                        ">
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profiles;