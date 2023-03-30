import React from "react"
// Lodash is a JavaScript library which provides utility functions for 
// common programming tasks using the functional programming paradigm
import {isEmpty} from 'lodash';
import MovieCard from "./movieCard";

interface MovieListProps {
    data: Record<string, any>[];
    title: string;
}

const MovieList = ({data, title}: MovieListProps) => {
    //if no movies, no movie list
    if(isEmpty(data)) return null

    return (
        <div className="px-4 mt-4 space-y-8 md:px-12">
            <div>
                <p className="font-semibold text-white text-md md:text-xl lg:text-2xl">{title}</p>
                <div className="grid grid-cols-4 gap-2">
                    {data.map((movie)=> {
                        return(
                            <MovieCard key={movie.id} data={movie}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default MovieList