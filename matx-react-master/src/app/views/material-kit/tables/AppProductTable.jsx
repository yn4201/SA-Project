import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import ProductTable from "./ProductTable";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const AppProductTable = () => {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} />
            </Box>
            <SimpleCard title="Pagination Table">
                <ProductTable />
            </SimpleCard>
        </Container>
    );
};

export default AppProductTable;
