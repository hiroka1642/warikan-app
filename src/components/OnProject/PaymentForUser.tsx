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
      <tr onClick={handleOpen}>
        <td className="px-3">{props.li | props.number}へ</td>
        <td className="px-3">{props.sum}円</td>
      </tr>
      {isOpen === true ? (
        // eslint-disable-next-line react/jsx-handler-names
        <SettlementListItem list={props.userList} handleOpen={onhandleOpen} />
      ) : null}
    </>
  );
};
