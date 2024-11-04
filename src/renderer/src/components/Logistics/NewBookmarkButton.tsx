import React, { useState } from 'react';
import { ActionButton, ActionButtonProps } from '@/components';
import { LuFileSignature } from 'react-icons/lu';
import NewBookmarkForm from './NewBookmarkForm';


// Define the props for NewBookmarkButton, including a function prop (onAddBookmark) 
// to handle adding the bookmark. This function will send the bookmark data to the 
// main process through the database connection.
interface NewBookmarkButtonProps extends ActionButtonProps {
  onAddBookmark: (bookmarkData: { title: string; tags: string; url: string; notes: string }) => void;
}

// Component to render the button that opens a form for creating a new bookmark.
// It manages the state to show/hide the form and passes the bookmark data to the parent component (App.tsx) via onAddBookmark.
export const NewBookmarkButton: React.FC<NewBookmarkButtonProps> = ({ onAddBookmark, ...props }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleButtonClick = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  // Handle the form submission by passing the bookmark data to the onAddBookmark function, 
  // which will trigger saving the bookmark to the database via the main process.
  const handleFormSubmit = (bookmarkData: { title: string; tags: string; url: string; notes: string }) => {
    onAddBookmark(bookmarkData);
    setIsFormOpen(false);
  };

  return (
    <>
      <ActionButton {...props} onClick={handleButtonClick}>
        <LuFileSignature className="w-4 h-4 text-zinc-300" />
      </ActionButton>
      <NewBookmarkForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
    </>
  );
};
