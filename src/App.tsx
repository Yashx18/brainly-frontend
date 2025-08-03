import { useState } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import SideBar from "./components/SideBar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { PlusIcon } from "./icons/PlusIcon";


function App() {
  // @ts-ignore
  const [haveAccount, setHaveAccount] = useState(true);
  const [page, setPage] = useState(false);
  return (
    <div className="bg-white w-screen h-dvh flex ">
      {page &&
        (haveAccount ? (
          <SignIn setFn={setHaveAccount} setPage={setPage} />
        ) : (
          <SignUp setFn={setHaveAccount} setPage={setPage} />
        ))}

      <SideBar setPage={setPage} />
      <div className="w-full flex flex-col  bg-amber-800">
        {/* This is the navbar Section */}
        <div className="flex items-center justify-end w-full bg-red-800">
          <Button
            onClick={() => {}}
            variant="secondary"
            text="Share Brain"
            size="md"
            startIcon={<PlusIcon size="md" />}
          />
          <Button
            onClick={() => {}}
            variant="primary"
            text="Add content"
            size="md"
          />
        </div>
        {/* This is the Cards Section. */}
        <div className="bg-red-400">
          <Card title={"Test"} link={"none"} type="yt" />
        </div>
      </div>
    </div>
  );
}

export default App;
