
//package is used for fetching data
//special because if the data already exists, it won't send another
//request
import useSWR from 'swr';

import Fetcher from '@/lib/fetcher';

const useCurrentUser = () => {
    const {data, error, isLoading, mutate} = useSWR('/api/current', Fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useCurrentUser;