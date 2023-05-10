import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  CardHeader,
} from "@mui/material";

const LeavesOT = ({ leaves, overtime }) => {
  if (!leaves || !overtime) {
    return <CircularProgress />;
  }

  let vacationCount = 0;
  let sickCount = 0;
  let defaultLeaves = 7;

  for (let i = 0; i < leaves.length; i++) {
    if (leaves[i].type === "Vacation") {
      vacationCount++;
    } else if (leaves[i].type === "Sick") {
      sickCount++;
    }
  }

  return (
    <>
      <Card sx={{ maxWidth: 400, margin: "auto" }}>
        <CardHeader title="Leaves" />
        <CardContent>
          <Typography>
            Remaining: {defaultLeaves - vacationCount} Vacation,{" "}
            {defaultLeaves - sickCount} Sick
          </Typography>
          <List>
            {leaves.map((leave) => (
              <ListItem key={leave._id}>
                <ListItemText
                  primary={leave.type}
                  secondary={
                    <>
                      Date: {leave.date} <br />
                      Replaced by: {leave.replacedBy}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 400, margin: "auto" }}>
        <CardHeader title="Overtime" />
        <CardContent>
          <List>
            {overtime.map((ot) => (
              <ListItem key={ot._id}>
                <ListItemText
                  primary={`${ot.hours} hours`}
                  secondary={
                    <>
                      Date: {ot.date} <br />
                      Time In: {ot.timeIn} <br />
                      Time Out: {ot.timeOut} <br />
                      Night Diff: {ot.nightHours} <br />
                      Reason: {ot.reason}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default LeavesOT;
