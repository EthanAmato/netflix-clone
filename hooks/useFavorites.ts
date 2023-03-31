import useSWR from 'swr';
import Fetcher from '@/lib/fetcher';

//get a list of the favorite ids
const useFavorites = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/favorites', Fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    
    return { data, error, isLoading, mutate }
}

export default useFavorites