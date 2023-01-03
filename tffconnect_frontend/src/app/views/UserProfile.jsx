import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";


const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppTable = () => {



    
  return (
    <Container>

      <SimpleCard title="Kullanıcı Bilgisi">
        
      </SimpleCard>

      <SimpleCard title="Yapılan Yorumlar">
        
      </SimpleCard>
    </Container>
  );
};

export default AppTable;
