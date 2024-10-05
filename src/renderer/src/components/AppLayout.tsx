/* eslint-disable prettier/prettier */
import { ComponentProps, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
    return <main className={twMerge('flex flex-row h-screen', className)} {...props}>
        {children}
    </main>
}

export const Logistics = ({ className, children, ...props }: ComponentProps<'aside'>) => {
    return (
      <aside 
      className={twMerge('w-screen h-[50px] fixed top-0', className)} {...props}>
          {children}
      </aside>
    )
  }

export const Folders = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside 
    className={twMerge('w-[150px] mt-[50px] h-[100vh + 10px] overflow-auto', className)}
    {...props}
    >
        {children}
    </aside>
  )
}

export const Bookmarks = ({ className, children, ...props }: ComponentProps<'aside'>) => {
    return (
      <aside 
      className={twMerge('w-[150px] mt-[50px] h-[100vh + 10px] overflow-auto', className)}
      {...props}
      >
          {children}
      </aside>
    )
}

export const Bookmark_Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
        ({ className, children, ...props }, ref) => (
        <div ref={ref} className={twMerge('flex-1 mt-[50px] h-[100vh + 10px] overflow-auto', className)} {...props}>
            {children}
        </div>
    )
)

Bookmark_Content.displayName = 'Bookmark_Content'