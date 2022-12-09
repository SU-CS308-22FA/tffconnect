import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const subscribarList = [
  {
    name: "john doe",
    date: "18 january, 2019",
    status: "close",
    company: "ABC Fintech LTD.",
  },
  {
    name: "kessy bryan",
    date: "10 january, 2019",
    status: "open",
    company: "My Fintech LTD.",
  },
  {
    name: "james cassegne",
    date: "8 january, 2019",
    status: "close",
    company: "Collboy Tech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    status: "open",
    company: "ABC Fintech LTD.",
  },
];

const RefereeTable = () => {
  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Personel Adı</TableCell>
            <TableCell align="center">Puanı</TableCell>
            <TableCell align="center">Atandığı Maç</TableCell>
            <TableCell align="center">Oynanma Tarihi</TableCell>
            <TableCell align="center">Maç Sonucu</TableCell>
            <TableCell align="right">Oyla</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {subscribarList.map((subscriber, index) => (
            <TableRow key={index}>
              <TableCell align="left">{subscriber.name}</TableCell>
              <TableCell align="center">{subscriber.company}</TableCell>
              <TableCell align="center">{subscriber.date}</TableCell>
              <TableCell align="center">{subscriber.date}</TableCell>
              <TableCell align="center">{subscriber.status}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <Icon color="success">offline_pin</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default RefereeTable;
