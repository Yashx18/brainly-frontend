import { useCardPopUpData, useContentStore } from '../store';
import axios from 'axios';
import { cn } from '@/lib/utils';

import { HugeIcons } from '@/components/icons/HugeIcons';
import {
  Video02Icon,
  DocumentAttachmentIcon,
  Image03Icon,
  Link01Icon,
  Delete02Icon,
} from '@hugeicons/core-free-icons';

interface Cardprops {
  title: string;
  link: string;
  type: 'text' | 'URL' | 'image' | 'video';
}

const API_URL = import.meta.env.VITE_API_URL;

const typeIconsMap: Record<Cardprops['type'], any> = {
  text: DocumentAttachmentIcon,
  image: Image03Icon,
  video: Video02Icon,
  URL: Link01Icon,
};

export const Card = ({ title, link, type }: Cardprops) => {
  const { openPopUp } = useCardPopUpData();
  const { fetchContent } = useContentStore();

  async function deleteCard(e?: React.MouseEvent) {
    e?.stopPropagation();
    try {
      const response = await axios.delete(`${API_URL}/api/content`, {
        data: { title, link, type },
        withCredentials: true,
      });
      if (response.data.message) {
        fetchContent();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={cn(
        'group flex h-auto w-full cursor-pointer flex-col items-start gap-2 rounded-xl bg-white p-2 shadow-md transition hover:shadow-lg sm:max-w-80'
      )}
      tabIndex={0}
      aria-label={`Card for ${title}`}
      onClick={() => openPopUp({ title, link, type })}
      role="button"
    >
      <div
        className={cn(
          'flex w-full items-center justify-between rounded-lg bg-[#eaeaea] p-1.5',
          'transition-colors duration-100 group-hover:bg-neutral-200'
        )}
      >
        <div className="flex w-full items-center gap-1">
          <span className="flex-shrink-0 text-neutral-800" aria-hidden="true">
            <HugeIcons size={20} color="currentColor" strokeWidth={1.8} icon={typeIconsMap[type]} />
          </span>
          <h4 className={cn('truncate text-sm font-semibold text-neutral-800')} title={title}>
            {title}
          </h4>
        </div>
        <button
          onClick={deleteCard}
          type="button"
          aria-label={`Delete card for ${title}`}
          className={cn(
            'rounded-full p-1 text-neutral-800 transition duration-150 will-change-transform hover:bg-neutral-200 hover:text-red-400 focus:outline-none',
            'active:scale-98 active:text-red-500'
          )}
          tabIndex={0}
        >
          <HugeIcons size={20} color="currentColor" strokeWidth={1.8} icon={Delete02Icon} />
        </button>
      </div>
      {/* Card Content */}
      <div className="w-full">
        {type === 'URL' && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'p-1 text-sm font-medium break-all text-blue-600 underline underline-offset-4 transition hover:opacity-90'
            )}
            title={link}
            tabIndex={0}
            onClick={(e) => e.stopPropagation()}
          >
            {link}
          </a>
        )}
        {type === 'image' && (
          <img
            src={`${link}`}
            alt={title}
            className={cn(
              'h-auto w-full rounded-lg border border-neutral-200 object-cover p-1 transition hover:scale-[1.01] sm:w-80'
            )}
            onClick={(e) => e.stopPropagation()}
            loading="lazy"
          />
        )}
        {type === 'video' && (
          <video
            className={cn('z-0 h-auto w-full rounded-lg border border-neutral-200 p-1')}
            controls
            onClick={(e) => e.stopPropagation()}
          >
            <source src={`${link}`} type={`video/${link.split('.').pop()}`} />
            Your browser does not support the video tag.
          </video>
        )}
        {type === 'text' && (
          <div className="h-auto w-full rounded-lg bg-[#eaeaea] p-2">
            <p className="w-full text-sm break-words text-neutral-800">{link}</p>
          </div>
        )}
      </div>
    </div>
  );
};
