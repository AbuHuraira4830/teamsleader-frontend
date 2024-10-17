import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';

const TableOfContents = () => {
  const [editorData, setEditorData] = useState('');
  const [tableOfContents, setTableOfContents] = useState([]);

  useEffect(() => {
    const parsedHtml = parse(editorData);
    const headings = parsedHtml.querySelectorAll('h1, h2, h3, h4, h5, h6');

    const toc = [];
    headings.forEach((heading) => {
      const id = `heading-${heading.tagName.toLowerCase()}-${toc.length}`;
      heading.id = id;
      toc.push({
        text: heading.textContent,
        id,
        level: parseInt(heading.tagName.replace('H', '')),    
      });
    });

    setTableOfContents(toc);
  }, [editorData]);

  const handleToCLinkClick = (event) => {
    event.preventDefault();
    const headingId = event.target.getAttribute('href').replace('#', '');
    const headingElement = document.getElementById(headingId);
    if (headingElement) {
      headingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <h2>Table of Contents</h2>
      <ul>
        {tableOfContents.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={handleToCLinkClick}>
              {item.text}
            </a>
          </li>   
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;