export type ProjectTypes = {
  projectName: string;
  numberOfPeople: number;
  projectId: number;
  userNameList: string[];
};

export type ProjectListTypes = {
  projectName: string;
  member: number;
  projectId: string;
  userName: number[];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_id: string;
};

export type ListTypes = {
  name: string;
  member: number;
  id: string;
};

export type SettlementListTypes = {
  projectId: number;
  money: number;
  payer: number | null;
  what: string;
  id: number;
};

export type PaymentListTypes = { what: string; money: number; id: number };
