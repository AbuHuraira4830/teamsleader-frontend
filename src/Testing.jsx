import React, { useState, useEffect } from "react";

const Testing = () => {
  const [pages, setPages] = useState([[]]); // Initialize with one empty page
  const [blocks, setBlocks] = useState([]);
  const pageHeight = 400; // Height of each page

  const handleCreateText = () => {
    const newBlock = { id: Date.now(), height: 40, type: "text", content: "" };
    addBlockToPages(newBlock);
  };

  const handleCreateImage = () => {
    const newBlock = { id: Date.now(), height: 0, type: "image", file: null };
    addBlockToPages(newBlock);
  };

  const addBlockToPages = (newBlock) => {
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    setPages((prevPages) => {
      const newPages = [...prevPages];
      let currentPage = newPages[newPages.length - 1];
      let currentPageHeight = currentPage.reduce(
        (acc, block) => acc + block.height,
        0
      );

      if (currentPageHeight + newBlock.height > pageHeight) {
        newPages.push([newBlock]);
      } else {
        currentPage.push(newBlock);
      }

      return newPages;
    });
  };

  const handleTextareaChange = (e, id) => {
    const newHeight = e.target.scrollHeight;
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id
          ? { ...block, height: newHeight, content: e.target.value }
          : block
      )
    );
    updatePageBlocks(id, { height: newHeight, content: e.target.value });
  };

  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      setBlocks((prevBlocks) =>
        prevBlocks.map((block) =>
          block.id === id ? { ...block, file, height: 100 } : block
        )
      );
      updatePageBlocks(id, { file, height: 100 });
    }
  };

  const updatePageBlocks = (id, updates) => {
    setPages((prevPages) => {
      const newPages = [...prevPages];
      for (let page of newPages) {
        for (let block of page) {
          if (block.id === id) {
            Object.assign(block, updates);
            return newPages;
          }
        }
      }
      return newPages;
    });
  };

  useEffect(() => {
    setPages((prevPages) => {
      const newPages = [[]];
      for (let block of blocks) {
        let currentPage = newPages[newPages.length - 1];
        let currentPageHeight = currentPage.reduce(
          (acc, b) => acc + b.height,
          0
        );

        if (currentPageHeight + block.height > pageHeight) {
          newPages.push([block]);
        } else {
          currentPage.push(block);
        }
      }
      return newPages;
    });
  }, [blocks]);

  return (
    <div className="h-auto overflow-scroll">
      <button onClick={handleCreateText} className="m-2 rounded border p-2">
        CreateText
      </button>
      <button onClick={handleCreateImage} className="m-2 rounded border p-2">
        CreateImage
      </button>
      <div className="flex flex-col bg-gray-200  p-5 overflow-scroll">
        {pages.map((page, pageIndex) => (
          <div key={pageIndex} className="bg-white h-[1123px] p-4">
            {page.map((block, blockIndex) => (
              <div key={block.id}>
                {block.type === "text" ? (
                  <textarea
                    className="w-full h-10 border outline-none shadow-none"
                    style={{ height: block.height }}
                    value={block.content}
                    onChange={(e) => handleTextareaChange(e, block.id)}
                    rows={1}
                  />
                ) : block.type === "image" ? (
                  <div className="w-full">
                    {!block.file && (
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, block.id)}
                      />
                    )}
                    {block.file && (
                      <img
                        src={URL.createObjectURL(block.file)}
                        alt="Uploaded"
                        className="w-full mt-2"
                      />
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testing;
