import React, { useState } from 'react';

interface NewBookmarkFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookmarkData: { title: string; tags: string; url: string; notes: string }) => void;
}

const NewBookmarkForm: React.FC<NewBookmarkFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
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
    <div className="fixed inset-0 bg-blue-200 bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-8 border-2 border-blue-300 rounded-lg w-full max-w-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
              className="bg-blue-50 border border-blue-300 col-span-1 p-3 rounded focus:outline-none focus:ring focus:ring-blue-400 placeholder-gray-500 text-gray-800"
            />
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags"
              className="bg-blue-50 border border-blue-300 col-span-1 p-3 rounded focus:outline-none focus:ring focus:ring-blue-400 placeholder-gray-500 text-gray-800"
            />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL"
              required
              className="bg-blue-50 border border-blue-300 col-span-1 p-3 rounded focus:outline-none focus:ring focus:ring-blue-400 placeholder-gray-500 text-gray-800"
            />
          </div>
          <div className="relative">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              className="bg-blue-50 border border-blue-300 w-full p-3 rounded h-36 focus:outline-none focus:ring focus:ring-blue-400 placeholder-gray-500 text-gray-800"
            />
            <button
              type="button"
              onClick={() => setNotes('')}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Export from browser/clipboard"
              className="bg-blue-50 border border-blue-300 col-span-2 p-3 rounded focus:outline-none focus:ring focus:ring-blue-400 placeholder-gray-500 text-gray-800"
            />
            <input
              type="number"
              placeholder="Paragraph #"
              className="bg-blue-50 border border-blue-300 col-span-1 p-3 rounded focus:outline-none focus:ring focus:ring-blue-400 placeholder-gray-500 text-gray-800"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition focus:outline-none focus:ring focus:ring-blue-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition focus:outline-none focus:ring focus:ring-blue-400"
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
