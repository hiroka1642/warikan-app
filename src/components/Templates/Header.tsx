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
        <header
          className=" sm:flex-row flex  justify-between bg-white
              bg-opacity-30  p-12  h-auto w-screen fixed top-0"
        >
          <div className="flex flex-row  gap-6 ">
            <LinkButton
              // eslint-disable-next-line react/jsx-handler-names
              onClick={() => {
                return handleRouter("/ProjectList.page");
              }}
            >
              <ListIcon color={"rgba(30, 64, 175)"} />
              チーム一覧
            </LinkButton>

            <LinkButton
              // eslint-disable-next-line react/jsx-handler-names
              onClick={() => {
                return handleRouter("/ProjectList.page");
              }}
            >
              <NewList color={"rgba(30, 64, 175)"} />
              新規チーム作成
            </LinkButton>
          </div>
          <div>みんなでわりかん。</div>
            <LinkButton onClick={handleLogout}>
              <p>ログアウト</p>
              <LogoutIcon color={"rgba(30, 64, 175)"} />
            </LinkButton>
        </header>
      </div>
    </>
  );
};
