import { useRouter } from "next/dist/client/router";

type Props = {
  children: string;
  isBackButton?: boolean;
};

export const Title = (props: Props) => {
  const router = useRouter();
  const handleBackPage = () => {
    router.back();
  };
  return (
    <>
      <div className="sm:text-2xl relative text-center w-full flex font-bold text-gray-700 pt-16">
        {props.isBackButton ? (
          <button className=" absolute" onClick={handleBackPage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        ) : null}

        <h2 className="m-auto">{props.children}</h2>
      </div>
    </>
  );
};
