'use client'
import React from 'react'
import PostFeed from '../post-feed'
import { Post } from '@/types/post'
import useGetPosts from '@/hooks/posts'

const PostsFeed = () => {
  const {data} = useGetPosts();
  return (
    <div className="space-y-2 pb-20">
      {data?.slice(0).reverse().map((item:Post) => <PostFeed key={item.id} {...item}/>)}
    </div>
  )
}

export default PostsFeed