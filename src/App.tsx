import { useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="p-10">
      <button
        onClick={() => setShowModal(true)}
        className="p-3 rounded-lg bg-blue-500 text-white"
      >
        Show modal
      </button>
      <Modal
        isOpen={showModal}
        onModalClose={() => setShowModal(false)}
        bodyClassName="w-full max-w-[700px] bg-white rounded-lg"
      >
        <h2 className="text-xl font-bold text-center mb-10">
          Enter Hotel / Apartment reservation
        </h2>
        <div className="grid grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Enter a hotel name"
            className="border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
          />
          <input
            type="text"
            placeholder="Entering location will help optimize your trip"
            className="border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
          />
        </div>
      </Modal>
    </div>
  );
}

export default App;
