import { useRef, useState } from 'react';
import { useCardPopUpData, useContentStore, useEditStore, useIdStore } from '../store';
import axios from 'axios';
import TypeOptions from './TypeOptions';
import { HugeIcons } from '@/components/icons/HugeIcons';
import {
  DocumentAttachmentIcon,
  Image03Icon,
  Video02Icon,
  Link01Icon,
  PencilEdit02Icon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

interface CardPopUpProps {
  title?: string;
  link?: string;
  type?: 'text' | 'URL' | 'image' | 'video';
  onClose?: () => void;
}

const ContentType = {
  Video: 'video',
  Image: 'image',
  URL: 'URL',
  Text: 'text',
} as const;

const typeIconsMap: Record<NonNullable<CardPopUpProps['type']>, any> = {
  text: DocumentAttachmentIcon,
  image: Image03Icon,
  video: Video02Icon,
  URL: Link01Icon,
};

const API_URL = import.meta.env.VITE_API_URL;

export const CardPopUp = ({ title, link, type }: CardPopUpProps) => {
  const { closePopUp } = useCardPopUpData();
  const { setEdit } = useEditStore();
  const { id, getId } = useIdStore();
  const { fetchContent } = useContentStore();
  const newTitleRef = useRef<HTMLInputElement>(null);
  const newLinkRef = useRef<HTMLInputElement>(null);

  // Default to current content type
  const [dataType, setDataType] = useState<(typeof ContentType)[keyof typeof ContentType]>(
    type || ContentType.Text
  );

  // Only show edit form after clicking edit button (never default open)
  const [showEdit, setShowEdit] = useState(false);

  // For toast notifications
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Clean up edit state when popup closes
  function handleClosePopUp() {
    setShowEdit(false);
    if (setEdit) setEdit(false);
    closePopUp();
  }

  // Show a toast for 2.5 seconds (success or error).
  // This function sets a toast and auto-hides it after a short timeout.
  function showToast(type: 'success' | 'error', message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 2500);
  }

  async function updateContent() {
    const newTitle = newTitleRef.current?.value?.trim();

    // Validation logic
    let newLink = '';
    let file: File | null = null;
    if (dataType === 'image' || dataType === 'video') {
      const fileInput = newLinkRef.current as HTMLInputElement;
      file = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;
      if (!file) {
        showToast('error', 'Please provide a valid file.');
        return;
      }
    } else {
      newLink = newLinkRef.current?.value?.trim() ?? '';
      if (!newLink) {
        showToast('error', 'Please provide link or text content.');
        return;
      }
    }

    if (!newTitle) {
      showToast('error', 'Title cannot be empty.');
      return;
    }

    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('type', dataType);

    if (dataType === 'image' || dataType === 'video') {
      formData.append('file', file as Blob);
    } else {
      formData.append('link', newLink);
    }

    try {
      const response = await axios.put(`${API_URL}/api/content/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        showToast('success', 'Content updated!');
        setTimeout(() => {
          handleClosePopUp();
          fetchContent();
        }, 1250);
      }
    } catch (error: any) {
      showToast('error', error?.response?.data?.message || 'Failed to update content.');
    }
  }

  // Only update UI (the modal), not the background.
  return (
    <div className="pointer-events-none fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center">
      <div
        className={cn(
          'relative z-10 flex w-full max-w-lg flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white p-4 shadow-lg',
          'pointer-events-auto max-h-[90vh] overflow-auto'
        )}
        style={{ maxWidth: 480 }}
        tabIndex={-1}
      >
        {/* Toast Notification */}
        {toast && (
          <div
            className={cn(
              'animate-fadeIn fixed right-5 bottom-5 z-50 flex max-w-sm min-w-[220px] items-center rounded-lg border px-4 py-3 shadow-xl',
              toast.type === 'success' ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
            )}
            role="status"
            aria-live="polite"
          >
            <span
              className={
                toast.type === 'success'
                  ? 'mr-2 inline-block size-3 rounded-full bg-green-500'
                  : 'mr-2 inline-block size-3 rounded-full bg-red-500'
              }
              aria-hidden="true"
            />
            <span className={cn('text-base font-medium text-neutral-800')}>{toast.message}</span>
          </div>
        )}

        <form
          action="#"
          method="post"
          encType="multipart/form-data"
          className="w-full"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            if (showEdit) updateContent();
          }}
        >
          {/* Modal Header */}
          <div className="mb-4 flex w-full items-center justify-between">
            <div className="flex min-w-0 items-center gap-2 text-neutral-800">
              {type && (
                <HugeIcons
                  size={22}
                  color="currentColor"
                  strokeWidth={1.8}
                  icon={typeIconsMap[type]}
                  className="shrink-0 "
                  aria-hidden="true"
                />
              )}
              {!showEdit ? (
                <h1 className="truncate text-xl font-medium text-neutral-800">{title}</h1>
              ) : (
                <input
                  ref={newTitleRef}
                  type="text"
                  placeholder={title}
                  defaultValue={title}
                  className={cn(
                    'w-full rounded-md border bg-neutral-100 p-2 px-3 py-1.5 text-lg text-neutral-900 placeholder-neutral-400 ring-blue-300 focus:ring-2 focus:outline-none'
                  )}
                  required
                  aria-required="true"
                  aria-label="Title"
                />
              )}
            </div>
            <div className="ml-2 flex items-center gap-1">
              {!showEdit && (
                <button
                  type="button"
                  tabIndex={0}
                  className={cn(
                    'rounded-full p-1 text-neutral-700 transition-colors hover:bg-neutral-200 focus:outline-none'
                  )}
                  onClick={() => {
                    setShowEdit(true);
                    if (setEdit) setEdit(true);
                    // @ts-ignore
                    getId(title, link, type);
                  }}
                  aria-label="Edit"
                >
                  <HugeIcons
                    icon={PencilEdit02Icon}
                    size={20}
                    strokeWidth={2}
                    color="currentColor"
                    className="size-5"
                  />
                </button>
              )}
              <button
                type="button"
                tabIndex={0}
                className={cn(
                  'rounded-full p-1 text-neutral-700 transition-colors hover:bg-neutral-200 focus:outline-none'
                )}
                onClick={handleClosePopUp}
                aria-label="Close"
              >
                <HugeIcons
                  icon={Cancel01Icon}
                  size={22}
                  strokeWidth={2}
                  color="currentColor"
                  className="size-6"
                />
              </button>
            </div>
          </div>
          {/* Content */}
          {!showEdit ? (
            <div className="h-full w-full overflow-auto">
              {type === 'URL' && (
                <a
                  href={link}
                  target="_blank"
                  className={cn(
                    'block font-medium break-all text-blue-700 underline underline-offset-2 transition-colors hover:text-blue-800'
                  )}
                  rel="noopener noreferrer"
                >
                  {link}
                </a>
              )}
              {type === 'image' && (
                <div className="relative flex w-full items-center justify-center">
                  <img
                    src={link}
                    alt={title}
                    className="w-full rounded-lg border border-neutral-200 object-contain"
                    style={{ maxWidth: '100%' }}
                  />
                </div>
              )}
              {type === 'video' && (
                <div className="relative flex w-full items-center justify-center">
                  <video
                    className="w-full rounded-lg border border-neutral-200 object-contain"
                    controls
                    style={{ maxWidth: '100%' }}
                  >
                    <source src={link} type="video/mp4" />
                  </video>
                </div>
              )}
              {type === 'text' && (
                <div className="w-full overflow-auto rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-2">
                  <p className="text-base break-words text-neutral-800">{link}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-4 w-full">
              <label
                className={cn('mb-1 block text-sm font-medium text-gray-700')}
                htmlFor="cardpopup-content"
              >
                Content
              </label>
              {dataType === 'image' || dataType === 'video' ? (
                <input
                  ref={newLinkRef as React.RefObject<HTMLInputElement>}
                  name="contentBar"
                  type="file"
                  accept={dataType === 'image' ? 'image/*' : 'video/*'}
                  className={cn(
                    'block w-full rounded-md border border-neutral-300 bg-neutral-100 p-2 text-sm text-neutral-800 transition duration-150 focus:ring-2 focus:ring-blue-300 focus:outline-none'
                  )}
                  required
                  aria-required="true"
                  aria-label="Content"
                />
              ) : (
                <input
                  ref={newLinkRef}
                  name="contentBar"
                  type="text"
                  defaultValue={link}
                  placeholder={'Add content here!'}
                  className={cn(
                    'block w-full rounded-md border border-neutral-300 bg-neutral-100 p-2 text-sm text-neutral-800 transition duration-150 focus:ring-2 focus:ring-blue-300 focus:outline-none'
                  )}
                  required
                  aria-required="true"
                  aria-label="Content"
                />
              )}
            </div>
          )}

          {/* Content Type Options */}
          {showEdit && (
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">Type</label>
              <div className="flex w-full flex-wrap gap-2">
                <TypeOptions
                  text="Text"
                  variant={dataType === ContentType.Text ? 'primary' : 'secondary'}
                  onClick={() => setDataType(ContentType.Text)}
                />
                <TypeOptions
                  text="Video"
                  variant={dataType === ContentType.Video ? 'primary' : 'secondary'}
                  onClick={() => setDataType(ContentType.Video)}
                />
                <TypeOptions
                  text="Image"
                  variant={dataType === ContentType.Image ? 'primary' : 'secondary'}
                  onClick={() => setDataType(ContentType.Image)}
                />
                <TypeOptions
                  text="URL"
                  variant={dataType === ContentType.URL ? 'primary' : 'secondary'}
                  onClick={() => setDataType(ContentType.URL)}
                />
              </div>
            </div>
          )}

          {/* Update Button */}
          {showEdit && (
            <button
              type="submit"
              className={cn(
                'flex w-full cursor-pointer items-center justify-center rounded-md bg-blue-500 py-2 font-medium text-neutral-50 transition-all duration-200 hover:bg-blue-600 active:scale-98 active:bg-blue-600'
              )}
            >
              <HugeIcons
                icon={PencilEdit02Icon}
                size={20}
                color="currentColor"
                strokeWidth={2}
                className="mr-2"
                aria-hidden="true"
              />
              Update
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
