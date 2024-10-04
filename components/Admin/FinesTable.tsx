"use client"
import React, { useEffect, useState, useCallback } from "react"
import axios from "axios"
import { IndianRupee , Calendar, User, PencilOff, SquarePen } from "lucide-react"
import useDecodeToken from "@/hooks/useDecodeToken"
import { useToast } from "@/components/ui/use-toast"
import { getToken } from "@/utils/getToken"
import { isWithin48Hours } from "@/utils/isWithin48Hours"
import { BASE_URL } from "@/constant"
import Loader from "../Loader"
import NoFinesMessage from "../NoFineMessage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const FinesTable = () => {
  const [fines, setFines] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [editingFine, setEditingFine] = useState<any>(null)
  const [showDrawer, setShowDrawer] = useState<boolean>(false)

  const { userId, role } = useDecodeToken()
  const { toast } = useToast()

  const fetchFines = useCallback(async () => {
    if (role === "Admin" || role === "HeadAdmin" || role === "SuperAdmin") {
      if (userId) {
        const token = getToken()
        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        try {
          const response = await axios.get(`${BASE_URL}/fine/user/${userId}`, { headers })
          setFines(response?.data)
          setLoading(false)
        } catch (error: any) {
          console.error("Error fetching fines:", error)
          setLoading(false)
          toast({
            title: `${error?.response?.data?.message} to access the fines | please ReLogin`,
            variant: "destructive",
          })
        }
      }
    }
  }, [userId, role, toast])

  useEffect(() => {
    fetchFines()
  }, [fetchFines])

  const handleEditClick = (fine: any) => {
    setEditingFine(fine)
    setShowDrawer(true)
  }

  const handleUpdateFine = async () => {
    if (!editingFine) return
    setShowDrawer(false)
    try {
      const token = getToken()
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      const response = await axios.put(
        `${BASE_URL}/fine/${editingFine._id}`,
        { amount: editingFine.amount, reason: editingFine.reason },
        { headers }
      )
      toast({title: "Fine updated successfully!"})
      setFines(fines.map((fine) =>
        fine._id === editingFine._id ? { ...response?.data, student: fine.student } : fine
      ))
      setEditingFine(null)
    } catch (error: any) {
      console.error("Error updating fine:", error)
      const errorMessage = error.response?.data?.message || "Server is not accepting the request"
      toast({
        title: "Failed to update the fine.",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setEditingFine(null)
    setShowDrawer(false)
  }

  if (!userId) return <Loader />

  return (
    <Card className="container mt-3 mx-auto p-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold mb-6 text-center text-primary">Recent Fines</CardTitle>
      </CardHeader>
      <CardContent>
        {fines.length > 0 ? (
          loading ? (
            <Loader />
          ) : (
            <ScrollArea className="h-[calc(100vh-300px)] w-full rounded-md border p-4">
              <Table>
                <TableCaption>A list of recent fines issued.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Actions</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Issued At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...fines].reverse().map((fine) => (
                    <TableRow
                      key={fine._id}
                      className={`hover:bg-muted/50 transition-colors ${
                        fine.status === "updated"
                          ? "border-l-4 border-green-500"
                          : ""
                      }`}
                    >
                      <TableCell>
                        {isWithin48Hours(fine.issuedAt) ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                              <Button 
                                  variant="outline" 
                                  className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors h-10 w-10"
                                  onClick={() => handleEditClick(fine)}
                                >
                                  <SquarePen size={20} className="text-gray-700 dark:text-gray-200" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit fine details</p>
                              </TooltipContent>
                            </Tooltip>
                        ) : (
                          <Badge variant="secondary" > <PencilOff className="text-muted-foreground" size={15} /></Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{fine.student.name}</TableCell>
                      <TableCell>{fine.student.studentId}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                        <IndianRupee size={10} className="text-muted-foreground" />{fine.amount.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell>{fine.reason}</TableCell>
                      <TableCell>{new Date(fine.issuedAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )
        ) : (
          <NoFinesMessage />
        )}
      </CardContent>
      <Drawer open={showDrawer} onOpenChange={setShowDrawer}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit Fine</DrawerTitle>
            <DrawerDescription>Make changes to the fine details below.</DrawerDescription>
          </DrawerHeader>
          {editingFine && (
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-2">
                <User className="text-muted-foreground" />
                <span>{editingFine.student.name} ({editingFine.student.studentId})</span>
              </div>
              <div>
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <div className="flex items-center mt-1">
                  <IndianRupee className="text-muted-foreground mr-2" />
                  <Input
                    id="amount"
                    type="number"
                    value={editingFine.amount}
                    onChange={(e) => setEditingFine({ ...editingFine, amount: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="reason" className="text-right">
                  Reason
                </Label>
                <Input
                  id="reason"
                  type="text"
                  value={editingFine.reason}
                  onChange={(e) => setEditingFine({ ...editingFine, reason: e.target.value })}
                  className="w-full mt-1"
                />
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Issued: {new Date(editingFine.issuedAt).toLocaleDateString()}</span>
              </div>
            </div>
          )}
          <DrawerFooter>
            <Button onClick={handleUpdateFine}>Save changes</Button>
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Card>
  )
}

export default FinesTable