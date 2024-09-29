"use client"

import React from "react"
import useStudentFines from "@/hooks/useStudentFines"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, CreditCardIcon, UserIcon } from "lucide-react"

export default function StudentFinesTable() {
  const { fines, loading, error } = useStudentFines()
  const router = useRouter()

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 mt-4">{error}</div>
  }

  if (!fines.length) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">No Fines Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Keep going, stay disciplined! Good habits create a foundation for success.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Your Fines</h2>
      {fines.map((fine) => (
        <Card key={fine._id} className="w-full">
          <CardHeader>
            <CardTitle>{fine.reason}</CardTitle>
          </CardHeader>
          <div className="flex justify-between items-center">

          
          <CardContent >
            <div className="flex items-center space-x-2">
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
              <span>Amount: <strong> ₹{fine.amount} </strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <UserIcon className="h-4 w-4 text-muted-foreground" />
              <span>Issued By: <strong>{fine.issuedBy.name}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>
                Issued At:{" "}<strong>
                {new Date(fine.issuedAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                </strong>
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push(`/payment/${fine._id}`)}>Pay</Button>
          </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  )
}