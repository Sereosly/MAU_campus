import { Button, Stack } from "@mui/material"

export const Sidebar = () => {
  return (
    <Stack gap='8px' minWidth='300px' padding='50px 20px' bgcolor='azure'>
      {new Array(10).fill('').map((_, index) => (
        <Button variant="contained">
          Кнопочка {index}
        </Button>
      ))
      }
    </Stack>
  )
}