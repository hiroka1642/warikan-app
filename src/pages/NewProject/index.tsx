import { useCallback } from "react";
import { useState } from "react";
import { client } from "src/libs/supabase";
import { InputComponent } from "src/components/Atom/Input";
import { ButtonComponent } from "src/components/Atom/button";
import { Header } from "src/components/Templates/Header";
import { useRouter } from "next/dist/client/router";
import { SelectComponent } from "src/components/Atom/Select";
import { Layout } from "src/components/Atom/Layout";
import { Auth } from "@supabase/ui";
import { Title } from "src/components/Atom/Title";

const NewProject: React.VFC = () => {
  const router = useRouter();
  const [value, setInputvalue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<number | undefined>(
    undefined
  );
  const { user } = Auth.useUser();

  const onhandleInputvalueChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  const handleProject = useCallback(async () => {
    if (!user) {
      return;
    }
    //[1,2,3,4..]
    const username = [...Array(Number(selectedValue))].map((_, i: number) => {
      return ++i;
    });

    try {
      //プロジェクト作成
      if (value == "") {
        throw "プロジェクト名が空白です";
      }
      if (selectedValue == null) {
        throw "人数を入力してください";
      }
      const { data: projectdata, error: projecterror } = await client
        .from("Projects")
        .insert([
          {
            projectName: value,
            member: selectedValue,
            userName: username,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            user_id: user.id,
          },
        ]);
      if (projectdata) {
        router.push({
          pathname: "/Project.page", //URL
          query: { input: projectdata[0].projectId }, //検索クエリ
        });
      }
      if (projecterror) {
        throw projecterror;
      }
    } catch (e) {
      alert(e);
    }
  }, [user, selectedValue, value, router]);

  return (
    <>
      <Header />
      <Layout>
        <Title>新規プロジェクト作成</Title>
        <div className="py-60 px-10 text-center">
          <div className=" max-w-xl m-auto flex justify-between flex-col gap-y-8">
            <InputComponent value={value} setInputvalue={setInputvalue}>
              プロジェクト名
            </InputComponent>
            <SelectComponent
              value={selectedValue}
              placeholder="人数を選択してください"
              handleInputvalueChange={onhandleInputvalueChange}
              numberOfPeople={10}
            />
            <ButtonComponent color="blue" onClick={handleProject}>
              作成
            </ButtonComponent>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NewProject;
