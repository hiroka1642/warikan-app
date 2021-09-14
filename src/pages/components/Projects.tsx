import { Box, Button } from "@chakra-ui/react";
import { ButtonComponent } from "./button";

export const Projects = () => {
  return (
    <>
      <div className="p-24 text-center ">
        <h2 className="text-2xl">チーム一覧</h2>
        <ul className="w-96 mx-auto my-10  ">
          <li className="text-xl my-4">
            <Box
              as="button"
              borderRadius="md"
              border="2px"
              borderColor="green"
              bg="white"
              color="gray"
              w="full"
              h={14}
              textAlign="left"
              paddingLeft={3}
            >
              富士急
            </Box>
          </li>
          <ButtonComponent color="red" href={"./NewProjectPage"}>
            新規プロジェクト
          </ButtonComponent>
        </ul>
      </div>
    </>
  );
};
