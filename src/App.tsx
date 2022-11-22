import IconMail from "./components/icons/IconMail";
import Input from "./components/Input";

function App() {
  return (
    <div className="p-10">
      <Input
        type="text"
        className="pl-16"
        wrapperClassName="max-w-[400px]"
        placeholder="Enter your email address"
        icon={<IconMail />}
        iconClassName="left-5 text-gray-400"
      ></Input>
    </div>
  );
}

export default App;
