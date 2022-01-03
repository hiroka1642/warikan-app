type Props = {
  children: any;
};

export const Layout: React.VFC<Props> = (props) => {
  return (
    <>
      <div className="w-2/3 h-screen mt-24 m-auto text-center">{props.children}</div>
    </>
  );
};
