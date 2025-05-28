import type React from "react"
import { EstimateProvider } from "@/context/estimate-context"

export default function PaymentSuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <EstimateProvider>{children}</EstimateProvider>
}
