import { Sidebar } from "@/widgets/sidebar"
import { Stack } from "@mui/material"
import { Outlet } from "react-router-dom"

export const LayoutCampos = () => {
  return (
    <Stack direction='row' minHeight='100vh'>
      <Sidebar />
      <Outlet />
    </Stack>
  )
}
