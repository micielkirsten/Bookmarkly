import React, { useState } from 'react';

interface NewBookmarkFormProps {
  // Controls whether the form is open or not
  isOpen: boolean;
  
  // Function to close the form
  onClose: () => void;
  
  // Function to handle form submission and pass bookmark data to parent component (App.tsx)
  onSubmit: (bookmarkData: { title: string; tags: string; url: string; notes: string }) => void;
}

// Component for the form that collects data to create a new bookmark.
const NewBookmarkForm: React.FC<NewBookmarkFormProps> = ({ isOpen, onClose, onSubmit }) => {
  // State variables to store the input values for the bookmark data (title, tags, URL, notes).
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');


  // Handle form submission.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Pass the collected bookmark data (title, tags, URL, notes) to the onSubmit function.
    // The onSubmit function is provided by the parent component (NewBookmarkButton),
    // which will then handle sending this data to the main process for saving to the database.
    onSubmit({ title, tags, url, notes });

    // Clear the form fields after submission.
    setTitle('');
    setTags('');
    setUrl('');
    setNotes('');

    // Close the form after submission.
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
              required
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
              required
              className="bg-[rgba(42,42,42,255)] border-2 border-[rgba(71,71,71,255)] col-span-1 p-2 rounded"
            />
          </div>
          <div className="relative">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              className="bg-[rgba(42,42,42,255)] border-2 border-[rgba(71,71,71,255)] w-full p-2 rounded h-32"
            />
            <button
              type="button"
              onClick={() => setNotes('')}
              className="absolute top-2 right-2 bg-[rgba(184,76,75,255)] px-2 py-1 rounded text-white"
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
