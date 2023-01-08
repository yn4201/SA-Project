import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import AddProduct from "./AddProduct";
import StepperForm from "./StepperForm";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const AppFormAdd = () => {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Form" }]} />
            </Box>

            <Stack spacing={3}>
                <SimpleCard title="Simple Form">
                    <AddProduct />
                </SimpleCard>
            </Stack>
        </Container>
    );
};

export default AppFormAdd;
