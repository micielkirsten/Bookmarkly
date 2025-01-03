declare global {
    interface BookmarkDoc {
      _id: any;
      title: string;
      tags: string;
      url: string;
      notes: string;
    }
  
    interface Bookmark {
      _id?: any;
      _doc?: BookmarkDoc;
      title: string;
      tags: string;
      url: string;
      notes: string;
    }
  
    interface TagCount {
      [key: string]: number;
    }
  
    interface TagFoldersProps {
      bookmarks: Bookmark[];
      onSelectTag?: (tag: string | undefined) => void;
    }
  }
  
  export {};