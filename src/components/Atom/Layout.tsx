type Props = {
  children: any;
};

export const Layout: React.VFC<Props> = (props) => {
  return (
    <>
      <div className="sm:w-3/5 w-4/5 h-screen mt-24 m-auto text-center">{props.children}</div>
    </>
  );
};
