import { Box, Typography, Avatar, IconButton } from "@mui/material";
import profileImg from "../assets/icons/profile.jpg";

interface Props {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Header = ({ darkMode, setDarkMode }: Props) => {
  return (
    <Box
      sx={{
        height: 64,
        backgroundColor: darkMode ? "#1f2937" : "#0F766E",
        color: "white",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingX: 3,
        gap: 2
      }}
    >
      <Typography>Hello Sharif</Typography>
      <Avatar
        src={profileImg}
        alt="Sharif"
        sx={{ width: 36, height: 36 }}
      />
    </Box>
  );
};

export default Header;

