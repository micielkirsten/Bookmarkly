/* eslint-disable prettier/prettier */
import { ComponentProps } from 'react'
import { NewBookmarkButton } from '@/components'

export const LogisticsRow = ({...props}: ComponentProps<'div'>) => {
    return (
        <div {...props}>
            <NewBookmarkButton></NewBookmarkButton>
        </div>
    )
}