import { ListIcon, LogoutIcon, NewList } from "./Atom/Icon";
import { LogoutComponent } from "./Atom/LogoutLink";

type Props = {
  setNewProject(which: boolean): void;
};

export const Header = (props: Props) => {
  const handleNewProject = () => {
    props.setNewProject(false);
  };

  const handleProjectList = () => {
    props.setNewProject(true);
  };

  return (
    <>
      <header className=" flex-row flex justify-between bg-white text-blue-800 bg-opacity-30 relative p-12">
        <div className="flex flex-row gap-6 ml-4  w-max">
          <button className="flex" onClick={handleNewProject}>
            <ListIcon color={"rgba(30, 64, 175)"} />
            チーム一覧
          </button>
          <button className="flex" onClick={handleProjectList}>
            <NewList color={"rgba(30, 64, 175)"} />
            新規チーム作成
          </button>
        </div>
        <LogoutComponent icon={<LogoutIcon color={"rgba(30, 64, 175)"} />}>
          ログアウト
        </LogoutComponent>
      </header>
    </>
  );
};
