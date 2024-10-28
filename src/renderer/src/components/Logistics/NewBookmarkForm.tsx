import React, { useState } from 'react';

const NewBookmarkForm = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, tags, url, notes });
    setTitle('');
    setTags('');
    setUrl('');
    setNotes('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[rgba(31,31,31,255)] p-6 border-2 border-[rgba(43,43,43,255)] rounded-lg w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="bg-[rgba(42,42,42,255)] border-2 border-[rgba(71,71,71,255)] col-span-1 p-2 rounded"
            />
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags"
              className="bg-[rgba(42,42,42,255)] border-2 border-[rgba(71,71,71,255)] col-span-1 p-2 rounded"
            />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL"
              className="bg-[rgba(42,42,42,255)] border-2 border-[rgba(71,71,71,255)] col-span-1 p-2 rounded"
            />
          </div>
          <div className="relative">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              className="bg-[rgba(42,42,42,255)] border-2 border-[rgba(71,71,71,255)] w-full p-2 border rounded h-32"
            />
            <button
              type="button"
              onClick={() => setNotes('')}
              className="absolute top-2 right-2 bg-[rgba(184,76,75,255)] px-2 py-1 rounded"
            >
              Delete
            </button>
            <button
              type="button"
              className="absolute bottom-4 right-2 bg-gray-200 text-black px-2 py-1 rounded"
            >
              +
            </button>
          </div>
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="Export from browser/clipboard"
              className="bg-[rgba(42,42,42,255)] border-2 border-[rgba(71,71,71,255)] w-2/3 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Paragraph #"
              className="bg-[rgba(42,42,42,255)] border-2 border-[rgba(71,71,71,255)] w-1/4 p-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[rgba(87,89,93,255)] rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save Bookmark
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBookmarkForm;