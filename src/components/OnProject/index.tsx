import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { client } from "src/libs/supabase";
import { ButtonComponent } from "../button";
import { ModalComponent } from "../Modal";
import { NeedPayList } from "../NeedPayList";
import { SettlementListItem } from "../SettlementListItem";

type Props = {
  project: any;
};

export const OnProject = (props: Props) => {
  const membername = [...Array(props.project[1])].map((_, i) => i);

  //IDをもとに名前を作成

  const handleDelete = async () => {
    const { data: project_name, error: project_name_error } = await client
      .from("Project_name")
      .delete()
      .eq("project_id", props.project[2]);

    const { data: List_paid, error: List_paid_error } = await client
      .from("List_paid")
      .delete()
      .eq("project_id", props.project[2]);

    const { data: Settlement_list, error: Settlement_list_error } = await client
      .from("Settlement_list")
      .delete()
      .eq("projectId", props.project[2]);

    props.setOnProject();
  };

  return (
    <>
      <p className="text-4xl text-center py-12">{props.project[0]}</p>

      <ul className="w-80 m-auto">
        {membername.map((i) => {
          return <NeedPayList project={props.project} id={i} key={i} />;
        })}
        {/* <div className="text-right">
          <div className="flex justify-between ">
            <div className="flex">
              <div className="text-4xl">A</div>
              <ModalComponent project={props.project} id={1} />
            </div>
            <div className="text-4xl">2000円</div>
            {open ? (
              <ChevronUpIcon className="text-4xl" onClick={handleChangeF} />
            ) : (
              <ChevronDownIcon className="text-4xl" onClick={handleChangeT} />
            )}
          </div>
          {open ? <SettlementListItem project={props.project} id={2} /> : null}
        </div> */}
      </ul>

      <div className="text-center mt-12">
        <ButtonComponent onClick={handleDelete}>削除</ButtonComponent>
      </div>
    </>
  );
};
