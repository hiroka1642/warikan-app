export type ProjectTypes = {
  projectName: string;
  numberOfPeople: number;
  projectId: number;
  userNameList: string[];
};

export type ListTypes = {
  name: string;
  member: number;
  id: number;
};

export type SettlementListTypes = {
  projectId: number;
  money: number;
  payer: number | null;
  what: string;
  id: number;
};

export type PaymentListTypes = { what: string; money: number; id: number };
