import "./App.css";
import Button from "./components/Button";

function App() {
  return (
    <div className="bg-[#292929] w-full h-dvh flex items-center justify-center">
      <Button
        onClick={() => {}}
        variants="secondary"
        text="Share Brain"
        size="md"
      />
      <Button
        onClick={() => {}}
        variants="primary"
        text="Add content"
        size="lg"
      />
    </div>
  );
}
// type ButtonProps = {
//   variants: "primary" | "secondary";
//   size: "sm" | "md" | "lg";
//   text: string;
//   startIcon?: any;
//   endIcon?: any;
//   onClick: () => void;
// };

export default App;
