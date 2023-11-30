import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useApartmentItem = () => {
    const axiosPublic = useAxiosPublic();
    const {data: apartmentItem = [], isPending: loading, refetch} = useQuery({
        queryKey: ['apartmentItem'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/apartments')
            return res.data;
        }
    })
    return [apartmentItem, loading,refetch];
}

export default useApartmentItem;