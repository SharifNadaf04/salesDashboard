import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface DonutChartProps {
  title: string;
  data: { name: string; value: number }[];
  height?: number;
}

const COLORS = ["#4FC3F7", "#FF8A65", "#FFD54F", "#81C784"];

export default function DonutChart({
  title,
  data,
  height = 360,
}: DonutChartProps) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        height: height,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Box sx={{ height: "100%" }}>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={70}
                outerRadius={100}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

