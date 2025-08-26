import AddContent from "@/components/AddContent";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CardPopUp } from "@/components/CardPopUp";
import ShareBrain from "@/components/ShareBrain";
import SideBar from "@/components/SideBar";
import { PlusIcon } from "@/icons/PlusIcon";
import { ShareIcon } from "@/icons/ShareIcon";
import { useContentStore } from "@/store";
import { useState, useEffect } from "react";
import { useCardPopUpData } from "@/store";

const Home = () => {
  const { open, selectedCard, closePopUp } = useCardPopUpData();
  const [shareBrain, setShareBrain] = useState(false);
  const [addContent, setAddContent] = useState(false);
  const { content, fetchContent } = useContentStore();
  const API_URL = import.meta.env.VITE_API_URL;

  // const { open } = useCardPopUp();

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // @ts-ignore

  return (
    <div className="bg-white w-full h-screen flex relative ">
      {addContent && <AddContent setAddContent={setAddContent} />}
      {shareBrain && <ShareBrain setPage={setShareBrain} />}
      {/* SIDEBAR SECTION */}
      <div className="flex items-center justify-center h-full">
        <SideBar />
      </div>
      <div className="w-screen flex h-screen flex-col bg-[#eaeaea]">
        {/* This is the navbar Section */}
        <div className="flex items-center justify-end border-b border-[#a3a3a3] bg-white">
          <Button
            stateUpdater={setShareBrain}
            variant="secondary"
            text="Share Brain"
            size="md"
            startIcon={<ShareIcon />}
          />
          <Button
            stateUpdater={setAddContent}
            variant="primary"
            text="Add content"
            size="md"
            startIcon={<PlusIcon size="md" />}
          />
        </div>
        {/* This is the Cards Section. */}

        {/* Masonry Section */}
        <div className="Content w-full h-full overflow-y-auto p-1">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-1">
            {content.map(({ title, link, type }) => {
              let src = "";
              if (type === "image" || type === "video") {
                src = `${API_URL}${link}`;
              }

              return (
                <div key={title} className="mb-1 break-inside-avoid">
                  {open && selectedCard && (
                    <CardPopUp
                      title={selectedCard.title}
                      link={selectedCard.link}
                      type={selectedCard.type}
                      onClose={closePopUp}
                    />
                  )}
                  <Card
                    key={title}
                    // @ts-ignore
                    type={type}
                    link={link == "image" ? src : link}
                    title={title}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
