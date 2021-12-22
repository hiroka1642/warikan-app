import { Box } from "@chakra-ui/layout";

type Props = {
  children: any;
};

export const Layout: React.VFC<Props> = (props) => {
  return (
    <>
      <Box
        backgroundImage="url(.//AfterLoginBackgroundImage.jpg)"
        height="100vh"
        width="100"
        backgroundSize="cover"
        backgroundColor="rgba(255,255,255,0.3)"
        backgroundBlendMode="lighten"
      >
        {props.children}
      </Box>
    </>
  );
};
