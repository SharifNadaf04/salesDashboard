import salesData from "../data/sales.json";
import { SalesRecord } from "../types/sales.types";

const data: SalesRecord[] = salesData as SalesRecord[];

export const getStatesService = (): string[] => {
    const statesSet = new Set<string>();

    data.forEach((record) => {
        statesSet.add(record.State);
    });

    return Array.from(statesSet).sort();
};

export const getDateRangeService = (state: string) => {
    const filteredData = data.filter(
        (record) => record.State === state
    );

    if (filteredData.length === 0) {
        return null;
    }

    const dates = filteredData.map(
        (record) => new Date(record["Order Date"])
    );

    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));

    return {
        minDate: minDate.toISOString().split("T")[0],
        maxDate: maxDate.toISOString().split("T")[0],
    };
};


export const getDashboardDataService = (
    state: string,
    from: string,
    to: string
) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const filteredData = data.filter((record) => {
        const orderDate = new Date(record["Order Date"]);
        return (
            record.State === state &&
            orderDate >= fromDate &&
            orderDate <= toDate
        );
    });

    if (filteredData.length === 0) return null;

    const totalSales = filteredData.reduce((sum, r) => sum + r.Sales, 0);
    const totalProfit = filteredData.reduce((sum, r) => sum + r.Profit, 0);
    const totalQuantity = filteredData.reduce((sum, r) => sum + r.Quantity, 0);
    const avgDiscount =
        filteredData.reduce((sum, r) => sum + r.Discount, 0) /
        filteredData.length;

    const salesByCategory = groupSalesByField(filteredData, "Category");
    const salesByCity = groupSalesByField(filteredData, "City");
    const salesBySegment = groupSalesByField(filteredData, "Segment");
    const salesBySubCategory = groupSalesByField(filteredData, "Sub-Category");
    const salesByProduct = groupSalesByField(filteredData, "Product Name");

    return {
        cards: {
            totalSales: Number(totalSales.toFixed(2)),
            totalProfit: Number(totalProfit.toFixed(2)),
            totalQuantity,
            avgDiscount: Number(avgDiscount.toFixed(2)),
        },
        salesByCategory,
        salesByCity,
        salesBySegment,
        salesBySubCategory,
        salesByProduct,
    };

};

const groupSalesByField = (
    records: SalesRecord[],
    field: keyof SalesRecord
) => {
    const map: Record<string, number> = {};

    records.forEach((record) => {
        const key = String(record[field]);
        map[key] = (map[key] ?? 0) + record.Sales;
    });

    return Object.keys(map).map((key) => ({
        name: key,
        value: Number((map[key] ?? 0).toFixed(2)),
    }));
};



