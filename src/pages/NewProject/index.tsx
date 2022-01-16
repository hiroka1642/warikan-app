import { useCallback } from "react";
import { useState } from "react";
import { client } from "src/libs/supabase";
import { ButtonComponent } from "src/components/Atom/button";
import { Header } from "src/components/Templates/Header";
import { useRouter } from "next/dist/client/router";
import { Layout } from "src/components/Atom/Layout";
import { Auth } from "@supabase/ui";
import { Title } from "src/components/Atom/Title";
import { InputWithLabel } from "src/components/Molecules/InputWithLabel";
import { SelectBox } from "src/components/Atom/SelectBox";

const NewProject: React.VFC = () => {
  const numberOfPeople = [...Array(20)].map((_, i: number) => {
    return ++i;
  });
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();
  const [value, setInputvalue] = useState<string>("");
  const { user } = Auth.useUser();

  const username = [...Array(Number(selected))].map((_, i: number) => {
    return ++i;
  });

  const handleSetInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputvalue(e.target.value);
  };

  const handleProject = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      //プロジェクト作成
      if (value == "") {
        throw "プロジェクト名が空白です";
      }
      if (selected == null) {
        throw "人数を入力してください";
      }
      const { data: projectdata, error: projecterror } = await client
        .from("Projects")
        .insert([
          {
            projectName: value,
            member: selected,
            userName: username,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            user_id: user.id,
          },
        ]);
      if (projectdata) {
        router.push({
          pathname: "/ProjectList.page", //URL
          query: { input: projectdata[0].projectId }, //検索クエリ
        });
      }
      if (projecterror) {
        throw projecterror;
      }
    } catch (e) {
      alert(e);
    }
  }, [user, value, selected, username, router]);

  return (
    <>
      <Header />
      <Layout>
        <Title isBackButton>新規グループ作成</Title>
        <div className=" max-w-xl m-auto py-24 flex gap-10 flex-col">
          <InputWithLabel
            name="グループ名"
            value={value}
            onChange={handleSetInputValue}
            placeholder="グループ名を入力してください"
          />
          <div className="text-sm text-gray-700 block mb-1 font-medium text-justify">
            <p>人数</p>
            <SelectBox
              items={numberOfPeople}
              // eslint-disable-next-line react/jsx-handler-names
              onChange={setSelected}
              value={selected}
            />
          </div>
        </div>
        <ButtonComponent onClick={handleProject} className="w-1/3">
          作成
        </ButtonComponent>
      </Layout>
    </>
  );
};

export default NewProject;
