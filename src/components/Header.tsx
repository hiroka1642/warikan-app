import { ListIcon, LogoutIcon, NewList } from "./Icon";
import { LinkComponent } from "./Link";
import { LogoutComponent } from "./LogoutLink";

export const Header = () => {
  return (
    <>
      <header className=" flex-row flex justify-between bg-white text-blue-800 bg-opacity-30 relative">
        <div className="flex flex-row gap-6 ml-4  w-max">
          <LinkComponent icon={<ListIcon color={"rgba(30, 64, 175)"} />}>
            チーム一覧
          </LinkComponent>
          <LinkComponent icon={<NewList color={"rgba(30, 64, 175)"} />}>
            新規チーム作成
          </LinkComponent>
        </div>
        <div className="p-10">
          <LogoutComponent icon={<LogoutIcon color={"rgba(30, 64, 175)"} />}>
            ログアウト
          </LogoutComponent>
        </div>
      </header>
    </>
  );
};
