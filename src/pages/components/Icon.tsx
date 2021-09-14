type Props = {
  color?: string;
};

export const ListIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <rect
        x="8"
        y="4"
        width="32"
        height="40"
        rx="2"
        fill="none"
        stroke={props.color || "#333"}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M21 14H33"
        stroke={props.color || "#333"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 24H33"
        stroke={props.color || "#333"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 34H33"
        stroke={props.color || "#333"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 16C16.1046 16 17 15.1046 17 14C17 12.8954 16.1046 12 15 12C13.8954 12 13 12.8954 13 14C13 15.1046 13.8954 16 15 16Z"
        fill={props.color || "#333"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 26C16.1046 26 17 25.1046 17 24C17 22.8954 16.1046 22 15 22C13.8954 22 13 22.8954 13 24C13 25.1046 13.8954 26 15 26Z"
        fill={props.color || "#333"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 36C16.1046 36 17 35.1046 17 34C17 32.8954 16.1046 32 15 32C13.8954 32 13 32.8954 13 34C13 35.1046 13.8954 36 15 36Z"
        fill={props.color || "#333"}
      />
    </svg>
  );
};

export const NewList: React.FC<Props> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 10V7C19 5.89543 19.8954 5 21 5H41C42.1046 5 43 5.89543 43 7V29C43 30.1046 42.1046 31 41 31H37"
        stroke={props.color || "#333"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="5"
        y="18"
        width="24"
        height="24"
        rx="2"
        fill="none"
        stroke={props.color || "#333"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 25V35"
        stroke={props.color || "#333"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 30H22"
        stroke={props.color || "#333"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LogoutIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path
        d="M23.9917 6L6 6L6 42H24"
        stroke={props.color || "#333"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33 33L42 24L33 15"
        stroke={props.color || "#333"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 23.9917H42"
        stroke={props.color || "#333"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
