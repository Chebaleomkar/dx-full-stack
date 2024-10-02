"use client"

import React, { useState, useEffect } from "react"
import useStudentFines from "@/hooks/useStudentFines"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, CreditCardIcon, UserIcon } from "lucide-react"
import { Fine } from "@/types/Fine"
import confetti from "canvas-confetti"

export default function StudentFinesTable() {
  const { fines, loading, error } = useStudentFines()
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const hasShownConfetti = sessionStorage.getItem("hasShownConfetti")
    if (!hasShownConfetti && !fines.length) {
      // sessionStorage.setItem("hasShownConfetti", "true")
      triggerConfetti()
    }
  }, [fines]);

  const triggerConfetti = () => {
    const isMobile = window.innerWidth <= 768; // Adjust for mobile screen size
  
    // Determine the starting position and angle based on device type
    const startOriginY = isMobile ? 1 : 0.6;  // Start at bottom for mobile, middle for desktop
    const angle = isMobile ?  90: 270 ;        // Shoot upwards from bottom for mobile, vertical for desktop
    const spread =isMobile ? 80 :200;
    
    const yAxis = isMobile ? 0.9 : 1.3;

    confetti({
      particleCount: 200,
      spread: spread,
      origin: { y: startOriginY },  // Adjust starting point
      angle: 90,                 // Adjust angle based on device
      gravity: 0.4,
      scalar: 1.2,
    });
  
    // Second burst (dynamic adjustment for mobile and desktop)
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: yAxis }, // For mobile, slightly above bottom; for desktop, lower middle
        // angle: isMobile ?  150: 250,          // Adjust angle for leftward spread on mobile
        angle : 150,
        gravity: 0.3,
        decay: 0.95,
      });
    }, 600);
  
    // Third burst (dynamic adjustment for mobile and desktop)
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y:yAxis },  // For mobile, near bottom; for desktop, a bit higher
        // angle: isMobile ? 70:40 ,           // Adjust angle for rightward spread on mobile
        angle : 75,
        gravity: 0.2,
        decay: 0.98, // Slow decay for longer effect
      });
    }, 1200);
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



  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Your Fines</h2>
      {fines.map((fine: Fine, i) => (
        <Card key={i} className="w-full">
          <CardHeader>
            <CardTitle>{fine.reason}</CardTitle>
          </CardHeader>
          <div className="md:flex md:justify-between md:items-center">
            <CardContent>
              <div className="flex items-center space-x-2">
                <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                <span>Amount: <strong> ₹{fine.amount} </strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                <span>Issued By: <strong>{fine.issuedBy}</strong></span>
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
                      hour12: true,
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
