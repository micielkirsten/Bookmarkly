/* eslint-disable prettier/prettier */
import { ComponentProps } from 'react'
import { NewBookmarkButton, SearchInput } from '@/components'

export const LogisticsRow = ({...props}: ComponentProps<'div'>) => {
    return (
        <div {...props}>
            <SearchInput></SearchInput>
            <NewBookmarkButton></NewBookmarkButton>
        </div>
    )
}