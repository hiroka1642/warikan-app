import type { ReactNode } from "react";
import { Auth } from "@supabase/ui";
import { client } from "src/libs/supabase";
import { Top } from "src/components/Top";
import { NewProjectPage } from "../components/NewProjectPage";

type Props = {
  children: ReactNode;
};

const Container = (props: Props) => {
  const { user } = Auth.useUser();
  if (user) {
    return <NewProjectPage />;
  }
  return <>{props.children}</>;
};

export default function Home() {
  return (
    <>
      <Auth.UserContextProvider supabaseClient={client}>
        <Container>
          <Top />
        </Container>
      </Auth.UserContextProvider>
    </>
  );
}
