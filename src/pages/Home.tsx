import AddContent from '@/components/AddContent';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CardPopUp } from '@/components/CardPopUp';
import ShareBrain from '@/components/ShareBrain';
import SideBar from '@/components/SideBar';
import { useContentStore } from '@/store';
import { useState, useEffect } from 'react';
import { useCardPopUpData } from '@/store';
import { HugeIcons } from '@/components/icons/HugeIcons';
import { Add01Icon, Share08Icon } from '@hugeicons/core-free-icons';

const Home = () => {
  const { open, selectedCard, closePopUp } = useCardPopUpData();
  const [shareBrain, setShareBrain] = useState(false);
  const [addContent, setAddContent] = useState(false);
  const { content, fetchContent } = useContentStore();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // @ts-ignore

  return (
    <div className="font-inter relative flex h-screen w-full flex-col-reverse sm:flex-row">
      {addContent && <AddContent setAddContent={setAddContent} />}
      {shareBrain && <ShareBrain setPage={setShareBrain} />}
      {/* SIDEBAR SECTION */}
      <div className="flex h-auto items-center justify-center sm:h-full">
        <SideBar />
      </div>
      {/* this is the canvas */}
      <div className="relative flex h-screen w-screen flex-col bg-neutral-200">
        {/* This is the navbar Section */}
        <div className="fixed right-4 bottom-18 z-10 items-center justify-end rounded-2xl border-b border-neutral-300 bg-white sm:static sm:flex sm:rounded-none">
          <Button
            stateUpdater={setShareBrain}
            variant="secondary"
            text="Share ZYN"
            size="md"
            startIcon={
              <HugeIcons icon={Share08Icon} size={18} color={'currentColor'} strokeWidth={2} />
            }
          />
          <Button
            stateUpdater={setAddContent}
            variant="primary"
            text="Add content"
            size="md"
            startIcon={
              <HugeIcons icon={Add01Icon} size={18} color={'currentColor'} strokeWidth={2} />
            }
          />
        </div>
        {/* This is the Cards Section. */}

        {open && selectedCard && (
          <CardPopUp
            title={selectedCard.title}
            link={selectedCard.link}
            type={selectedCard.type}
            onClose={closePopUp}
          />
        )}
        {/* Masonry Section */}
        <div className="Content relative h-full w-screen overflow-y-auto p-2 sm:w-full sm:p-1">
          <div className="mt-1 mb-19 columns-1 gap-1 sm:mt-0 sm:columns-2 md:columns-3 lg:columns-4">
            {content.map(({ title, link, type, index }) => {
              let src = '';
              if (type === 'image' || type === 'video') {
                src = `${API_URL}${link}`;
              }

              return (
                <>
                  <div className="mb-2 break-inside-avoid sm:mb-1">
                    <Card
                      key={index}
                      // @ts-ignore
                      type={type}
                      link={link == 'image' ? src : link}
                      title={title}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
