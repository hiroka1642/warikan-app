import { useState } from "react";
import type { ProjectTypes } from "src/types";
import { PaymentList } from "./PaymentList";

type Props = {
  project: ProjectTypes;
  nameArr: string[];
};
export const PaymentDetail = (props: Props) => {
  const [hasAdd, setAdd] = useState(false);

  return (
    <>
      {props.nameArr.map((i: string, key: number) => {
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
