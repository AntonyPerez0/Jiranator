import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, TicketCheck, Trello, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              My Open Tickets
            </CardTitle>
            <TicketCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 high priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sprint Progress
            </CardTitle>
            <Trello className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              Sprint ends in 5 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Workload</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 members</div>
            <p className="text-xs text-muted-foreground">42 tickets assigned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activity
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Updates in last 24h</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
            <CardDescription>
              Your most recently updated tickets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "PROJ-123",
                  title: "Fix login page authentication flow",
                  priority: "High",
                  status: "In Progress",
                },
                {
                  id: "PROJ-118",
                  title: "Update user profile API endpoint",
                  priority: "Medium",
                  status: "To Do",
                },
                {
                  id: "PROJ-115",
                  title: "Implement dark mode toggle",
                  priority: "Low",
                  status: "In Review",
                },
                {
                  id: "PROJ-112",
                  title: "Optimize database queries for dashboard",
                  priority: "Medium",
                  status: "In Progress",
                },
              ].map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <div className="font-medium">{ticket.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {ticket.id}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        ticket.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : ticket.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {ticket.priority}
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {ticket.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/tickets" className="flex items-center">
                  View all tickets
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>My Sprints</CardTitle>
            <CardDescription>Current and upcoming sprints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Sprint 24",
                  status: "Active",
                  progress: 68,
                  endDate: "May 15",
                },
                {
                  name: "Sprint 25",
                  status: "Planning",
                  progress: 0,
                  endDate: "May 29",
                },
                {
                  name: "Sprint 26",
                  status: "Backlog",
                  progress: 0,
                  endDate: "Jun 12",
                },
              ].map((sprint) => (
                <div key={sprint.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{sprint.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Ends {sprint.endDate}
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${sprint.progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {sprint.status === "Active"
                      ? `${sprint.progress}% complete`
                      : sprint.status}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/board" className="flex items-center">
                  View board
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
