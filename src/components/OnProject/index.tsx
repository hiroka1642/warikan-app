type Props = {
  project: string;
};

export const OnProject = (props: Props) => {
  return (
    <>
      <div>{props.project}</div>
    </>
  );
};
