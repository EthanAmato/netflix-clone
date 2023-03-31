import axios from "axios";
import React, { useCallback, useMemo } from 'react'
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoritebuttonProps {
    movieId: string
}

const FavoriteButton = ({ movieId }: FavoritebuttonProps) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();
    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        //boolean value that checks if a movieId is in currentUser's favIds
        return list.includes(movieId)
    }, [currentUser, movieId])

    //callback function called to add or remove a movie from the currentUser's 
    //favoriteIds 
    const toggleFavorites = useCallback(async () => {
        let response;
        //if it is in the user's fav movies, remove it using the delete endpoint in /api/favorite
        if (isFavorite) {
            //have to put { data: {movieId} } for axios delete
            response = await axios.delete('/api/favorite', { data: { movieId } });
        } else {
            //no need for explicit {data: {movieId}} in axios post requests 
            response = await axios.post('/api/favorite',  { movieId } );
        }

        // update movies according to whatever the prior axios request was
        const updatedFavoriteIds = response?.data?.favoriteIds;

        //officially update state of user using mutate
        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        });

        //refreshes favorites (?)
        mutateFavorites()
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus


    return (
        <div className="flex items-center justify-center w-6 h-6 transition border-2 border-white rounded-full cursor-pointer group/item lg:w-10 lg:h-10 hover:border-natural-300"
            onClick={toggleFavorites}
        >
            <Icon className="text-white" size={30} />
        </div>
    )
}


export default FavoriteButton