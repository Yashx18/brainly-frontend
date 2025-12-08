import axios from 'axios';
import { useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import TypeOptions from './TypeOptions';
import { useContentStore } from '../store';
import { cn } from '@/lib/utils';

const ContentType = {
  Video: 'video',
  Image: 'image',
  URL: 'URL',
  Text: 'text',
} as const;

interface AddContentProps {
  setAddContent: React.Dispatch<React.SetStateAction<boolean>>;
}

const API_URL = import.meta.env.VITE_API_URL;

const AddContent = ({ setAddContent }: AddContentProps) => {
  const { fetchContent } = useContentStore();
  const [type, setType] = useState<(typeof ContentType)[keyof typeof ContentType]>(
    ContentType.Text
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const linkRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const title = titleRef.current?.value?.trim();
    let fileOrLink: any = null;

    if (type === 'image' || type === 'video') {
      // @ts-ignore
      fileOrLink = (linkRef.current as HTMLInputElement)?.files?.[0];
    } else {
      fileOrLink = (linkRef.current as HTMLTextAreaElement)?.value?.trim();
    }

    if (!title || !fileOrLink) {
      setError('Please provide both a title and content.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);

    if (type === 'image' || type === 'video') {
      formData.append('file', fileOrLink);
    } else {
      formData.append('link', fileOrLink);
    }

    try {
      const response = await axios.post(`${API_URL}/api/content`, formData, {
        withCredentials: true,
      });
      if (response.data.message) {
        setSuccessMsg('Content added successfully!');
        fetchContent();
        setTimeout(() => {
          setAddContent(false);
        }, 1100);
      }
    } catch (err) {
      setError('Unable to send content');
      // Optionally more error detail: setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-inter fixed top-0 left-0 z-1 flex h-full w-screen items-center justify-center bg-neutral-700/40 px-2">
      {/* Modal Body styled like SignIn */}
      <div className="relative flex h-auto w-full max-w-sm flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg z-20">
        {/* Modal header row */}
        <div className="mb-5 flex w-full items-center justify-between">
          <h1 className="text-2xl font-medium text-neutral-900">Add Content</h1>
          <button
            type="button"
            aria-label="Close"
            onClick={() => !loading && setAddContent(false)}
            className={cn(
              'rounded-full p-1 transition-colors hover:bg-neutral-200 focus:outline-none',
              loading && 'pointer-events-none opacity-50'
            )}
            tabIndex={0}
          >
            <IoMdClose className="size-6 text-neutral-600" />
          </button>
        </div>

        <form className="w-full" encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="add-content-title"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="add-content-title"
              ref={titleRef}
              type="text"
              placeholder="Add title here!"
              className={cn(
                'text-md w-full rounded-md border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-neutral-800 ring-blue-300 transition duration-150 focus:ring-2 focus:outline-none',
                error && !titleRef.current?.value && 'border-red-500'
              )}
              required
              disabled={loading}
              aria-required="true"
              aria-label="Title"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Content</label>
            {type === 'image' || type === 'video' ? (
              <input
                ref={linkRef as React.RefObject<HTMLInputElement>}
                name="contentBar"
                type="file"
                accept={type === 'image' ? 'image/*' : 'video/*'}
                className={cn(
                  'text-md w-full rounded-md border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-neutral-800 ring-blue-300 transition duration-150 focus:ring-2 focus:outline-none',
                  error && 'border-red-500'
                )}
                required
                disabled={loading}
                aria-required="true"
                aria-label={type === 'image' ? 'Image file' : 'Video file'}
              />
            ) : (
              <textarea
                ref={linkRef as React.RefObject<HTMLTextAreaElement>}
                placeholder="Type here ..."
                className={cn(
                  'text-md w-full rounded-md border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-neutral-800 ring-blue-300 transition duration-150 focus:ring-2 focus:outline-none',
                  error && 'border-red-500'
                )}
                required
                disabled={loading}
                aria-required="true"
                aria-label="Content"
              />
            )}
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Type</label>
            <div className="mb-1 flex w-full flex-wrap gap-2">
              <TypeOptions
                text="Text"
                variant={type === ContentType.Text ? 'primary' : 'secondary'}
                onClick={() => !loading && setType(ContentType.Text)}
              />
              <TypeOptions
                text="Video"
                variant={type === ContentType.Video ? 'primary' : 'secondary'}
                onClick={() => !loading && setType(ContentType.Video)}
              />
              <TypeOptions
                text="Image"
                variant={type === ContentType.Image ? 'primary' : 'secondary'}
                onClick={() => !loading && setType(ContentType.Image)}
              />
              <TypeOptions
                text="URL"
                variant={type === ContentType.URL ? 'primary' : 'secondary'}
                onClick={() => !loading && setType(ContentType.URL)}
              />
            </div>
          </div>
          {/* Toast-like error/success messages */}
          {error && (
            <div
              className="animate-fadeIn pointer-events-auto fixed right-6 bottom-6 z-50 flex max-w-sm min-w-[220px] items-center rounded-lg border border-red-300 bg-white px-4 py-3 shadow-xl"
              role="alert"
              aria-live="polite"
            >
              <span className="text-base font-medium text-red-500">{error}</span>
            </div>
          )}
          {/* Toast */}
          {successMsg && (
            <div
              className="animate-fadein pointer-events-auto fixed right-6 bottom-6 z-50 flex max-w-sm min-w-[220px] items-center rounded-lg border border-blue-300 bg-white px-4 py-3 shadow-xl"
              role="status"
              aria-live="polite"
            >
              <span className="text-sm font-medium text-blue-500">{successMsg}</span>
            </div>
          )}
          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className={cn(
                'flex w-full cursor-pointer items-center justify-center rounded-md bg-blue-500 py-2 font-medium text-white transition-all duration-200 will-change-transform hover:bg-blue-600 active:scale-98 active:bg-blue-600',
                loading && 'cursor-not-allowed opacity-70'
              )}
              aria-busy={loading}
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContent;
