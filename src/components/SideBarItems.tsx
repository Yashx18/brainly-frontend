import { cn } from '@/lib/utils';
import type { ReactElement } from 'react';

interface SideBarProps {
  text?: String;
  logo: ReactElement;
  open?: boolean;
  onClick?: () => void;
}

export const SideBarItem = ({ text, logo, open, onClick }: SideBarProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex w-full cursor-pointer items-center py-2 text-neutral-600 transition-colors duration-150 ease-in-out hover:bg-neutral-200 hover:text-neutral-900',
        open ? 'justify-center rounded-lg px-4 sm:justify-start' : 'justify-center rounded-xl'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center gap-2 ease-in-out',
          open ? 'w-full sm:w-auto' : 'w-auto'
        )}
      >
        <span className={cn(open ? '' : '')}>{logo}</span>
        {open ? <div className="text-md hidden items-start sm:flex">{text}</div> : null}
      </div>
    </div>
  );
};
