import { Select } from "@chakra-ui/react";
import { useCallback } from "react";
import { useState } from "react";
import { client } from "src/libs/supabase";
import { InputComponent } from "src/components/Atom/Input";
import { ButtonComponent } from "src/components/Atom/button";
import { Header } from "src/components/Header";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";


const NewProject: React.VFC = () => {
  const router = useRouter();
  const [value, setInputvalue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleInputvalueChange = (e: any) => {
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
        throw "project name is primary";
      }
      if (selectedValue == "") {
        throw "Hom many people?";
      }
      const { data: projectdata, error: projecterror } = await client
        .from("Project_name")
        // eslint-disable-next-line @typescript-eslint/naming-convention
        .insert([
          {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            propject_name: value,
            member: selectedValue,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Username: username,
          },
        ]);
      if (projectdata) {
        router.push("/ProjectPage");
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
        <div className="py-60 px-10 text-center">
          <h2 className="text-2xl mb-14">新規プロジェクト作成</h2>
          <div className=" max-w-xl m-auto flex justify-between flex-col gap-y-8">
            <InputComponent value={value} setInputvalue={setInputvalue}>
              プロジェクト名
            </InputComponent>
            <Select
              placeholder="人数を選択してください"
              value={selectedValue}
              onChange={handleInputvalueChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Select>

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
