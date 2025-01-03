// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  createTheme,
  Typography,
  Dialog,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoadingButton from "@mui/lab/LoadingButton";
import favicon from "../assets/favicon.svg";
import {
  handleLanguageChange,
  loadLanguages,
  handleMouseEnter,
  handleMouseLeave,
  useMenuItems,
} from "../utils/Handlers";
import MobileHeader from "./MobileHeader";
import Flag from "react-world-flags";
import Register from "./Register";

export default function Header() {
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const buttonRefs = useRef([]);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const menuItems = useMenuItems();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    loadLanguages(setLanguages, setLanguage);
  }, [i18n.language]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const renderButtons = () =>
    menuItems.map((item, index) => (
      <Link
        to={item.path}
        key={index}
        style={{ textDecoration: "none" }}
        className="text-reset"
      >
        <Button
          ref={(el) => (buttonRefs.current[index] = el)}
          color="inherit"
          onMouseEnter={() =>
            handleMouseEnter(index, location, menuItems, buttonRefs)
          }
          onMouseLeave={() =>
            handleMouseLeave(index, location, menuItems, buttonRefs)
          }
          style={{
            backgroundColor:
              location.pathname === item.path ? "rgba(0, 0, 0, 0.2)" : "",
            transition: "background-color 0.2s",
          }}
        >
          {item.t}
        </Button>
      </Link>
    ));

  return (
    <AppBar position="fixed">
      {isMobile ? (
        <MobileHeader />
      ) : (
        <Toolbar className="d-flex justify-content-between">
          <Box>
            <Link to="/" className="text-reset">
              <img
                src={favicon}
                alt="Logo"
                style={{ maxWidth: "50px", height: "auto" }}
              />
              <Typography
                variant="h6"
                sx={{ marginTop: "8px", fontSize: "16px" }}
              >
                Hair Radiant
              </Typography>
            </Link>
          </Box>
          <Box>{renderButtons()}</Box>
          <Box>
            <FormControl
              variant="filled"
              size="small"
              sx={{ m: 1, minWidth: 120 }}
            >
              <InputLabel
                id="LangSelectorLabel"
                sx={{ textAlign: "center", width: "100%" }}
              >
                {t("language")}
              </InputLabel>
              <Select
                labelId="LangSelectorLabel"
                id="LangSelector"
                onChange={(event) =>
                  handleLanguageChange(event, i18n, setLanguage)
                }
                value={language}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    <Box display="flex" alignItems="center">
                      <Flag
                        code={lang.flagCode}
                        style={{ width: 24, marginRight: 8 }}
                      />
                      {lang.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ m: 1, display: "flex", gap: 1 }}>
              <Link to="/registar" style={{ textDecoration: "none", flex: 1 }}>
                <LoadingButton
                  onClick={handleOpenDialog}
                  size="small"
                  loadingPosition="start"
                  loadingIndicator="registando"
                  startIcon={<PersonAddIcon />}
                  variant="contained"
                  sx={{
                    width: "100%",
                    fontSize: "0.75rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t("register")}
                </LoadingButton>
              </Link>
              <Link to="/login" style={{ textDecoration: "none", flex: 1 }}>
                <LoadingButton
                  size="small"
                  loadingPosition="start"
                  loadingIndicator="logando"
                  startIcon={<PersonAddIcon />}
                  variant="contained"
                  sx={{
                    width: "100%",
                    fontSize: "0.75rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t("login")}
                </LoadingButton>
              </Link>
            </Box>
          </Box>
        </Toolbar>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Register />
      </Dialog>
    </AppBar>
  );
}
