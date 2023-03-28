import useSwr from 'swr';
import Fetcher from '@/lib/fetcher';

const useBillboard = () => {
    //swr has options on how it will retrieve data from api
    const { data, error, isLoading } = useSwr('/api/random', Fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    return {
        data,
        error,
        isLoading
    }
};

export default useBillboard;