import React from "react";
import { TabItemsKeys } from "../App";
interface TabItemProps {
  title: string;
  name: string;
}
interface TabProps {
  tabList: TabItemProps[];
  className?: string;
  onClick?: (tab: TabItemsKeys) => void;
  activeTab: string;
  children?: React.ReactNode;
}
const Tab = ({
  tabList = [],
  className = "",
  onClick = () => {},
  activeTab = "",
  children,
}: TabProps) => {
  if (tabList.length <= 0) return null;
  const handleActiveTab = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tab: TabItemsKeys
  ) => {
    onClick(tab);
    const element = e.target as HTMLElement;
    element.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };
  return (
    <>
      <div
        className={`flex justify-center whitespace-nowrap overflow-x-auto scrollbar-hidden gap-2 ${className}`}
      >
        {tabList.map((tab) => (
          <div
            className={`cursor-pointer py-4 px-6 border-b-2 text-sm lg:text-base font-medium transition-all flex-shrink-0 ${
              activeTab === tab.name
                ? "border-b-pink-500 text-pink-500 pointer-events-none"
                : "border-b-transparent text-gray-400"
            }`}
            key={tab.name}
            onClick={(e) => handleActiveTab(e, tab.name as TabItemsKeys)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      {children}
    </>
  );
};

export default Tab;
