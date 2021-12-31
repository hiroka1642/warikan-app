
type Props = {
  children: any;
};

export const Layout: React.VFC<Props> = (props) => {
  return (
    <>
    <div className="w-full h-screen">
    {props.children}

    </div>
  
    </>
  );
};
