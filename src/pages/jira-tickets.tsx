"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronDown,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for tickets
const tickets = [
  {
    id: "PROJ-123",
    title: "Fix login page authentication flow",
    assignee: "John Doe",
    priority: "High",
    status: "In Progress",
    created: "2023-05-01",
    updated: "2023-05-10",
  },
  {
    id: "PROJ-118",
    title: "Update user profile API endpoint",
    assignee: "Jane Smith",
    priority: "Medium",
    status: "To Do",
    created: "2023-04-28",
    updated: "2023-05-09",
  },
  {
    id: "PROJ-115",
    title: "Implement dark mode toggle",
    assignee: "Alex Johnson",
    priority: "Low",
    status: "In Review",
    created: "2023-04-25",
    updated: "2023-05-08",
  },
  {
    id: "PROJ-112",
    title: "Optimize database queries for dashboard",
    assignee: "Sarah Williams",
    priority: "Medium",
    status: "In Progress",
    created: "2023-04-22",
    updated: "2023-05-07",
  },
  {
    id: "PROJ-110",
    title: "Fix responsive layout issues on mobile",
    assignee: "John Doe",
    priority: "Medium",
    status: "Done",
    created: "2023-04-20",
    updated: "2023-05-06",
  },
  {
    id: "PROJ-108",
    title: "Implement password reset functionality",
    assignee: "Jane Smith",
    priority: "High",
    status: "In Progress",
    created: "2023-04-18",
    updated: "2023-05-05",
  },
  {
    id: "PROJ-105",
    title: "Add unit tests for authentication service",
    assignee: "Alex Johnson",
    priority: "Medium",
    status: "To Do",
    created: "2023-04-15",
    updated: "2023-05-04",
  },
  {
    id: "PROJ-103",
    title: "Update documentation for API endpoints",
    assignee: "Sarah Williams",
    priority: "Low",
    status: "Done",
    created: "2023-04-12",
    updated: "2023-05-03",
  },
];

export default function JiraTicketsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full px-4 md:px-6 py-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tickets</CardTitle>
              <CardDescription>
                View and manage your Jira tickets
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Tickets</DropdownMenuItem>
                  <DropdownMenuItem>My Tickets</DropdownMenuItem>
                  <DropdownMenuItem>High Priority</DropdownMenuItem>
                  <DropdownMenuItem>In Progress</DropdownMenuItem>
                  <DropdownMenuItem>Recently Updated</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <div className="font-medium">{ticket.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {ticket.id}
                      </div>
                    </TableCell>
                    <TableCell>{ticket.assignee}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          ticket.priority === "High"
                            ? "destructive"
                            : ticket.priority === "Medium"
                            ? "default"
                            : "outline"
                        }
                      >
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          ticket.status === "Done"
                            ? "success"
                            : ticket.status === "In Progress"
                            ? "default"
                            : ticket.status === "In Review"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.updated}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Ticket</DropdownMenuItem>
                          <DropdownMenuItem>Assign to Me</DropdownMenuItem>
                          <DropdownMenuItem>Change Status</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
