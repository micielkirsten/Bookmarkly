import React, { useState } from 'react';
import { ActionButton, ActionButtonProps } from '@/components';
import { LuFileSignature } from 'react-icons/lu';
import NewBookmarkForm from './NewBookmarkForm';

export const NewBookmarkButton = ({...props}: ActionButtonProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleButtonClick = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = (bookmarkData) => {
    //storing for handle submit for later 
    console.log('New bookmark:', bookmarkData);
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