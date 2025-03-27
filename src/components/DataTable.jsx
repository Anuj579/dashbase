'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Input } from "./ui/input";
import { ArrowDown, ArrowUp, Search } from "lucide-react";

const mockData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Manager", status: "Active" },
    { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "User", status: "Active" },
    { id: 6, name: "Eva Wilson", email: "eva@example.com", role: "Admin", status: "Inactive" },
    { id: 7, name: "Frank Miller", email: "frank@example.com", role: "User", status: "Active" },
    { id: 8, name: "Grace Lee", email: "grace@example.com", role: "Manager", status: "Active" },
    { id: 9, name: "Henry Taylor", email: "henry@example.com", role: "User", status: "Inactive" },
    { id: 10, name: "Ivy Clark", email: "ivy@example.com", role: "Admin", status: "Active" },
    { id: 11, name: "Jack Robinson", email: "jack@example.com", role: "User", status: "Active" },
    { id: 12, name: "Karen White", email: "karen@example.com", role: "Manager", status: "Inactive" },
    { id: 13, name: "Leo Martin", email: "leo@example.com", role: "User", status: "Active" },
    { id: 14, name: "Mia Harris", email: "mia@example.com", role: "Admin", status: "Active" },
    { id: 15, name: "Noah Thompson", email: "noah@example.com", role: "User", status: "Inactive" },
]

export function DataTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [totalPages, setTotalPages] = useState(0)
    const [sortOrder, setSortOrder] = useState('asc');

    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;

    const matchText = searchText.toLowerCase();

    const filteredData = mockData.filter((item) =>
        item.name.toLowerCase().includes(matchText) || item.email.toLowerCase().includes(matchText) || item.role.toLowerCase().includes(matchText) || item.status.toLowerCase().includes(matchText)
    );

    const sortedData = [...filteredData].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (sortOrder === 'asc') return nameA.localeCompare(nameB);
        else return nameB.localeCompare(nameA);
    })

    const pages = Math.ceil(filteredData.length / itemsPerPage);

    const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        setTotalPages(pages)
    }, [filteredData])

    useEffect(() => {
        setCurrentPage(1);
    }, [searchText])

    return (
        <div className="max-w-3xl w-full ">
            <div className="sm:flex sm:justify-between sm:items-center mb-4">
                <h1 className="text-3xl font-semibold max-sm:text-center max-sm:mb-4">Details</h1>
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="pl-9 "
                    />
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[130px] cursor-pointer select-none" onClick={() => setSortOrder((prev) => prev === 'asc' ? 'dec' : 'asc')}>Name {sortOrder === "asc" ? <ArrowUp size={18} className="inline" /> : <ArrowDown size={18} className="inline" />}
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right max-sm:hidden">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((data) => (
                        <TableRow key={data.id}>
                            <TableCell className="font-medium">{data.name}</TableCell>
                            <TableCell>{data.email}</TableCell>
                            <TableCell>{data.role}</TableCell>
                            <TableCell className="text-right max-sm:hidden">{data.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination className='mt-4'>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                isActive={currentPage === index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>
    )
}
