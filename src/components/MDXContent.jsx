'use client';

import { memo, useEffect, useRef } from 'react'

export const MDXContent = memo(function MDXContent({ children }) {
  const contentRef = useRef(null);

  // After render, add IDs to headings for the table of contents
  useEffect(() => {
    if (!contentRef.current) return;

    const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    headings.forEach(heading => {
      // If the heading doesn't have an ID, generate one from the text content
      if (!heading.id) {
        const id = heading.textContent
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')  // Remove special characters
          .replace(/\s+/g, '-')      // Replace spaces with hyphens
          .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
          
        heading.id = id;
      }
      
      // Add ARIA attributes for better accessibility
      heading.setAttribute('tabindex', '-1');
      
      // Add a click handler to make the URL fragment updatable
      heading.addEventListener('click', () => {
        // Update the URL without scrolling (we're already there)
        history.replaceState(null, null, `#${heading.id}`);
      });
    });
    
    // Check if there's a hash in the URL and scroll to that element
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="prose dark:prose-invert" ref={contentRef}>
      {children}
    </div>
  )
}) 