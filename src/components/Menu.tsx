import { useDisclosure } from "@chakra-ui/hooks";
import { ListIcon, LogoutIcon, NewList } from "./Atom/Icon";
import { useRouter } from "next/dist/client/router";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { LogoutComponent } from "./Atom/LogoutLink";
import { HamburgerIcon } from "@chakra-ui/icons";

export const Menu = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnOpen = () => {
    onOpen();
  };

  const handleOnClose = () => {
    onClose();
  };
  const handleRouter = (url: string) => {
    router.push(url);
  };

  return (
    <>
      <button className="sm:invisible top-0 fixed" onClick={handleOnOpen}>
        <HamburgerIcon width="45px" height="45px" />
      </button>

      <Drawer placement="left" onClose={handleOnClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col ">
                <button
                  className="flex h-20 items-center"
                  // eslint-disable-next-line arrow-body-style
                  onClick={() => handleRouter("/NewProject")}
                >
                  <ListIcon color={"rgba(30, 64, 175)"} />
                  チーム一覧
                </button>
                <button
                  className="flex h-20 items-center"
                  // eslint-disable-next-line arrow-body-style
                  onClick={() => handleRouter("/Project.page")}
                >
                  <NewList color={"rgba(30, 64, 175)"} />
                  新規チーム作成
                </button>
              </div>
              <div className=" flex h-24 items-center ">
                <LogoutComponent
                  icon={<LogoutIcon color={"rgba(30, 64, 175)"} />}
                >
                  ログアウト
                </LogoutComponent>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
