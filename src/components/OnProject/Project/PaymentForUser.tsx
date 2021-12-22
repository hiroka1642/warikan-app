import { useState } from "react";
import { SettlementListItem } from "./SettlementListItem";

type Props = {
  li: any;
  sum: number;
  userList: any;
  number: number;
};
export const PaymentForUser = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const onhandleOpen = () => {
    setIsOpen(false);
  };

  return (
    <>
      <tr
        onClick={handleOpen}
        className="hover:text-blue-600 font-bold cursor-pointer"
      >
        <td className="px-3">{props.li}へ</td>
        <td className="px-3">{props.sum}円</td>
      </tr>
      {isOpen === true ? (
        <SettlementListItem list={props.userList} handleOpen={onhandleOpen} />
      ) : null}
    </>
  );
};
