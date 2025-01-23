"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/shared/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { getRouteHome, getRouteNorthCampus } from "@/shared/const/routes";
import { useRouter } from "next/navigation";
import { Input } from "@/shared/ui/input";

const campuses = [
  { id: 1, name: "Северный кампус", href: getRouteNorthCampus() },
  { id: 2, name: "Южный кампус", href: getRouteHome() },
]

export default function SidebarCampusSelector({ className }: { className?: string }) {
  const [selectedCampus, setSelectedCampus] = useState<typeof campuses[0] | null>(null)
  const router = useRouter()

  const handleRouteClick = (href: string) => {
    router.push(href)
  }

  return (
    <Sidebar className={cn(className)}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {selectedCampus ? selectedCampus.name : "Выберите корпус"}
                  <ChevronDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                {campuses.map((campus) => (
                  <DropdownMenuItem
                    key={campus.id}
                    onSelect={() => setSelectedCampus(campus)}
                    onClick={() => handleRouteClick(campus.href)}
                  >
                    <span>{campus.name}</span>
                    {selectedCampus?.id === campus.id && (
                      <Check className="ml-auto h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              <SidebarMenuItem>
                <Input placeholder="Укажите начальную точку маршрута" />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Input placeholder="Укажите конечную точку маршрута" />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}