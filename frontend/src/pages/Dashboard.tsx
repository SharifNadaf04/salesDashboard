import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import StatCard from "../components/StatCard";
import { getStates, getDashboardData, getDateRange } from "../api/dashboardApi";
import { DashboardResponse } from "../types/dashboard.types";
import DonutChart from "../components/DonutChart";
import HorizontalBarChart from "../components/HorizontalBarChart";
import HorizontalBarList from "../components/HorizontalBarList";
import SalesIcon from "../assets/icons/sales.svg";
import QuantityIcon from "../assets/icons/quantity.svg";
import ProfitIcon from "../assets/icons/profit.svg";


const Dashboard = () => {
    const [states, setStates] = useState<string[]>([]);
    const [selectedState, setSelectedState] = useState<string>("");
    const [dashboardData, setDashboardData] =
        useState<DashboardResponse | null>(null);

    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    useEffect(() => {
        fetchStates();
    }, []);

    useEffect(() => {
        if (selectedState) {
            fetchDateRange();
        }
    }, [selectedState]);

    useEffect(() => {
        if (selectedState && fromDate && toDate) {
            fetchDashboardData();
        }
    }, [selectedState, fromDate, toDate]);

    const fetchStates = async () => {
        try {
            const data = await getStates();
            setStates(data);

            if (data.length > 0) {
                setSelectedState(data[0]);
            }
        } catch (error) {
            console.error("Error fetching states", error);
        }
    };

    const fetchDashboardData = async () => {
        try {
            const data = await getDashboardData(
                selectedState,
                fromDate,
                toDate
            );
            setDashboardData(data);
        } catch (error) {
            console.error("Error fetching dashboard data", error);
        }
    };

    const fetchDateRange = async () => {
        try {
            const data = await getDateRange(selectedState);

            setMinDate(data.minDate);
            setMaxDate(data.maxDate);
            setFromDate(data.minDate);
            setToDate(data.maxDate);
        } catch (error) {
            console.error("Error fetching date range", error);
        }
    };

    return (
        <Box p={3}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
                flexWrap="wrap"
                gap={3}
            >
                <Typography variant="h5">Sales Overview</Typography>

                <Box display="flex" gap={2} flexWrap="wrap">

                    <TextField
                        select
                        label="Select a state"
                        size="small"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        slotProps={{
                            inputLabel: { shrink: true }
                        }}
                        sx={{ minWidth: 180 }}
                    >
                        {states.map((state) => (
                            <MenuItem key={state} value={state}>
                                {state}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Select From date"
                        type="date"
                        size="small"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        slotProps={{
                            inputLabel: { shrink: true }
                        }}
                    />


                    <TextField
                        label="Select To date"
                        type="date"
                        size="small"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        slotProps={{
                            inputLabel: { shrink: true }
                        }}
                    />


                </Box>
            </Box>


            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <StatCard title="Total Sales" value={dashboardData?.cards.totalSales ?? 0} icon={<img src={SalesIcon} width={40} />} />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <StatCard title="Total Quantity" value={dashboardData?.cards.totalQuantity ?? 0} icon={<img src={QuantityIcon} width={40} />} />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <StatCard title="Avg Discount" value={dashboardData?.cards.avgDiscount ?? 0} icon={<img src={QuantityIcon} width={40} />} />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <StatCard title="Total Profit" value={dashboardData?.cards.totalProfit ?? 0} icon={<img src={ProfitIcon} width={40} />} />
                </Grid>
            </Grid>

            <Grid container spacing={3} mt={1}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <HorizontalBarChart
                        title="Sales by City"
                        data={dashboardData?.salesByCity || []}
                        height={390}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <HorizontalBarList
                        title="Sales by Products"
                        data={dashboardData?.salesByProduct ?? []}
                        height={390}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3} mt={1}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <DonutChart
                        title="Sales by Category"
                        data={dashboardData?.salesByCategory || []}
                        height={390}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <HorizontalBarList
                        title="Sales by Sub Category"
                        data={dashboardData?.salesBySubCategory ?? []}
                        height={360}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <DonutChart
                        title="Sales by Segment"
                        data={dashboardData?.salesBySegment || []}
                        height={390}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;

