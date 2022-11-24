import Accordion from "./components/Accordion";
function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Accordion
        title="Product info"
        className="w-full max-w-[400px]"
        contentClassName="bg-white rounded-lg border border-gray-200 p-5 text-sm leading-relaxed w-full"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
        nisi optio commodi repellendus laudantium. Laudantium, ab reiciendis!
        Aperiam dolores voluptatem ab quisquam eligendi commodi obcaecati,
        provident excepturi ullam ipsa deserunt?
      </Accordion>
    </div>
  );
}

export default App;
