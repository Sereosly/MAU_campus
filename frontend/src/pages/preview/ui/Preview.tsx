import { Button, Stack } from "@mui/material";
import { campusList } from "../const/mainConst";
import { Link } from "react-router-dom";

export const Preview = () => {
    return (
        <Stack justifyContent="center" alignItems="center" minHeight="100vh" gap="40px" padding="0 100px">
            {campusList.map((campus) => (
                <Button key={campus.id} component={Link} to={campus.redirect} variant="contained" sx={{ width: "300px", height: '60px' }} >
                    {campus.name}
                </Button>
            ))}
        </Stack>
    );
};
