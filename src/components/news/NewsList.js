import React from 'react';
import NewsCard from './NewsCard';

const NewsList = ({ news }) => {
    return (
        <div className="space-y-6 mt-8">
            {news.map(post => (
                <NewsCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default NewsList;
