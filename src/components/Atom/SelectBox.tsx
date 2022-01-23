import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

type Props = {
  items: string[] | number[];
  onChange: (value: number | null) => void;
  value: number | null;
  className?: string;
};

export const SelectBox = (props: Props) => {
  return (
    <div className={`${props.className}`}>
      <Listbox value={props.value} onChange={props.onChange}>
        <div className="relative mt-1 ">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg ring-1 ring-gray-300 focus:ring-indigo-500 cursor-default  sm:text-sm">
            <span className="block truncate">
              {props.value !== null
                ? props.items[props.value] || props.value + 1
                : "選択してください"}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full z-10 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {props.items.map((item: string | number, idx: number) => {
                return (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) => {
                      return `${
                        active
                          ? "text-indigo-900 bg-indigo-100"
                          : "text-gray-900"
                      }
                          cursor-default select-none relative py-2 pl-10 pr-4`;
                    }}
                    value={idx}
                  >
                    {({ active }) => {
                      return (
                        <>
                          <span
                            className={`${
                              active ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {item}
                          </span>
                          {active ? (
                            <span
                              className={`${
                                active ? "text-indigo-600" : "text-indigo-600"
                              }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      );
                    }}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
