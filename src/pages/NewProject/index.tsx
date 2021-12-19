import { useCallback } from "react";
import { useState } from "react";
import { client } from "src/libs/supabase";
import { InputComponent } from "src/components/Atom/Input";
import { ButtonComponent } from "src/components/Atom/button";
import { Header } from "src/components/Header";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { SelectComponent } from "src/components/Atom/Select";

const NewProject: React.VFC = () => {
  const router = useRouter();
  const [value, setInputvalue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<number | undefined>(
    undefined
  );

  const onhandleInputvalueChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  const handleProject = useCallback(async () => {
    //[null,null,null....]
    const username = [];
    for (let i = 0; i < Number(selectedValue); i++) {
      username.push(null);
    }

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
  }, [selectedValue, value, router]);

  return (
    <>
      <Box
        backgroundImage="url(.//AfterLoginBackgroundImage.jpg)"
        backgroundSize="cover"
        backgroundColor="rgba(255,255,255,0.3)"
        backgroundBlendMode="lighten"
      >
        <Header />
        <div className="py-60 px-10 text-center h-screen ">
          <h2 className="text-2xl mb-14 ">新規プロジェクト作成</h2>
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
      </Box>
    </>
  );
};

export default NewProject;
