import { PaymentForUser } from "./PaymentForUser";

type Props = {
  list: any[];
  nameid: string[];
};

export const PaymentForEachUser: React.VFC<Props> = (props) => {
  return (
    <>
      <div className="text-right">
        <table className="text-xl text-right inline-block mr-14">
          <tbody>
            {props.nameid.map((li: any, key) => {
              const UserList = props.list.filter((item) => {
                return item.payer === key;
              });
              const number = key;

              if (UserList.length === 0) {
                return;
              } else {
                let sum = 0;
                UserList.map((li) => {
                  return (sum += li.money);
                });

                return (
                  <>
                    <PaymentForUser
                      number={number}
                      li={li}
                      userList={UserList}
                      sum={sum}
                    />
                  </>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
