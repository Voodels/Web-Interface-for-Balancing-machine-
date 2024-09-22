"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserSettings = () => {
  const [userData, setUserData] = useState({
    name: 'Jane Doe',
    address: '123 Main St, Anytown, AN 12345',
    contactNumber: '(555) 123-4567',
    contactPerson: 'John Smith',
    image: '/placeholder.svg?height=100&width=100'
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          setUserData({ ...userData, image: event.target.result as string })
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log('Saving user data:', userData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Settings</h2>
      <div className="flex justify-center">
        <Avatar className="h-20 w-20">
          <AvatarImage src={userData.image} alt="User avatar" />
          <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      {isEditing ? (
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={userData.name} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" value={userData.address} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input id="contactNumber" name="contactNumber" value={userData.contactNumber} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input id="contactPerson" name="contactPerson" value={userData.contactPerson} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Profile Image</Label>
            <Input id="image" name="image" type="file" onChange={handleImageUpload} />
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>Contact Number:</strong> {userData.contactNumber}</p>
          <p><strong>Contact Person:</strong> {userData.contactPerson}</p>
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

export default UserSettings