import type { Metadata } from "next";
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: "Авторизация",
  description: "Карта Университета",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
      <div> {children} </div>
  );
}
