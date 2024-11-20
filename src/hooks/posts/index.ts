'use client'

import { useQuery } from 'react-query'

const useGetPosts = () => {
  return useQuery({
    queryKey:'get-posts',
    queryFn: async () => await fetch(`${process.env.NEXT_URL}posts`).then(res => res.json())
  })
}

export default useGetPosts