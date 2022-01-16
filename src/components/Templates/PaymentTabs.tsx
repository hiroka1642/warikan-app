import { Tab } from "@headlessui/react";
import { RebuildingList } from "../Molecules/RebuildingList";
import { PaymentResult } from "../Organisms/PaymentResult";
import { PaymentDetail } from "../Organisms/PaymentDetail";
import type { ProjectTypes } from "src/types";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

type Props = {
  project: ProjectTypes;
  nameArr: string[];
};

export const PaymentTabs = (props: Props) => {
  const tab = [
    {
      key: 1,
      name: "たてかえ一覧",
      children: (
        <ul>
          <RebuildingList project={props.project} nameArr={props.nameArr} />
        </ul>
      ),
    },
    {
      key: 2,
      name: "精算",
      children: (
        <ul>
          <PaymentResult project={props.project} nameArr={props.nameArr} />
        </ul>
      ),
    },
    {
      key: 3,
      name: "詳細",
      children: (
        <ul>
          <PaymentDetail project={props.project} nameArr={props.nameArr} />
        </ul>
      ),
    },
  ];

  return (
    <div className="w-full px-2 py-4 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-2 space-x-1 bg-indigo-400 rounded-xl">
          {tab.map((item) => {
            return (
              <>
                <Tab
                  key={item.key}
                  className={({ selected }) => {
                    return classNames(
                      "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg ",
                      "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-indigo-400 ring-white ring-opacity-60",
                      selected
                        ? "bg-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    );
                  }}
                >
                  {item.name}
                </Tab>
              </>
            );
          })}
        </Tab.List>

        <Tab.Panels className="mt-2">
          {tab.map((item) => {
            return (
              <>
                <Tab.Panel key={item.key} className="bg-white">
                  {item.children}
                </Tab.Panel>
              </>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
