import { useState } from "react";
import Tab from "./components/Tab";
const tabList = [
  {
    title: "Display Settings",
    name: "display-settings",
  },
  {
    title: "Name Settings",
    name: "name-settings",
  },
  {
    title: "Account Settings",
    name: "account-settings",
  },
  {
    title: "General Settings",
    name: "general-settings",
  },
] as const;
export type TabItemsKeys = typeof tabList[number]["name"];
function App() {
  const [activeTab, setActiveTab] = useState<TabItemsKeys>("display-settings");
  return (
    <div className="flex items-center justify-center h-screen">
      <Tab
        tabList={tabList as any}
        activeTab={activeTab}
        onClick={(tab: TabItemsKeys) => setActiveTab(tab)}
        className="w-fit mx-auto"
      ></Tab>
    </div>
  );
}

export default App;
