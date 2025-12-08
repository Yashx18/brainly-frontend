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
  PlayCircleIcon,
} from '@hugeicons/core-free-icons';
import { useState } from 'react';

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
  const [openDelete, setOpenDelete] = useState(false);

  async function deleteCard(e?: React.MouseEvent) {
    e?.stopPropagation();
    try {
      setOpenDelete((val) => !val);
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
        'group relative flex h-auto w-full cursor-pointer flex-col items-start gap-2 rounded-xl bg-white p-2 shadow-md transition hover:shadow-lg sm:max-w-80'
      )}
      tabIndex={0}
      aria-label={`Card for ${title}`}
      onClick={() => {
        openPopUp({ title, link, type });
      }}
      role="button"
    >
      {/* Delete Modal */}
      {openDelete && (
        <div className="absolute right-2 shadow-lg shadow-black/10 z-1 flex w-fit flex-col gap-1 rounded-lg border bg-white p-1 text-xs">
          <span className="text-neutral-700">Are you sure ?</span>
          <div className="flex w-full items-center justify-between">
            <button
              onClick={deleteCard}
              className="cursor-pointer rounded-md border border-transparent bg-red-400 px-2 py-1 text-white transition-all duration-200 will-change-transform hover:bg-red-500 active:scale-94"
            >
              Yes
            </button>
            <button
              onClick={() => setOpenDelete((val) => !val)}
              className="cursor-pointer rounded-md border border-neutral-300 bg-white px-2 py-1 text-neutral-500 transition-all duration-200 will-change-transform hover:border-neutral-400 hover:text-neutral-600 active:scale-94"
            >
              No
            </button>
          </div>
        </div>
      )}

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
          onClick={() => {
            setOpenDelete((val) => !val)
          }}
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
      <div className="pointer-events-none w-full">
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
              'pointer-events-none h-auto w-full rounded-lg border border-neutral-200 object-cover p-1 transition hover:scale-[1.01] sm:w-80'
            )}
            onClick={(e) => e.stopPropagation()}
            loading="lazy"
          />
        )}
        {type === 'video' && (
          <div className="group relative">
            <video
              className={cn('z-0 h-auto w-full rounded-lg border border-neutral-200 p-1')}
              onClick={(e) => e.stopPropagation()}
            >
              <source src={`${link}`} type={`video/${link.split('.').pop()}`} />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 duration-200 group-hover:bg-neutral-400/30 group-hover:transition-colors">
              <HugeIcons
                icon={PlayCircleIcon}
                size={36}
                color="currentColor"
                strokeWidth={1.5}
                className="text-neutral-200 duration-200 group-hover:text-neutral-100 group-hover:transition-colors"
                aria-label="Play video"
              />
            </div>
          </div>
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
