import type { ReactElement } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  text: string;
  startIcon?: ReactElement;
  endIcon?: any;
  stateUpdater?: any;
};

export const Button = ({ variant, size, text, startIcon, stateUpdater, endIcon }: ButtonProps) => {
  return (
    <div className="rounded-xl" onClick={() => stateUpdater((val: any) => !val)}>
      <div
        className={cn(
          'font- mx-1 my-1 flex cursor-pointer items-center justify-between rounded-xl text-sm transition duration-200 will-change-transform select-none active:scale-98 sm:my-2',
          size === 'sm' && 'px-2 py-1',
          size === 'md' && 'px-3 py-2',
          size === 'lg' && 'px-5 py-3',
          variant === 'primary' &&
            'border  bg-blue-600 text-white hover:border-blue-300 hover:bg-blue-500',
          variant === 'secondary' &&
            'border bg-blue-200 text-blue-600 hover:text-blue-500 hover:border-blue-50 hover:bg-blue-100'
        )}
      >
        {startIcon}
        <p className="ml-1 hidden sm:block">{text}</p>
        {endIcon}
      </div>
    </div>
  );
};
