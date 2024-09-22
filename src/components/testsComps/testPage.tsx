"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'
import { Trash2, StopCircle, Save, Share2, X, CalendarIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface TestParameters {
  srNo: number
  rotorNo: string
  a: number
  b: number
  c: number
  leftRadius: number
  rightRadius: number
  leftTolerance: number
  rightTolerance: number
  unit: string
  rpm: number
  correctionMode: string
}

interface TestResults {
  srNo: number
  leftMass: number
  leftAngle: number
  rightMass: number
  rightAngle: number
  leftResult: string
  rightResult: string
}

const testParametersData: TestParameters = {
  srNo: 1,
  rotorNo: "R001",
  a: 10,
  b: 20,
  c: 30,
  leftRadius: 5,
  rightRadius: 5,
  leftTolerance: 0.1,
  rightTolerance: 0.1,
  unit: "mm",
  rpm: 1000,
  correctionMode: "Single Plane"
}

const testResultsData: TestResults[] = [
  {
    srNo: 1,
    leftMass: 5.2,
    leftAngle: 45,
    rightMass: 4.8,
    rightAngle: 90,
    leftResult: "Pass",
    rightResult: "Pass"
  },
  {
    srNo: 2,
    leftMass: 6.1,
    leftAngle: 30,
    rightMass: 5.5,
    rightAngle: 120,
    leftResult: "Fail",
    rightResult: "Pass"
  }
]

const testResultsColumns: ColumnDef<TestResults>[] = [
  { accessorKey: "srNo", header: "Sr No" },
  { accessorKey: "leftMass", header: "Left Mass" },
  { accessorKey: "leftAngle", header: "Left Angle" },
  { accessorKey: "rightMass", header: "Right Mass" },
  { accessorKey: "rightAngle", header: "Right Angle" },
  { accessorKey: "leftResult", header: "Left Result" },
  { accessorKey: "rightResult", header: "Right Result" },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button variant="ghost" size="sm" onClick={() => console.log("Delete row:", row.original)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    ),
  },
]

const TestPage = () => {
  const [parameters, setParameters] = useState<TestParameters>(testParametersData)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [fileName, setFileName] = useState("")
  const [userName, setUserName] = useState("")
  const [selectedComPort, setSelectedComPort] = useState("")

  const testResultsTable = useReactTable({
    data: testResultsData,
    columns: testResultsColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setParameters(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto p-4 space-y-6" >
      <Card>
        <CardHeader>
          <CardTitle>Test Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fileName">File Name</Label>
              <Input id="fileName" value={fileName} onChange={(e) => setFileName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userName">User Name</Label>
              <Input id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comPort">COM Port</Label>
              <Select value={selectedComPort} onValueChange={setSelectedComPort}>
                <SelectTrigger>
                  <SelectValue placeholder="Select COM port" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COM1">COM1</SelectItem>
                  <SelectItem value="COM2">COM2</SelectItem>
                  <SelectItem value="COM3">COM3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => console.log("Accept Data")}>Accept Data</Button>
            <Button onClick={() => console.log("Start Test")}>Start Test</Button>
            <Button variant="outline" onClick={() => console.log("Cancel")}>Cancel</Button>
            <Button onClick={() => console.log("New Test")}>New Test</Button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Test Parameters</h3>
            <div className="grid grid-cols-6 gap-4">
              {Object.entries(parameters).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Test Results</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {testResultsTable.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {testResultsTable.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-2">
        <Button variant="destructive" onClick={() => console.log("Stop Test")}>
          <StopCircle className="mr-2 h-4 w-4" /> Stop Test
        </Button>
        <Button onClick={() => console.log("Save Test")}>
          <Save className="mr-2 h-4 w-4" /> Save Test
        </Button>
        <Button onClick={() => console.log("Share Test")}>
          <Share2 className="mr-2 h-4 w-4" /> Share Test
        </Button>
        <Button variant="outline" onClick={() => console.log("Close")}>
          <X className="mr-2 h-4 w-4" /> Close
        </Button>
      </div>

      <div className=' bg-red-400 h-[500px] w-[500px]'>

      </div>

      <div className=' bg-red-400 h-[500px] w-[500px]'>

      </div>

      <div className=' bg-red-400 h-[500px] w-[500px]'>

      </div>

      <div className=' bg-red-400 h-[500px] w-[500px]'>

      </div>
    </div>
  )
}

export default TestPage