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
  projectId: string;
  money: number;
  payer: number;
  what: string;
  id: number;
};

export type PaymentListTypes = { what: string; money: number; id: number };

export type SettlementType = {
  id: number;
  money: string;
  payer: number | null;
  projectId: number;
  what: string;
};
