"use client";

import { useState } from "react";
import {
    Sidebar,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/ui/sidebar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/shared/ui/dropdown-menu";
import {ChevronDown, Check} from "lucide-react";
import {cn} from "@/shared/lib/utils";

const campuses = [
  { id: 1, name: "Северный кампус" },
  { id: 2, name: "Южный кампус" },
]

export default function SidebarCampusSelector({ className }: { className?: string }) {
  const [selectedCampus, setSelectedCampus] = useState<typeof campuses[0] | null>(null)

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
    </Sidebar>
  )
}