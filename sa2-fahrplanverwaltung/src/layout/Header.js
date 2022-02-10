import { AppBar, Button, Toolbar } from "@mui/material";

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
    {
      label: "Buslinien verwalten",
      href: "/buslines/manage",
    },
  ];

export default function Header({isStaff}){

    isStaff=false;

    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
          return (
            <Button
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

    return(
        <header>
            <AppBar position="static">
                <Toolbar>
                    {getMenuButtons()}
                    <Button>Fahrplanauskunft</Button>
                    <Button>Buslinien</Button>
                    <Button>Haltestellen</Button>
                    <Button rendered="#{isStaff}">Haltestellen verwalten</Button></Toolbar></AppBar>
        </header>
    );
}