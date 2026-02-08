export interface CardsData {
  totalSales: number;
  totalProfit: number;
  totalQuantity: number;
  avgDiscount: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

export interface DashboardResponse {
  cards: CardsData;
  salesByCategory: CategoryData[];
  salesBySegment: CategoryData[];
  salesByCity: CategoryData[];
  salesBySubCategory: CategoryData[];
  salesByProduct: CategoryData[];
}