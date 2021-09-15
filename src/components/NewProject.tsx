import { Select } from "@chakra-ui/react";
import { useState } from "react";
import { ButtonComponent } from "./button";
import { InputComponent } from "./Input";

export const NewProject = () => {
  const handleProject = () => {
    // console.log(value);
    // console.log(selectedValue);
  };

  const [value, setInputvalue]: any = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleInputvalueChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  return (
    <>
      <div className="p-24 text-center ">
        <h2 className="text-2xl">新規プロジェクト作成</h2>
        <InputComponent value={value} setInputvalue={setInputvalue}>
          プロジェクト名
        </InputComponent>
        <div>
          <Select
            placeholder="人数を選択してください"
            value={selectedValue}
            onChange={handleInputvalueChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Select>
        </div>
        <ButtonComponent
          color="blue"
          href={"./Mainpage"}
          onClick={handleProject}
        >
          作成
        </ButtonComponent>
      </div>
    </>
  );
};
