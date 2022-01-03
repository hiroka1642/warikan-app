type Props = {
  children: string;
};

export const Title = (props: Props) => {
  return (
    <h2 className="text-2xl font-bold text-gray-700 pt-16">{props.children}</h2>
  );
};
