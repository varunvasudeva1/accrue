"use client";
import { RxCheckCircled, RxChevronDown } from "react-icons/rx";
import { Listbox, Transition } from "@headlessui/react";
import { models } from "@/constants";
import { Model } from "@/types";

export default function ModelSwitcher({
  model,
  setModel,
}: {
  model: Model;
  setModel: (model: Model) => void;
}) {
  return (
    <Listbox
      as="div"
      className="bg-zinc-900 rounded-md self-end"
      value={model.value}
      onChange={(value) => {
        const newModel = models.find((option) => option.value === value);
        if (newModel) {
          setModel(newModel);
        }
      }}
    >
      <Listbox.Button className="flex flex-row justify-between items-center p-2 text-left text-white space-x-2 w-40">
        <span className="text-md lg:text-lg font-semibold text-purple-200">
          {model.name}
        </span>
        <RxChevronDown />
      </Listbox.Button>
      <Transition
        enter="transition ease-in-out duration-300 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in-out duration-100 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Listbox.Options className="space-y-1">
          {models.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              className={({ active }) =>
                `${
                  active
                    ? "text-white bg-purple-400 bg-opacity-40"
                    : "text-gray-200"
                } cursor-default select-none relative rounded-md px-2 py-1`
              }
            >
              {({ selected }) => (
                <div className="flex flex-row justify-between items-center">
                  <span className="block truncate">{option.name}</span>
                  {selected ? (
                    <RxCheckCircled className="text-purple-200" />
                  ) : null}
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
