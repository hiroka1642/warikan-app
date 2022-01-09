import { Tab } from "@headlessui/react";
import { RebuildingList } from "../Molecules/RebuildingList";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

type Props = {
  project: any;
  nameid: string[];
};

export const PaymentTabs = (props: Props) => {
  return (
    <div className="w-full px-2 py-4 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-2 space-x-1 bg-indigo-400 rounded-xl">
          <Tab
            key={1}
            className={({ selected }) => {
              return classNames(
                "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg ",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              );
            }}
          >
            たてかえ一覧
          </Tab>
          <Tab
            key={2}
            className={({ selected }) => {
              return classNames(
                "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                selected
                  ? "bg-white shadow"
                  : "text-blue-900 hover:bg-white/[0.12] hover:text-white"
              );
            }}
          >
            精算
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            key={1}
            className={classNames(
              "bg-white rounded-xl p-3",
              "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
            )}
          >
            <ul>
              <RebuildingList project={props.project} nameid={props.nameid} />
            </ul>
          </Tab.Panel>
          <Tab.Panel
            key={2}
            className={classNames(
              "bg-white rounded-xl p-3",
              "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
            )}
          >
            <ul>
              <div>iiii</div>
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
