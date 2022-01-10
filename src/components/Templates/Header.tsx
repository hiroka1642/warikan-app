import { useRouter } from "next/dist/client/router";
import { ListIcon, LogoutIcon, NewList } from "../Atom/Icons";
import { LinkButton } from "../Atom/LinkButton";
import { client } from "src/libs/supabase";
import { SidePanelBasic } from "../Organisms/Menu";

export const Header: React.VFC = () => {
  const router = useRouter();

  const handleRouter = (url: string) => {
    router.push(url);
  };

  const handleLogout = () => {
    client.auth.signOut();
    router.push("/");
  };

  return (
    <>
      <header className="sm:invisible visible  bg-indigo-600 text-white px-3 w-screen fixed top-0 z-20">
        <SidePanelBasic />
      </header>

      <header className="sm:visible invisible flex  justify-between  font-normal text-base bg-indigo-600 text-white px-12 w-screen fixed top-0 z-20">
        <div className="flex items-center ">
          <LinkButton
            // eslint-disable-next-line react/jsx-handler-names
            onClick={() => {
              return handleRouter("/ProjectList.page");
            }}
          >
            <ListIcon color={"white"} />
            <p>チーム一覧</p>
          </LinkButton>

          <LinkButton
            // eslint-disable-next-line react/jsx-handler-names
            onClick={() => {
              return handleRouter("/NewProject");
            }}
          >
            <NewList color={"white"} />
            <p>新規チーム作成</p>
          </LinkButton>
        </div>
        <div className="flex items-center ">
          <div className="text-white font-bold text-2xl  p-7 whitespace-nowrap">
            みんなでわりかん。
          </div>
          <LinkButton onClick={handleLogout}>
            <p>ログアウト</p>
            <LogoutIcon color={"white"} />
          </LinkButton>
        </div>
      </header>
    </>
  );
};
