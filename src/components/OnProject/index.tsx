import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { ModalComponent } from "../Modal";

type Props = {
  project: any;
};

export const OnProject = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleChangeT = () => {
    setOpen(true);
  };

  const handleChangeF = () => {
    setOpen(false);
  };

  return (
    <>
      <p className="text-4xl">{props.project[0]}</p>

      <ul className="w-80 ">
        <div className="text-right">
          <div className="flex justify-between ">
            <div className="flex">
              <div className="text-4xl">A</div>
              <ModalComponent />
            </div>
            <div className="text-4xl">2000円</div>
            {open ? (
              <ChevronUpIcon className="text-4xl" onClick={handleChangeF} />
            ) : (
              <ChevronDownIcon className="text-4xl" onClick={handleChangeT} />
            )}
          </div>
          {open ? (
            <table className="text-xl w-64">
              <tr>
                <td>aへ</td>
                <td>2500円</td>
              </tr>
              <tr>
                <td>aへ</td>
                <td>500円</td>
              </tr>
              <tr>
                <td>aへ</td>
                <td>500円</td>
              </tr>
            </table>
          ) : null}
        </div>
        <div className="text-right">
          <div className="flex justify-between ">
            <div className="flex">
              <div className="text-4xl">A</div>
              <ModalComponent />
            </div>
            <div className="text-4xl">2000円</div>
            {open ? (
              <ChevronUpIcon className="text-4xl" onClick={handleChangeF} />
            ) : (
              <ChevronDownIcon className="text-4xl" onClick={handleChangeT} />
            )}
          </div>
          {open ? (
            <table className="text-xl w-64">
              <tr>
                <td>aへ</td>
                <td>2500円</td>
              </tr>
              <tr>
                <td>aへ</td>
                <td>500円</td>
              </tr>
              <tr>
                <td>aへ</td>
                <td>500円</td>
              </tr>
            </table>
          ) : null}
        </div>
      </ul>
    </>
  );
};
