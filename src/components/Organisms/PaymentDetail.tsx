import { useState } from "react";
import { PaymentList } from "./PaymentList";

type Props = {
  project: any;
  nameArr: any;
};
export const PaymentDetail = (props: Props) => {
  const [hasAdd, setAdd] = useState(false);

  return (
    <>
      {props.nameArr.map((i: any, key: any) => {
        return (
          <PaymentList
            project={props.project}
            id={key}
            name={i}
            key={key}
            nameArr={props.nameArr}
            hasAdd={hasAdd}
            setAdd={setAdd}
          />
        );
      })}
    </>
  );
};
