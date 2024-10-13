/* eslint-disable prettier/prettier */
import { RootLayout, Logistics, LogisticsRow, Folders, Bookmarks, Bookmark_Content } from "@/components";


const App = () => {
  return(
    <RootLayout className="text-[rgba(204,204,204,255)]">
      <Logistics className="p-2 bg-[rgba(24,24,24,255)] border-b-2 border-b-[rgba(43,43,43,255)]">
        <LogisticsRow className="flex space-x-2 mt-1"></LogisticsRow>
      </Logistics>
      <Folders className="p-2 bg-[rgba(24,24,24,255)]"> Folders </Folders>
      <Bookmarks className="hidden p-2"> Bookmarks </Bookmarks>
      <Bookmark_Content className="p-2 bg-[rgba(31,31,31,255)] border-l-2 border-l-[rgba(43,43,43,255)]"> Bookmark Content </Bookmark_Content>
    </RootLayout>
  )
}

export default App
