import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Layout: React.VFC<Props> = (props) => {
  return (
    <>
      <div className="sm:w-2/3 max-w-screen-sm w-4/5 h-screen mt-24 m-auto text-center">
        {props.children}
      </div>
    </>
  );
};
