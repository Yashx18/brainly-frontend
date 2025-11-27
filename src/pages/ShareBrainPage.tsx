import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/Card';
import { cn } from '@/lib/utils';

const API_URL = import.meta.env.VITE_API_URL;
const APP_URL = import.meta.env.VITE_URL;

const ShareBrainPage = () => {
  const { sharelink } = useParams<{ sharelink: string }>();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/brain/${sharelink}`, {});
        setData(response.data.info);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (sharelink) {
      getUserData();
    }
  }, [sharelink]);

  return (
    <div className={cn('font-inter flex h-screen w-screen flex-col items-start justify-start')}>
      <div
        className={cn(
          'flex w-full items-center justify-between border-b border-neutral-300 px-4 py-2.5 shadow-2xl'
        )}
      >
        <h1 className={cn('text-2xl font-semibold text-neutral-600 tracking-tight')}>Shared Data</h1>
        <a
          href={APP_URL}
          draggable={false}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'border transition-all duration-200 will-change-transform active:scale-98 text-md w-full rounded-lg bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 px-3 py-1 text-center font-medium text-white ring-0 ring-neutral-300 text-shadow-sm hover:ring-3  md:w-fit md:px-5 md:py-2 md:text-lg'
          )}
        >
          ZYN
        </a>
      </div>
      <div className={cn('Content h-full w-full overflow-y-auto bg-neutral-100 p-2')}>
        <div className={cn('columns-1 gap-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-6')}>
          {data.map((item) => {
            return (
              <div
                className={cn('mb-3 break-inside-avoid')}
                key={item.id || item.title + item.link}
              >
                <Card title={item.title} link={item.link} type={item.type} />
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={cn(
          'flex h-auto w-screen items-center justify-center border-t border-t-neutral-300 py-3 text-lg'
        )}
      >
        <span className={cn('font-semibold text-neutral-700')}>
          Made by{' '}
          <a
            href="https://theken.vercel.app"
            target="_blank"
            className={cn(
              'font-bold text-neutral-800 underline decoration-blue-500 decoration-wavy underline-offset-4'
            )}
          >
            Yash
          </a>{' '}
          .
        </span>
      </div>
    </div>
  );
};

export default ShareBrainPage;
