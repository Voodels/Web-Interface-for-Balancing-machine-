"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AdminSettings from './settings/AdminSettings'
import UserSettings from './settings/UserSettings'

interface Report {
  id: string
  title: string
  date: string
}

const MasterUser = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'User',
    avatar: '/placeholder.svg?height=100&width=100'
  })

  const [reports, setReports] = useState<Report[]>([
    { id: '1', title: 'Monthly Report', date: '2023-05-01' },
    { id: '2', title: 'Quarterly Review', date: '2023-06-30' },
    { id: '3', title: 'Annual Summary', date: '2023-12-31' },
  ])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">Role: {user.role}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Settings</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              {user.role === 'Admin' ? <AdminSettings /> : <UserSettings />}
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Previous Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {reports.map(report => (
              <li key={report.id} className="flex justify-between items-center">
                <span>{report.title}</span>
                <span className="text-gray-500">{report.date}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default MasterUser