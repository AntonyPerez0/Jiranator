"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";

// Mock data for board columns and tickets
const boardData = {
  columns: [
    { id: "todo", title: "To Do", count: 3 },
    { id: "inprogress", title: "In Progress", count: 2 },
    { id: "review", title: "In Review", count: 1 },
    { id: "done", title: "Done", count: 2 },
  ],
  tickets: {
    todo: [
      {
        id: "PROJ-118",
        title: "Update user profile API endpoint",
        assignee: {
          name: "Jane Smith",
          avatar: "/placeholder-user.jpg",
          initials: "JS",
        },
        priority: "Medium",
        estimate: "3 points",
      },
      {
        id: "PROJ-105",
        title: "Add unit tests for authentication service",
        assignee: {
          name: "Alex Johnson",
          avatar: "/placeholder-user.jpg",
          initials: "AJ",
        },
        priority: "Medium",
        estimate: "5 points",
      },
      {
        id: "PROJ-125",
        title: "Research new analytics integration",
        assignee: {
          name: "Sarah Williams",
          avatar: "/placeholder-user.jpg",
          initials: "SW",
        },
        priority: "Low",
        estimate: "2 points",
      },
    ],
    inprogress: [
      {
        id: "PROJ-123",
        title: "Fix login page authentication flow",
        assignee: {
          name: "John Doe",
          avatar: "/placeholder-user.jpg",
          initials: "JD",
        },
        priority: "High",
        estimate: "8 points",
      },
      {
        id: "PROJ-108",
        title: "Implement password reset functionality",
        assignee: {
          name: "Jane Smith",
          avatar: "/placeholder-user.jpg",
          initials: "JS",
        },
        priority: "High",
        estimate: "5 points",
      },
    ],
    review: [
      {
        id: "PROJ-115",
        title: "Implement dark mode toggle",
        assignee: {
          name: "Alex Johnson",
          avatar: "/placeholder-user.jpg",
          initials: "AJ",
        },
        priority: "Low",
        estimate: "3 points",
      },
    ],
    done: [
      {
        id: "PROJ-110",
        title: "Fix responsive layout issues on mobile",
        assignee: {
          name: "John Doe",
          avatar: "/placeholder-user.jpg",
          initials: "JD",
        },
        priority: "Medium",
        estimate: "3 points",
      },
      {
        id: "PROJ-103",
        title: "Update documentation for API endpoints",
        assignee: {
          name: "Sarah Williams",
          avatar: "/placeholder-user.jpg",
          initials: "SW",
        },
        priority: "Low",
        estimate: "2 points",
      },
    ],
  },
};

export default function AgileBoardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tickets based on search query
  const filteredBoard = {
    ...boardData,
    tickets: Object.fromEntries(
      Object.entries(boardData.tickets).map(([columnId, tickets]) => [
        columnId,
        tickets.filter(
          (ticket) =>
            ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      ])
    ),
  };

  return (
    <div className="w-full px-4 md:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Sprint 24 Board</h1>
        <div className="text-sm text-muted-foreground">
          May 1 - May 15 • 8 days remaining
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
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
              <DropdownMenuItem>By Assignee</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Ticket
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {boardData.columns.map((column) => (
          <div key={column.id} className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="font-medium">{column.title}</div>
              <Badge variant="outline">
                {filteredBoard.tickets[column.id].length}
              </Badge>
            </div>
            <div className="space-y-3">
              {filteredBoard.tickets[column.id].map((ticket) => (
                <Card key={ticket.id} className="shadow-sm">
                  <CardHeader className="p-3 pb-0">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-mono text-xs">
                        {ticket.id}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Ticket</DropdownMenuItem>
                          <DropdownMenuItem>Move to Column</DropdownMenuItem>
                          <DropdownMenuItem>Assign to Me</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3">
                    <CardTitle className="text-sm font-medium mb-2">
                      {ticket.title}
                    </CardTitle>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage
                            src={ticket.assignee.avatar}
                            alt={ticket.assignee.name}
                          />
                          <AvatarFallback>
                            {ticket.assignee.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-xs text-muted-foreground">
                          {ticket.estimate}
                        </div>
                      </div>
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
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="ghost" className="w-full border border-dashed">
                <Plus className="h-4 w-4 mr-2" />
                Add Card
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
