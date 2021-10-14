import { Select } from "@chakra-ui/react";
import { useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { ButtonComponent } from "../Atom/button";
import { InputComponent } from "../Atom/Input";
import { client } from "src/libs/supabase";

type Props = {
  setNewProject: Dispatch<SetStateAction<boolean>>;
  setList: Dispatch<SetStateAction<string[]>>;
};

export const NewProject = (props: Props) => {
  const [value, setInputvalue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleInputvalueChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  const handleProject = useCallback(async () => {
    const username = [];
    for (let i = 0; i < Number(selectedValue); i++) {
      username.push(null);
    }
    //プロジェクト作成
    if (value == "") {
      alert("Input title.");
      return;
    }
    if (selectedValue == "") {
      alert("select member.");
      return;
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
    if (projecterror) {
      alert(projecterror);
    } else {
      if (projectdata) {
        props.setNewProject(() => {
          return false;
        });
      }
    }
  }, [value, selectedValue, props]);

  return (
    <>
      <div className="p-24 text-center">
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
    </>
  );
};
