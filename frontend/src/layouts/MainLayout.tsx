import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Box } from "@mui/material";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const MainLayout = ({
  children,
  darkMode,
  setDarkMode
}: {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}) => {

   const [collapsed, setCollapsed] = useState(false);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} collapsed={collapsed} setCollapsed={setCollapsed}/>

      <Box sx={{ flex: 1 }}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
        <Box sx={{ padding: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};


export default MainLayout;

