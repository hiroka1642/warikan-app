import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { client } from "src/libs/supabase";
import { ModalComponent } from "./Modal";
import { SettlementListItem } from "./SettlementListItem";

export const NeedPayList = (props) => {
  const [open, setOpen] = useState(false);
  const [Sum, setSum] = useState(0);

  const handleChangeT = () => {
    setOpen(true);
  };

  const handleChangeF = () => {
    setOpen(false);
  };

  const [list, setList] = useState([]);
  //支払い金額の取得
  useEffect(() => {
    SettlementList();
  }, [props, open, Sum]);

  const SettlementList = useCallback(async () => {
    const { data, error } = await client
      .from("Settlement_list")
      .select("*")
      .eq("projectId", props.project[2])
      .eq("id", props.id);
    if (error) {
      alert(error);
    } else {
      setList(data);

      const sumArray = (array) => {
        let sum = 0;
        for (let i = 0; i < data?.length; i++) {
          sum += array[i].money;
        }
        return sum;
      };

      setSum(sumArray(data));
      // if (Project_name) {
      //   setProject([
      //     Project_name[0].propject_name,
      //     Project_name[0].member,
      //     Project_name[0].project_id,
      //   ]);
      //   setOnProject(true);
    }
  }, [props, open, Sum]);

  return (
    <>
      <div className="text-right ">
        <div className="flex justify-between py-1 ">
          <div className="flex">
            <div className="text-4xl text-center w-14">{props.id}</div>
            <ModalComponent project={props.project} id={props.id} />
          </div>
          <div className="text-4xl">{Sum}</div>
          {open ? (
            <ChevronUpIcon className="text-4xl" onClick={handleChangeF} />
          ) : (
            <ChevronDownIcon className="text-4xl" onClick={handleChangeT} />
          )}
        </div>
        {open ? <SettlementListItem list={list} /> : null}
      </div>
    </>
  );
};
