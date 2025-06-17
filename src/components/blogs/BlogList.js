import React from 'react';
import BlogCard from './BlogCard';

const BlogList = ({ blogs }) => {
    return (
        <div className="space-y-6 mt-8">
            {blogs.map(post => (
                <BlogCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default BlogList;
