type RevenueRecord = {
  revenue: number;
  date: string;
  count: number;
};

type ActiveUserRecord = {
  date: string;
  count: number;
};

export type ResponseData = {
  range: "7d" | "30d" | "90d" | "all";
  revenue:
    | RevenueRecord[]
    | {
        last7Days: RevenueRecord[];
        last30Days: RevenueRecord[];
        last90Days: RevenueRecord[];
      };
  activeUser:
    | ActiveUserRecord[]
    | {
        last7Days: ActiveUserRecord[];
        last30Days: ActiveUserRecord[];
        last90Days: ActiveUserRecord[];
      };
};
