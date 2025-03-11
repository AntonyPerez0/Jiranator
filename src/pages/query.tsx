"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for query results
const queryResults = [
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
];

export default function QueryPage() {
  const [jqlQuery, setJqlQuery] = useState(
    "project = PROJ AND status != Done ORDER BY priority DESC"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setHasResults(true);
    }, 1000);
  };

  return (
    <div className="w-full px-4 md:px-6 py-6">
      <Tabs defaultValue="jql">
        <TabsList className="mb-4">
          <TabsTrigger value="jql">JQL Query</TabsTrigger>
          <TabsTrigger value="builder">Query Builder</TabsTrigger>
          <TabsTrigger value="saved">Saved Queries</TabsTrigger>
        </TabsList>

        <TabsContent value="jql">
          <Card>
            <CardHeader>
              <CardTitle>JQL Query</CardTitle>
              <CardDescription>
                Search for issues using Jira Query Language (JQL)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jql-query">JQL Query</Label>
                  <Textarea
                    id="jql-query"
                    placeholder="Enter your JQL query..."
                    value={jqlQuery}
                    onChange={(e) => setJqlQuery(e.target.value)}
                    className="font-mono text-sm"
                    rows={3}
                  />
                </div>

                {hasResults && (
                  <div className="rounded-md border mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Key</TableHead>
                          <TableHead>Summary</TableHead>
                          <TableHead>Assignee</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Updated</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {queryResults.map((issue) => (
                          <TableRow key={issue.id}>
                            <TableCell className="font-mono">
                              {issue.id}
                            </TableCell>
                            <TableCell>{issue.title}</TableCell>
                            <TableCell>{issue.assignee}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  issue.priority === "High"
                                    ? "destructive"
                                    : issue.priority === "Medium"
                                    ? "default"
                                    : "outline"
                                }
                              >
                                {issue.priority}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  issue.status === "Done"
                                    ? "success"
                                    : issue.status === "In Progress"
                                    ? "default"
                                    : issue.status === "In Review"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {issue.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{issue.updated}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save Query</Button>
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="builder">
          <Card>
            <CardHeader>
              <CardTitle>Query Builder</CardTitle>
              <CardDescription>
                Build your query using a visual interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project">Project</Label>
                    <Select defaultValue="PROJ">
                      <SelectTrigger id="project">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PROJ">Project (PROJ)</SelectItem>
                        <SelectItem value="FEAT">Features (FEAT)</SelectItem>
                        <SelectItem value="BUG">Bugs (BUG)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="issue-type">Issue Type</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="issue-type">
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="story">Story</SelectItem>
                        <SelectItem value="task">Task</SelectItem>
                        <SelectItem value="bug">Bug</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="not-done">
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="not-done">Not Done</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assignee">Assignee</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="assignee">
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="current">Current User</SelectItem>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sort-by">Sort By</Label>
                    <Select defaultValue="priority-desc">
                      <SelectTrigger id="sort-by">
                        <SelectValue placeholder="Select sort order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="priority-desc">
                          Priority (High to Low)
                        </SelectItem>
                        <SelectItem value="priority-asc">
                          Priority (Low to High)
                        </SelectItem>
                        <SelectItem value="created-desc">
                          Created (Newest First)
                        </SelectItem>
                        <SelectItem value="created-asc">
                          Created (Oldest First)
                        </SelectItem>
                        <SelectItem value="updated-desc">
                          Updated (Recent First)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="search-text">Contains Text</Label>
                  <Input
                    id="search-text"
                    placeholder="Search in summary, description, or comments..."
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Queries</CardTitle>
              <CardDescription>Access your saved JQL queries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  {
                    name: "My Open Issues",
                    query:
                      "assignee = currentUser() AND status != Done ORDER BY priority DESC",
                  },
                  {
                    name: "High Priority Bugs",
                    query:
                      "project = PROJ AND issuetype = Bug AND priority = High",
                  },
                  {
                    name: "Recently Updated",
                    query:
                      "project = PROJ AND updated >= -7d ORDER BY updated DESC",
                  },
                  {
                    name: "Sprint Backlog",
                    query: "sprint in openSprints() AND status = 'To Do'",
                  },
                ].map((savedQuery, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{savedQuery.name}</h3>
                        <p className="text-sm text-muted-foreground font-mono mt-1">
                          {savedQuery.query}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm">Run</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
