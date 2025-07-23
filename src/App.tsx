import "./App.css";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { PlusIcon } from "./icons/PlusIcon";

function App() {
  return (
    <div className="bg-white w-screen h-dvh flex flex-col items-center justify-center">
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
        size="lg"
      />
      <Card title={"Test"} link={"none"} type="yt" />
    </div>
  );
}

export default App;
