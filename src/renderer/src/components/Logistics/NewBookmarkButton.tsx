import React, { useState } from 'react';
import { ActionButton, ActionButtonProps } from '@/components';
import { LuFileSignature } from 'react-icons/lu';
import NewBookmarkForm from './NewBookmarkForm';

interface NewBookmarkButtonProps extends ActionButtonProps {
  onAddBookmark: (bookmarkData: {
    title: string;
    tags: string;
    url: string;
    notes: string;
  }) => Promise<void> | void;
}

export const NewBookmarkButton: React.FC<NewBookmarkButtonProps> = ({ onAddBookmark, ...props }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleButtonClick = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = async (bookmarkData: {
    title: string;
    tags: string;
    url: string;
    notes: string;
  }) => {
    try {
      setIsSubmitting(true);
      const cleanBookmarkData = {
        title: bookmarkData.title.trim(),
        tags: bookmarkData.tags.trim(),
        url: bookmarkData.url.trim(),
        notes: bookmarkData.notes.trim()
      };
      
      await onAddBookmark(cleanBookmarkData);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error adding bookmark:', error);
    } finally {
      setIsSubmitting(false);
    }
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