'use client'

import { useQuery } from 'react-query'

const useGetPosts = () => {
  return useQuery({
    queryKey:['posts'],
    queryFn: async () => await fetch(`${process.env.AUTH_NEXT_URL}posts`).then(res => res.json())
  })
}

export default useGetPosts