import { useRouter } from "next/dist/client/router";
import { ListIcon, LogoutIcon, NewList } from "./Atom/Icon";
import { LogoutComponent } from "./Atom/LogoutLink";
import { Menu } from "./Menu";

export const Header: React.VFC = () => {
  const router = useRouter();

  const handleRouter = (url: string) => {
    router.push(url);
  };

  return (
    <>
      <div className="sm:invisible visible ">
        <Menu />
      </div>

      <div className=" sm:visible invisible ">
        <header
          className=" sm:flex-row flex  justify-between bg-white
                text-blue-800 bg-opacity-30  p-12  h-auto w-screen fixed top-0"
        >
          <div className="flex flex-row  gap-6 ml-2  w-max">
            <button
              className="flex h-auto items-center"
              // eslint-disable-next-line arrow-body-style
              onClick={() => handleRouter("/ProjectList.page")}
            >
              <ListIcon color={"rgba(30, 64, 175)"} />
              チーム一覧
            </button>

            <button
              className="flex h-auto items-center"
              // eslint-disable-next-line arrow-body-style
              onClick={() => handleRouter("/NewProject")}
            >
              <NewList color={"rgba(30, 64, 175)"} />
              新規チーム作成
            </button>
          </div>
          <div className="h-auto items-center">
            <LogoutComponent icon={<LogoutIcon color={"rgba(30, 64, 175)"} />}>
              ログアウト
            </LogoutComponent>
          </div>
        </header>
      </div>
    </>
  );
};
