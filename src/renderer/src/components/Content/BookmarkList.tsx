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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {bookmarks.map((bookmark) => {
        const bookmarkData: BookmarkDoc | Bookmark = bookmark._doc || bookmark;
        const id = String(bookmarkData._id);
        const citation = generateCitation(bookmarkData);
        
        return (
          <div key={id} className="border border-blue-300 bg-white p-2 rounded-md space-y-1 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-bold text-sm text-blue-800 truncate">{bookmarkData.title}</h3>
            <p className="text-xs text-blue-700 truncate">Tags: {bookmarkData.tags}</p>
            <p className="text-xs text-blue-600 break-all truncate">URL: {bookmarkData.url}</p>
            <p className="text-xs text-blue-600 truncate">Notes: {bookmarkData.notes}</p>
            
            <div className="flex gap-1 pt-1">
              <button 
                onClick={() => handleDelete(bookmark)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs"
              >
                Delete
              </button>
              
              <button
                onClick={() => copyToClipboard(id, citation)}
                className="px-2 py-1 bg-blue-400 text-white rounded hover:bg-blue-500 transition text-xs flex items-center gap-1"
              >
                Generate Citation
              </button>
            </div>

            {copiedId === id && (
              <div className="mt-1 bg-blue-100 border border-blue-300 p-1 rounded text-blue-800 text-xs">
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
