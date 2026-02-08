import { Box, Typography, LinearProgress } from "@mui/material";

interface Props {
    title: string;
    data: { name: string; value: number }[];
    height?: number;
}

const HorizontalBarList = ({ title, data }: Props) => {
    const maxValue = Math.max(...data.map((d) => d.value), 1);

    return (
        <Box
            sx={(theme) => ({
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                p: 2,
                height: 390,
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                scrollbarWidth: "thin",
            })}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                {title}
            </Typography>

            {data.map((item, index) => (
                <Box key={index} sx={{ mb: 1.5 }}>
                    <Typography variant="body2">{item.name}</Typography>

                    <LinearProgress
                        variant="determinate"
                        value={(item.value / maxValue) * 100}
                        sx={{
                            height: 8,
                            borderRadius: 5,
                            mt: 0.5,
                        }}
                    />

                    <Typography variant="caption">
                        ${item.value}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default HorizontalBarList;
