import { useState } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import SideBar from "./components/SideBar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AddContent from "./components/AddContent";
import { PlusIcon } from "./icons/PlusIcon";
import ShareBrain from "./components/ShareBrain";
import useContent from "./hooks/useContent";


function App() {
  // @ts-ignore
  const [haveAccount, setHaveAccount] = useState(true);
  const [page, setPage] = useState(false);
  const [shareBrain, setShareBrain] = useState(false);
  const [addContent, setAddContent] = useState(false);
  const contents = useContent()
  return (
    <div className="bg-white w-screen h-dvh flex  ">
      {page &&
        (haveAccount ? (
          <SignUp setFn={setHaveAccount} setPage={setPage} />
        ) : (
          <SignIn setFn={setHaveAccount} setPage={setPage} />
        ))}
      {addContent && <AddContent setAddContent={setAddContent} />}
      {shareBrain && <ShareBrain setPage={setShareBrain} />}
      {/* SIDEBAR SECTION */}
      <div className="flex items-center justify-center h-full">
        <SideBar setPage={setPage} />
      </div>
      <div className="w-full flex flex-col bg-[#eaeaea]">
        {/* This is the navbar Section */}
        <div className="flex items-center justify-end w-full border-b border-[#a3a3a3] bg-white">
          <Button
            stateUpdater={setShareBrain}
            variant="secondary"
            text="Share Brain"
            size="md"
            startIcon={<PlusIcon size="md" />}
          />
          <Button
            stateUpdater={setAddContent}
            variant="primary"
            text="Add content"
            size="md"
          />
        </div>
        {/* This is the Cards Section. */}
        <div className="Content w-full flex items-baseline justify-start flex-wrap">
          {contents.map(({ title, link, type }) => (
            <Card key={title} type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
