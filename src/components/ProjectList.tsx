import { useRouter } from "next/dist/client/router";
import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";

import { useCallback } from "react";
import { client } from "src/libs/supabase";
import { ButtonComponent, ListButtonComponent } from "./Atom/button";

type Props = {
  setList: Dispatch<SetStateAction<string[]>>;
  list: string[];
};

export const Projects: React.VFC<Props> = (props) => {
  const router = useRouter();
  const handleNewProjectPage = useCallback(() => {
    router.push("/NewProject");
  }, [router]);

  //リストを取得する
  const ProjectList = useCallback(async () => {
    try {
      const { data: Projects, error } = await client
        .from("Projects")
        .select("*");
      if (Projects) {
        const items: any = [];
        for (let i = 0; i < Projects.length; i++) {
          items.push({
            name: Projects[i].projectName,
            member: Projects[i].member,
            id: Projects[i].projectId,
          });
        }
        props.setList([...items]);
      }
      if (error) {
        throw error;
      }
    } catch (e) {
      alert(e);
    }
  }, [props]);

  useEffect(() => {
    ProjectList();
  }, [ProjectList]);

  const handleClick = async (id: any) => {
    router.push({
      pathname: "/Project.page", //URL
      query: { input: id }, //検索クエリ
    });
  };

  return (
    <>
      <div className=" text-center m-auto  px-3 pt-12 sm:pt-52 ">
        <h2 className="text-2xl">チーム一覧</h2>
        <ul className=" mx-auto max-w-xl my-10  ">
          {props.list?.map((li: any, key: any) => {
            return (
              <li className="text-xl my-4 w-full" key={key}>
                <ListButtonComponent
                  color="gray.600"
                  // eslint-disable-next-line react/jsx-handler-names
                  onClick={() => {
                    return handleClick(li.id);
                  }}
                >
                  {li.name}
                </ListButtonComponent>
              </li>
            );
          })}
        </ul>
        <ButtonComponent color="blue" onClick={handleNewProjectPage}>
          新規プロジェクト
        </ButtonComponent>
      </div>
    </>
  );
};
