import { useRouter } from "next/dist/client/router";
import { ListIcon, LogoutIcon, NewList } from "../Atom/Icons";
import { LinkButton } from "../Atom/LinkButton";
import { Menu } from "../Organisms/Menu";
import { client } from "src/libs/supabase";

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
      <div className="sm:invisible visible ">
        <Menu />
      </div>

      <div className=" sm:visible invisible ">
        <header className=" sm:flex-row flex  justify-between font-normal text-lg bg-indigo-600 text-white px-12 w-screen fixed top-0 ">
          <div className="flex flex-row ">
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
                return handleRouter("/ProjectList.page");
              }}
            >
              <NewList color={"white"} />
              <p>新規チーム作成</p>
            </LinkButton>
          </div>
          <div className="flex ">
            <div className="text-white font-bold text-2xl p-7">
              みんなでわりかん。
            </div>
            <LinkButton onClick={handleLogout}>
              <p>ログアウト</p>
              <LogoutIcon color={"white"} />
            </LinkButton>
          </div>
        </header>
      </div>
    </>
  );
};
