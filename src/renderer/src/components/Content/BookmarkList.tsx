import React from 'react';

interface BookmarkListProps {
  bookmarks: Bookmark[];
  onDelete: (id: any) => void;
}

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, onDelete }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  
  const handleDelete = (bookmark: Bookmark) => {
    const id = bookmark._doc?._id ?? bookmark._id;
    onDelete(id);
  };

  const generateCitation = (bookmarkData: BookmarkDoc | Bookmark) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let domain = '';
    try {
      domain = new URL(bookmarkData.url).hostname;
    } catch (e) {
      domain = bookmarkData.url;
    }

    return `${bookmarkData.title}. (n.d.). Retrieved ${currentDate}, from ${domain}`;
  };

  const copyToClipboard = async (id: string, citation: string) => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => {
        const bookmarkData: BookmarkDoc | Bookmark = bookmark._doc || bookmark;
        const id = String(bookmarkData._id);
        const citation = generateCitation(bookmarkData);
        
        return (
          <div key={id} className="border-2 border-[rgba(43,43,43,255)] bg-[rgba(31,31,31,255)] p-4 rounded-lg space-y-2">
            <h3 className="font-bold text-lg">{bookmarkData.title}</h3>
            <p className="text-sm">Tags: {bookmarkData.tags}</p>
            <p className="text-sm break-all">URL: {bookmarkData.url}</p>
            <p className="text-sm">Notes: {bookmarkData.notes}</p>
            
            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => handleDelete(bookmark)}
                className="px-4 py-2 bg-[rgba(184,76,75,255)] rounded"
              >
                Delete
              </button>
              
              <button
                onClick={() => copyToClipboard(id, citation)}
                className="px-4 py-2 bg-[rgba(87,89,93,255)] rounded flex items-center gap-2"
              >
                Generate Citation
              </button>
            </div>

            {copiedId === id && (
              <div className="mt-2 bg-[rgba(42,42,42,255)] border-2 border-[rgba(71,71,71,255)] p-2 rounded">
                Citation copied to clipboard!
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookmarkList;