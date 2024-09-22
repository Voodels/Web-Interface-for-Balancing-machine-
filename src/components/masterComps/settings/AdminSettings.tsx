"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const AdminSettings = () => {
  const [adminData, setAdminData] = useState({
    name: 'John Doe',
    machineModel: 'XYZ-1000',
    machineSrNo: 'SN12345',
    logo: '/placeholder.svg?height=100&width=100'
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          setAdminData({ ...adminData, logo: event.target.result as string })
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log('Saving admin data:', adminData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Admin Settings</h2>
      <div className="flex justify-center">
        <Avatar className="h-20 w-20">
          <AvatarImage src={adminData.logo} alt="Admin logo" />
          <AvatarFallback>{adminData.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      {isEditing ? (
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={adminData.name} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="machineModel">Machine Model</Label>
            <Input id="machineModel" name="machineModel" value={adminData.machineModel} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="machineSrNo">Machine Sr No</Label>
            <Input id="machineSrNo" name="machineSrNo" value={adminData.machineSrNo} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Logo</Label>
            <Input id="logo" name="logo" type="file" onChange={handleImageUpload} />
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <p><strong>Name:</strong> {adminData.name}</p>
          <p><strong>Machine Model:</strong> {adminData.machineModel}</p>
          <p><strong>Machine Sr No:</strong> {adminData.machineSrNo}</p>
        </div>
      )}
      <div className="flex justify-end space-x-2">
        {isEditing ? (
          <>
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </div>
    </div>
  )
}

export default AdminSettings