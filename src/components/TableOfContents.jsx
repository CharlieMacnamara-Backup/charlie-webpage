'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TableOfContents({ className = '' }) {
  const [headings, setHeadings] = useState([]);

  // Simple effect to extract headings on component mount
  useEffect(() => {
    // Find headings after a short delay to ensure content is rendered
    const timer = setTimeout(() => {
      const articleElement = document.querySelector('article');
      
      if (!articleElement) return;
      
      // Get all h2 and h3 headings, exclude any "Table of Contents" heading
      const elements = Array.from(articleElement.querySelectorAll('h2, h3'))
        .filter(element => element.textContent.trim().toLowerCase() !== 'table of contents')
        .map(element => {
          // Add ID if missing
          if (!element.id) {
            const id = element.textContent
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-');
            element.id = id;
          }
          
          return {
            id: element.id,
            text: element.textContent,
            level: element.tagName === 'H2' ? 2 : 3,
          };
        });
      
      setHeadings(elements);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={`my-8 rounded-xl border border-zinc-200 bg-white dark:border-zinc-700/40 dark:bg-zinc-900/70 ${className}`}>
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700/40 dark:bg-zinc-800/70">
        <h3 className="font-semibold text-zinc-700 dark:text-zinc-300">Table of Contents</h3>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li 
              key={heading.id}
              className={`${heading.level === 3 ? 'ml-4' : ''} text-zinc-700 dark:text-zinc-300`}
            >
              <Link
                href={`#${heading.id}`}
                className="hover:text-blue-700 dark:hover:text-blue-300 block py-1 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start' 
                  });
                }}
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 