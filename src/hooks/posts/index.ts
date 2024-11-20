'use client'

import { useQuery } from 'react-query'

const useGetPosts = () => {
  return useQuery({
    queryKey:'get-posts',
    queryFn: async () => await fetch(`http://localhost:8000/posts`).then(res => res.json())
  })
}

export default useGetPosts