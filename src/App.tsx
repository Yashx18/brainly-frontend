import "./App.css";
import { Button } from "./components/Button";
import { PlusIcon } from "./icons/PlusIcon";

function App() {
  return (
    <div className="bg-[#292929] w-full h-dvh flex items-center justify-center">
      <Button
        onClick={() => {}}
        variant="secondary"
        text="Share Brain"
        size="md"
        startIcon={<PlusIcon  size="md"/>}
      />
      <Button
        onClick={() => {}}
        variant="primary"
        text="Add content"
        size="lg"
      />
    </div>
  );
}


export default App;
