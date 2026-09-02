export const adminAccounts = [
  {
    id: "cornerstone",
    name: "Cornerstone",
    email: "thecornerstoneephraim@gmail.com",
    emailHint: "thec••••••••••••@gmail.com",
  },
  {
    id: "keniye",
    name: "Keniye",
    email: "studio@koroye.com",
    emailHint: "stu•••@koroye.com",
  },
  {
    id: "abiola",
    name: "Abiola",
    email: "orimolade_abiola01@yahoo.com",
    emailHint: "ori•••••••••••••••@yahoo.com",
  },
  {
    id: "asoebi-admin",
    name: "Asoebi Admin",
    email: "asoebifashionweek@gmail.com",
    emailHint: "aso•••••••••••••••@gmail.com",
  },
] as const;

export type AdminAccountId = (typeof adminAccounts)[number]["id"];

export function getAdminAccount(id: AdminAccountId | "") {
  return adminAccounts.find((account) => account.id === id);
}
