import type { ReactNode } from "react";
import { Auth } from "@supabase/ui";
import { Rogin } from "src/components/Templates/Rogin";
import { useRouter } from "next/dist/client/router";

type Props = {
  children: ReactNode;
};

const Container = (props: Props) => {
  const { user } = Auth.useUser();
  const router = useRouter();
  if (user) {
    // return <ProjectPage />;
    router.push("/ProjectList.page");
  }
  return <>{props.children}</>;
};

export default function Home() {
  return (
    <>
      <Container>
        <Rogin />
      </Container>
    </>
  );
}
