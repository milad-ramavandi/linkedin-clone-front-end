import React from 'react'
import PostFeed from '../post-feed'
import { Post } from '@/types/post'

const PostsFeed = async() => {
  const res = await fetch(`${process.env.NEXT_URL}posts`)
  const posts:Post[] = await res.json()
  return (
    <div className="space-y-2 pb-20">
      {posts?.slice(0).reverse().map(item => <PostFeed key={item.id} {...item}/>)}
    </div>
  )
}

export default PostsFeed