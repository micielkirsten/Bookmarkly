import React from 'react';

interface BookmarkListProps {
  bookmarks: Bookmark[];
  onDelete: (id: any) => void;
}

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, onDelete }) => {
  const handleDelete = (bookmark: Bookmark) => {
    const id = bookmark._doc?._id ?? bookmark._id;
    onDelete(id);
  };

  return (
    <div>
      {bookmarks.map((bookmark) => {
        const bookmarkData: BookmarkDoc | Bookmark = bookmark._doc || bookmark;
        const id = bookmarkData._id;
        
        return (
          <div key={String(id)} className="border-b border-gray-600 py-2">
            <h3 className="font-bold">Title: {bookmarkData.title}</h3>
            <p>tags: {bookmarkData.tags}</p>
            <p>url: {bookmarkData.url}</p>
            <p>notes: {bookmarkData.notes}</p>
            <button 
              onClick={() => handleDelete(bookmark)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default BookmarkList;