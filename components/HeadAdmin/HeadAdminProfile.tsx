import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProtectedRoute from "../ProtectedRoute"
import Link from "next/link"
import Profile from "../shared/Profile"
import { LayoutDashboard, FileText, Users } from "lucide-react"

export default function HeadAdminProfile() {
  return (
    <ProtectedRoute allowedRoles={["HeadAdmin"]}>
      <div className="container mx-auto px-4 py-8">
        <Profile />

          
        <Card className="mt-10">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">HeadAdmin Actions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/dashboard" passHref>
                <Button
                  variant="default"
                  className="w-full h-16 text-lg font-medium"
                >
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  View Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/report" passHref>
                <Button
                  variant="outline"
                  className="w-full h-16 text-lg font-medium"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Generate Report
                </Button>
              </Link>
              <Link href="/dashboard/teacher" passHref>
                <Button variant="outline" className="w-full h-16 text-lg font-medium">
                  <Users className="mr-2 h-5 w-5" />
                  Manage Teacher
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}