'use client'
import { Post } from '@/types/post'
import React from 'react'
import CommentFeed from '../comment-feed'

const CommentsFeed = ({post}: {post:Post}) => {
  return (
    <div className={'space-y-2 h-52 overflow-auto scrollbar-hide'}>
      {post.comments?.slice(0).reverse().map(item => <CommentFeed key={item.id} {...item}/>)}
    </div>
  )
}

export default CommentsFeed