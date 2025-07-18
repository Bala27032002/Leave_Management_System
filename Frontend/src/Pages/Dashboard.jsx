import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography, Tooltip } from "@mui/material";

const colors = ["#C0E3FF", "#BBEDD6", "#FFDA9D", "#FFC0C0", "#E3D2F2"];

const Dashboard = () => {
  const [TableData, setTable] = useState([]);
  const [Total, setTotal] = useState(0);
  const [Requirements_Serviced, setTotalserviced] = useState(0);
  const [Positions, setPositions] = useState(0);
  const [Profiles_Sourced, setProfilessourced] = useState(0);
  const [Profiles_submitted, setProfilessubmitted] = useState(0);

  const data = [
    { title: "Available Leave", value: Total, color: "#0086EE" },
    {
      title: "Scheduled Leave",
      value: Requirements_Serviced,
      color: "#4BA97E",
    },

    { title: "Unscheduled Leave", value: Positions, color: "#C6851A" },
    { title: "Half Leave", value: Profiles_Sourced, color: "#DC5B51" },
    {
      title: "Comp Off",
      value: Profiles_submitted,
      color: "#9558CA",
    },
  ];

  useEffect(() => {
    setTable([
      {
        companyName: "Company A",
        No_of_Requirements: 10,
        No_of_requirements_serviced: 8,
        No_of_positions: 5,
        Profiles_sourced: 15,
        Profiles_submitted_to_client: 10,
        totalColor: "#0086EE",
      },
    ]);
    setTotal(10);
    setTotalserviced(8);
    setPositions(5);
    setProfilessourced(15);
    setProfilessubmitted(10);
  }, []);

  return (
    <>
      <Grid style={{ padding: "1.5rem", background: "#F5F5F5", }}>
        <Grid style={{ height: "3rem" }}>
          <Typography
            style={{
              fontWeight: "500",
              fontSize: "24px",
              fontFamily: "Inter",
              marginTop: "0.5rem",
            }}
          >
            This Month's
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item key={index} xl={2.4} lg={2.4} md={2.4} sm={5.5} xs={12}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: colors[index],
                  maxHeight: "120px",
                  width: "100%",
                  borderRadius: "10px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    zIndex: 1,
                    fontWeight: "700",
                    fontSize: {
                      xl: "48px",
                      lg: "40px",
                      xs: "32px",
                      md: "34px",
                    },
                    position: "relative",
                    padding: "10px",
                    color: item.color,
                  }}
                >
                  {item.value}
                </Typography>
                <Tooltip
                  title={item.title}
                  placement="top"
                  slotProps={{
                    popper: {
                      modifiers: [
                        { name: "offset", options: { offset: [0, -14] } },
                      ],
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      zIndex: 1,
                      position: "relative",
                      paddingLeft: "11px",
                      fontWeight: "600",
                      fontSize: {
                        xl: "20px",
                        lg: "19px",
                        xs: "18px",
                        md: "16px",
                      },
                      whiteSpace: "nowrap",
                      textAlign: "start",
                      bottom: "10px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Tooltip>
              </Paper>
            </Grid>
          ))}
        </Grid>
       
      </Grid>
    </>
  );
};

export default Dashboard;
