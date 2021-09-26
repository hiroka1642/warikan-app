import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { AddPayment } from "./AddPayment";

export const ModalComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [add, setAdd] = useState(false);
  const [value, setInputvalue] = useState("");

  const handleAdd = useCallback(() => {
    setAdd(true);
  }, []);

  const handleCloseAdd = useCallback(() => {
    setAdd(false);
  }, []);
  return (
    <>
      <Button onClick={onOpen}>追加</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Aさんの支払い</ModalHeader>
          <ModalCloseButton />
          {add ? (
            <>
              <ModalBody>
                <AddPayment value={value} setInputvalue={setInputvalue} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  閉じる
                </Button>
                <Button variant="ghost" onClick={handleCloseAdd}>
                  追加する
                </Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalBody>
                <table className="text-xl w-64">
                  <tr>
                    <td>タクシー代</td>
                    <td>2500円</td>
                  </tr>
                  <tr>
                    <td>宿代</td>
                    <td>500円</td>
                  </tr>
                  <tr>
                    <td>お菓子</td>
                    <td>500円</td>
                  </tr>
                </table>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  閉じる
                </Button>
                <Button variant="ghost" onClick={handleAdd}>
                  追加する
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
