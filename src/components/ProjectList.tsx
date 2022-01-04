import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useEffect } from "react";

import { useCallback } from "react";
import { client } from "src/libs/supabase";
import { ListButtonComponent } from "./Atom/button";

export const ProjectList: React.VFC = () => {
  const router = useRouter();
  const [list, setList] = useState<string[]>([]);

  //リストを取得する
  const GetProjectList = useCallback(async () => {
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
        setList([...items]);
      }
      if (error) {
        throw error;
      }
    } catch (e) {
      alert(e);
    }
  }, []);

  useEffect(() => {
    GetProjectList();
  }, [GetProjectList]);

  const handleClick = async (id: any) => {
    router.push(`/Project.page/${id}`);
  };

  return (
    <>
      <div>
        <ul className="mx-auto max-w-2xl w-full my-10">
          {list?.map((li: any, key: any) => {
            return (
              <li className="m-2" key={key}>
                <ListButtonComponent
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
      </div>
    </>
  );
};
