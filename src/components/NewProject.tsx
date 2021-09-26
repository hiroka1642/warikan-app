import { Select } from "@chakra-ui/react";
import { useCallback } from "react";
import { useState } from "react";
import { ButtonComponent } from "./button";
import { InputComponent } from "./Input";
import { client } from "src/libs/supabase";

type Props = {
  setNewProject: any;
  setList: any;
};

export const NewProject = (props: Props) => {
  const [value, setInputvalue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleInputvalueChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  const handleProject = useCallback(async () => {
    if (value == "") {
      alert("Input title.");
      return;
    }
    const { data, error } = await client
      .from("Project_name")
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .insert([{ propject_name: value, member: selectedValue }]);
    if (error) {
      alert(error);
    } else {
      if (data) {
        props.setNewProject(false);
        props.setList((list: string[]) => {
          [...list, value];
        });
      }
    }
  }, [value, selectedValue, props]);

  return (
    <>
      <div className="p-24 text-center">
        <h2 className="text-2xl mb-14">新規プロジェクト作成</h2>
        <div className="w-96 m-auto flex justify-between flex-col gap-y-8">
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
          </Select>
          <ButtonComponent color="blue" onClick={handleProject}>
            作成
          </ButtonComponent>
        </div>
      </div>
    </>
  );
};
