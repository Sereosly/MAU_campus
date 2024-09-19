import styles from './Main.module.sass';
import {Button, Link, Stack} from "@mui/material";
import {campusList} from "../const/mainConst";


export const Main = () => {
    return (
        <Stack justifyContent="center" alignItems="center" minHeight="100vh" gap="40px" padding="0 100px">
            {campusList.map((campus,index) => (
                <Button key={index} component={Link} bgcolor={"azure"} variant="contained" width="200px"  height="60px">
                    {campus}
                </Button>
            ))}
        </Stack>
    );
};
