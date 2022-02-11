import { AppBar, Button, Toolbar } from "@mui/material";
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

export default function Header({isStaff}){

    let navigate = useNavigate();
    isStaff=true;

    function handleClick(label){
      switch (label){
        case "Fahrplanauskunft":
          //doSomething
        break;
        case "Buslinien":
          //doSomething
        break;
        case "Haltestellen":
          navigate("/busstops");
        break;
        case "Buslinien verwalten":
          //doSomething
        break;
        case "Fahrpläne verwalten":
          navigate("/timetables/manage");
        break;
        case "Bushaltestellen verwalten":
          //doSomething
        break;
        default:
          //default
        break;
      }
    }
    

    function getMenuButtons () {
      if(isStaff && headersData.length<4){
        headersData.push({
          label: "Buslinien verwalten",
          href: "/buslines/manage",
        },
        {
          label: "Fahrpläne verwalten",
          href: "/timetables/manage",
        },
        {
          label: "Bushaltestellen verwalten",
          href: "/busstops/manage",
        })
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

    return(
        <header>
            <AppBar position="static">
                <Toolbar>
                    {getMenuButtons()}
                </Toolbar>
            </AppBar>
        </header>
    );
}