import { AppBar, Box, Button, FormControlLabel, Switch, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const headersData = [
  {
    label: "Fahrplanauskunft",
    href: "/timetable",
  },
  {
    label: "Buslinien",
    href: "/buslines",
  },
  {
    label: "Haltestellen",
    href: "/busstops",
  },
];

const headersDataStaff = [
  {
    label: "Fahrplanauskunft",
    href: "/timetable",
  },
  {
    label: "Buslinien",
    href: "/buslines",
  },
  {
    label: "Haltestellen",
    href: "/busstops",
  },
  {
    label: "Fahrpläne verwalten",
    href: "/managetimetables",
  },
];

export default function Header({ isStaff, setIsStaff }) {

  let navigate = useNavigate();

  function handleClick(label) {
    switch (label) {
      case "Fahrplanauskunft":
        navigate("/timetable")
        break;
      case "Buslinien":
        navigate("/buslines")
        break;
      case "Haltestellen":
        navigate("/busstops");
        break;
      case "Fahrpläne verwalten":
        navigate("/schedules");
        break;
      default:
        navigate("/timetable");
        break;
    }
  }

  const handleChange = (event) => {
    setIsStaff(event.target.checked);
  };


  function getMenuButtons() {
    if (isStaff) {
      return headersDataStaff.map(({ label, href }) => {
        return (
          <Button onClick={(event) => handleClick(label)}
            {...{
              key: label,
              color: "inherit",
              to: href,
              //component: RouterLink,
            }}
          >
            {label}
          </Button>
        );
      });
    }
    return headersData.map(({ label, href }) => {
      return (
        <Button onClick={(event) => handleClick(label)}
          {...{
            key: label,
            color: "inherit",
            to: href,
            //component: RouterLink,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {getMenuButtons()}
            <Typography sx={{ flexGrow: 1 }} />
            <FormControlLabel control={<Switch checked={isStaff}
              onChange={handleChange}
              color="secondary" />} label="Admin" />
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
}