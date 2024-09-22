'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'
import { Trash2, Printer, X, Share2, Check, ChevronsUpDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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
  unitRPM: number
  correctionMode: string
}

interface TestResults {
  srNo: number
  rightResults: string
  leftMass: number
  leftAngle: number
  rightAngle: number
  leftResults: string
  rightMass: number
}

const testParametersData: TestParameters[] = [
  {
    srNo: 1,
    rotorNo: "R001",
    a: 10,
    b: 20,
    c: 30,
    leftRadius: 5,
    rightRadius: 5,
    leftTolerance: 0.1,
    rightTolerance: 0.1,
    unitRPM: 1000,
    correctionMode: "Single Plane"
  }
]

const testResultsData: TestResults[] = [
  {
    srNo: 1,
    rightResults: "Pass",
    leftMass: 5.2,
    leftAngle: 45,
    rightAngle: 90,
    leftResults: "Pass",
    rightMass: 4.8
  },
  {
    srNo: 2,
    rightResults: "Fail",
    leftMass: 6.1,
    leftAngle: 30,
    rightAngle: 120,
    leftResults: "Pass",
    rightMass: 5.5
  }
]

const testParametersColumns: ColumnDef<TestParameters>[] = [
  { accessorKey: "srNo", header: "Sr No" },
  { accessorKey: "rotorNo", header: "Rotor No" },
  { accessorKey: "a", header: "A" },
  { accessorKey: "b", header: "B" },
  { accessorKey: "c", header: "C" },
  { accessorKey: "leftRadius", header: "Left Radius" },
  { accessorKey: "rightRadius", header: "Right Radius" },
  { accessorKey: "leftTolerance", header: "Left Tolerance" },
  { accessorKey: "rightTolerance", header: "Right Tolerance" },
  { accessorKey: "unitRPM", header: "Unit RPM" },
  { accessorKey: "correctionMode", header: "Correction Mode" }
]

const testResultsColumns: ColumnDef<TestResults>[] = [
  { accessorKey: "srNo", header: "Sr No" },
  { accessorKey: "rightResults", header: "Right Results" },
  { accessorKey: "leftMass", header: "Left Mass" },
  { accessorKey: "leftAngle", header: "Left Angle" },
  { accessorKey: "rightAngle", header: "Right Angle" },
  { accessorKey: "leftResults", header: "Left Results" },
  { accessorKey: "rightMass", header: "Right Mass" },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button variant="ghost" size="sm" onClick={() => console.log("Delete row:", row.original)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    ),
  },
]

const files = [
  { value: "file1", label: "Report_001.pdf" },
  { value: "file2", label: "Report_002.pdf" },
  { value: "file3", label: "Report_003.pdf" },
  { value: "file4", label: "Report_004.pdf" },
  { value: "file5", label: "Report_005.pdf" },
]

const Reports = () => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
  
    const testParametersTable = useReactTable({
      data: testParametersData,
      columns: testParametersColumns,
      getCoreRowModel: getCoreRowModel(),
    })
  
    const testResultsTable = useReactTable({
      data: testResultsData,
      columns: testResultsColumns,
      getCoreRowModel: getCoreRowModel(),
    })
  
    return (
      <div className="container mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">File Selection</h3>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between md:w-[300px]"
                  >
                    {selectedFile
                      ? files.find((file) => file.value === selectedFile)?.label
                      : "Select a file..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 md:w-[300px]">
                  <Command>
                    <CommandInput placeholder="Search files..." />
                    <CommandList>
                      <CommandEmpty>No file found.</CommandEmpty>
                      <CommandGroup>
                        {files.map((file) => (
                          <CommandItem
                            key={file.value}
                            onSelect={() => {
                              setSelectedFile(file.value === selectedFile ? null : file.value)
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedFile === file.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {file.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
  
            {selectedFile && (
              <>
                <div className="overflow-x-auto">
                  <h3 className="text-lg font-semibold mb-2">Test Parameters</h3>
                  <Table className="rounded-lg border border-gray-300 shadow-md">
                    <TableHeader className="bg-gray-100 rounded-t-lg">
                      {testParametersTable.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead key={header.id} className="px-4 py-2 text-sm font-medium border-b border-gray-300">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody className="rounded-b-lg">
                      {testParametersTable.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className="hover:bg-gray-50 transition-colors">
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="px-4 py-2 text-sm border-b border-gray-300">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
  
                <div className="overflow-x-auto mt-6">
                  <h3 className="text-lg font-semibold mb-2">Test Results</h3>
                  <Table className="rounded-lg border border-gray-300 shadow-md">
                    <TableHeader className="bg-gray-100 rounded-t-lg">
                      {testResultsTable.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead key={header.id} className="px-4 py-2 text-sm font-medium border-b border-gray-300">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody className="rounded-b-lg">
                      {testResultsTable.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className="hover:bg-gray-50 transition-colors">
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="px-4 py-2 text-sm border-b border-gray-300">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-wrap justify-end gap-2">
            <Button onClick={() => console.log("Print report")}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button variant="outline" onClick={() => console.log("Close report")}>
              <X className="mr-2 h-4 w-4" /> Close
            </Button>
            <Button variant="destructive" onClick={() => console.log("Delete report")}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
            <Button onClick={() => console.log("Share report")}>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }
  
  export default Reports