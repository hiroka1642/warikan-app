import type { MouseEventHandler } from "react";

type Props = {
  children: any;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

export const LinkButton: React.VFC<Props> = (props) => {
  return (
    <button className="flex gap-1 items-center" onClick={props.onClick}>
      {props.children}
    </button>
  );
};
