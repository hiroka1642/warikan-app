import { EditIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";
import { LinkComponent } from "./Link";
import { LogoutComponent } from "./LogoutLink";

export const Header = () => {
  return (
    <>
      <header className="py-12 flex-row flex justify-between bg-pink-300 relative">
        <div className="flex flex-row gap-20 px-20 w-max">
          <LinkComponent icon={<EditIcon />}>チーム一覧</LinkComponent>
          <LinkComponent icon={<EditIcon />}>新規チーム作成</LinkComponent>
        </div>
        <div className="px-40">
          <LogoutComponent icon={<EditIcon />}>ログアウト</LogoutComponent>
        </div>
      </header>
    </>
  );
};
