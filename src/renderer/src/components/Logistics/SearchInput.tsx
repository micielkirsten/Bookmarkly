/* eslint-disable prettier/prettier */
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export type SearchInputProps = ComponentProps<'input'> & {
  placeholder?: string;
};

export const SearchInput = ({ className, placeholder, ...props }: SearchInputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={twMerge(
        'px-1 rounded-md border border-zinc-400/50 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-colors duration-100',
        className
      )}
      {...props}
    />
  );
};
