/* eslint-disable prettier/prettier */
import { RootLayout, Logistics, Folders, Bookmarks, Bookmark_Content } from "@/components";

function App() {
  return(
    <RootLayout>
      <Logistics className="p-2 border-4 border-yellow-500"> Logistics </Logistics>
      <Folders className="p-2 border-4 border-red-500"> Folders </Folders>
      <Bookmarks className="p-2 border-4 border-green-500"> Bookmarks </Bookmarks>
      <Bookmark_Content className="border-4 border-blue-500"> Bookmark Content </Bookmark_Content>
    </RootLayout>
  )
}

export default App
