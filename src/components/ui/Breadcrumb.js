// components/ui/Breadcrumb.js

import React from 'react';
import Link from 'next/link';

const Breadcrumb = ({ items }) => {
    return (
        <nav className="text-gray-700 text-sm my-4">
            <ul className="flex">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && <span className="mx-2 text-gray-300">/</span>} {/* Separator */}
                        {item.url ? (
                            <Link href={item.url} className="text-gray-700">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="font-bold" dangerouslySetInnerHTML={{ __html: item.label }} />  // Active or current item
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumb;
