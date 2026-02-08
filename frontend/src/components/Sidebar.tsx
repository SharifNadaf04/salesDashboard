import StoreIconImg from "../assets/icons/store.svg";
import NotificationIconImg from "../assets/icons/notification.svg";
import SettingsIconImg from "../assets/icons/settings.svg";
import ThemeIconImg from "../assets/icons/theme.svg";
import SalesOverview from "../assets/icons/salesOverview.svg";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";

interface Props {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const Sidebar = ({ darkMode, setDarkMode, collapsed, setCollapsed }: Props) => {
  return (
    <Box
      sx={{
        width: collapsed ? 80 : 240,
        transition: "0.3s",
        minHeight: "100vh",
        backgroundColor: darkMode ? "#111827" : "#4A4A4A",
        color: "#fff",
        paddingTop: 2
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          px: 2,
          mb: 3
        }}
      >
        {!collapsed && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6">Sales Dashboard</Typography>
          </Box>
        )}

        <MenuIcon
          sx={{ cursor: "pointer" }}
          onClick={() => setCollapsed(!collapsed)}
        />
      </Box>

      <List>
        <ListItemButton>
          <ListItemIcon>
            <img src={SalesOverview} width={22} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Sales Overview" />}
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <img src={StoreIconImg} width={22} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Stores" />}
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <img src={NotificationIconImg} width={22} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Notifications" />}
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <img src={SettingsIconImg} width={22} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Settings" />}
        </ListItemButton>

        <ListItemButton onClick={() => setDarkMode(!darkMode)}>
          <ListItemIcon>
            <img src={ThemeIconImg} width={22} />
          </ListItemIcon>
          {!collapsed && (
            <ListItemText primary={darkMode ? "Light Theme" : "Dark Theme"} />
          )}
        </ListItemButton>
      </List>

    </Box>
  );
};

export default Sidebar;

