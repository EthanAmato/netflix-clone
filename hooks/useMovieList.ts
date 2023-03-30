import useSWR from 'swr';
import Fetcher from '@/lib/fetcher';

const useMovieList = () => {
    const {data, error, isLoading} = useSWR('/api/movies', Fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }) 

    return {
        data,
        error,
        isLoading
    }
}

export default useMovieList