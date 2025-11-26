import { cn } from '@/lib/utils';

interface optionsProps {
  text: string;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

const TypeOptions = ({ text, onClick, variant }: optionsProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-md px-3 py-1.5 text-base transition-colors duration-200 will-change-transform select-none focus:outline-none',
        variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-600',
        variant === 'secondary' &&
          'border border-blue-200 bg-blue-100 text-blue-600 hover:bg-blue-50 hover:text-blue-500 active:bg-blue-200'
      )}
      tabIndex={0}
    >
      {text}
    </button>
  );
};

export default TypeOptions;
