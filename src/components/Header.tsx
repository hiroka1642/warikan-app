import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { ListIcon, LogoutIcon, NewList } from "./Atom/Icon";
import { LogoutComponent } from "./Atom/LogoutLink";

type Props = {
  setNewProject: Dispatch<SetStateAction<boolean>>;
};

export const Header: React.VFC<Props> = (props) => {
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);

  const handleNewProject = () => {
    props.setNewProject(false);
  };

  const handleProjectList = () => {
    props.setNewProject(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };
  const handleMenuOpem = () => {
    setOpenMenu(true);
  };

  return (
    <>
      {isOpenMenu ? (
        <div>
          <header className=" sm:flex-row flex flex-col justify-between bg-white sm:text-blue-800 bg-opacity-30  sm:p-12 w-36 h-full sm:h-auto sm:w-screen fixed top-0 ">
            <div className="flex sm:flex-row flex-col sm:gap-6 sm:ml-2  sm:w-max">
              <button className="text-left p-1 sm:invisible">
                <CloseIcon
                  width="40px"
                  height="40px"
                  onClick={handleMenuClose}
                />
              </button>
              <button
                className="flex h-20 sm:h-auto"
                onClick={handleNewProject}
              >
                <ListIcon color={"rgba(30, 64, 175)"} />
                チーム一覧
              </button>
              <button
                className="flex h-20 sm:h-auto"
                onClick={handleProjectList}
              >
                <NewList color={"rgba(30, 64, 175)"} />
                新規チーム作成
              </button>
            </div>
            <div className="h-24 sm:h-auto">
              <LogoutComponent
                icon={<LogoutIcon color={"rgba(30, 64, 175)"} />}
              >
                ログアウト
              </LogoutComponent>
            </div>
          </header>
        </div>
      ) : (
        <div>
          <button className="sm:invisible top-0 fixed" onClick={handleMenuOpem}>
            <HamburgerIcon width="45px" height="45px" />
          </button>
          <div className=" sm:visible invisible ">
            <header
              className=" sm:flex-row flex  justify-between bg-white
                text-blue-800 bg-opacity-30  p-12  h-auto w-screen fixed top-0"
            >
              <div className="flex flex-row  gap-6 ml-2  w-max">
                <button className="flex h-auto" onClick={handleNewProject}>
                  <ListIcon color={"rgba(30, 64, 175)"} />
                  チーム一覧
                </button>
                <button className="flex h-auto" onClick={handleProjectList}>
                  <NewList color={"rgba(30, 64, 175)"} />
                  新規チーム作成
                </button>
              </div>
              <div className="h-auto">
                <LogoutComponent
                  icon={<LogoutIcon color={"rgba(30, 64, 175)"} />}
                >
                  ログアウト
                </LogoutComponent>
              </div>
            </header>
          </div>
        </div>
      )}
    </>
  );
};
