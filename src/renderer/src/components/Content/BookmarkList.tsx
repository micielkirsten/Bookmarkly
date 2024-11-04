// src/components/BookmarkList.tsx
import React from 'react';

interface Bookmark {
  _id?: string;
  title: string;
  tags: string;
  url: string;
  notes: string;
}

interface BookmarkListProps {
  bookmarks: Bookmark[];
  onDelete: (id: string) => void;
}

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, onDelete }) => {
  return (
    <div>
      {bookmarks.map((bookmark) => (
        <div key={bookmark._id} className="border-b border-gray-600 py-2">
          <h3 className="font-bold">Title: {bookmark.title}</h3>
          <p>tags: {bookmark.tags}</p>
          <p>url: {bookmark.url}</p>
          <p>notes: {bookmark.notes}</p>
          <button onClick={() => onDelete(bookmark._id!)} className="text-red-500">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookmarkList;