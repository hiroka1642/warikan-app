import { SelectBox } from "../Atom/SelectBox";

type Props = {
  onChange: any;
  value: any;
  items: any;
  name?: string;
};

export const SelectBoxWithLabel = (props: Props) => {
  return (
    <>
      <label className="text-sm text-gray-700 block mb-1 font-medium text-justify">
        {props.name}
        <SelectBox
          value={props.value}
          items={props.items}
          // eslint-disable-next-line react/jsx-handler-names
          onChange={props.onChange}
        />
      </label>
    </>
  );
};
