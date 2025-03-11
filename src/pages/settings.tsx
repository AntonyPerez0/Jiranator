"use client";

import { useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SettingsPage() {
  const [jiraUrl, setJiraUrl] = useState("");
  const [email, setEmail] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [testStatus, setTestStatus] = useState<null | {
    success: boolean;
    message: string;
  }>(null);
  const [loading, setLoading] = useState(false);
  const [publicApiStatus, setPublicApiStatus] = useState<null | {
    success: boolean;
    message: string;
  }>(null);
  const [publicApiLoading, setPublicApiLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setTestStatus(null);

    try {
      console.log(`Testing connection to: ${jiraUrl}`);
      // Create auth header
      const authHeader = `Basic ${btoa(`${email}:${apiToken}`)}`;

      // Test endpoint - get current user info
      const response = await fetch(`${jiraUrl}/rest/api/3/myself`, {
        method: "GET",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      });

      console.log(`Response status: ${response.status}`);

      if (response.ok) {
        const data = await response.json();
        setTestStatus({
          success: true,
          message: `Connected successfully as ${
            data.displayName || data.accountId
          }`,
        });
      } else {
        // Try to get more detailed error info
        let errorMsg = `${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMsg += ` - ${errorData.message || JSON.stringify(errorData)}`;
        } catch {
          // Ignore if error response isn't valid JSON
        }

        setTestStatus({
          success: false,
          message: `Connection failed: ${errorMsg}`,
        });
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setTestStatus({
        success: false,
        message: `Error: ${errorMsg}`,
      });
    } finally {
      setLoading(false);
    }
  };

  // Test with a public API to verify Tauri HTTP plugin is working
  const testPublicApi = async () => {
    setPublicApiLoading(true);
    setPublicApiStatus(null);

    try {
      console.log("Testing connection to public API");
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      console.log(`Public API response status: ${response.status}`);

      if (response.ok) {
        const data = await response.json();
        setPublicApiStatus({
          success: true,
          message: `Success! API returned: ${JSON.stringify(data, null, 2)}`,
        });
      } else {
        setPublicApiStatus({
          success: false,
          message: `Connection failed: ${response.status} ${response.statusText}`,
        });
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setPublicApiStatus({
        success: false,
        message: `Error: ${errorMsg}`,
      });
    } finally {
      setPublicApiLoading(false);
    }
  };

  return (
    <div className="container py-10 space-y-8">
      <h1 className="text-3xl font-bold">API Settings Tests</h1>

      {/* Jira Settings */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Jira Integration</CardTitle>
          <CardDescription>
            Configure your Jira connection settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jiraUrl">Jira URL</Label>
            <Input
              id="jiraUrl"
              type="text"
              placeholder="https://your-domain.atlassian.net"
              value={jiraUrl}
              onChange={(e) => setJiraUrl(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiToken">API Token</Label>
            <Input
              id="apiToken"
              type="password"
              placeholder="Your Jira API token"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Create a token at{" "}
              <a
                href="https://id.atlassian.com/manage/api-tokens"
                target="_blank"
                rel="noreferrer"
                className="text-primary inline-flex items-center hover:underline"
              >
                Atlassian API Tokens
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </p>
          </div>

          {testStatus && (
            <Alert variant={testStatus.success ? "default" : "destructive"}>
              <AlertTitle>
                {testStatus.success ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription>{testStatus.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={testConnection}
            disabled={!jiraUrl || !email || !apiToken || loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Testing..." : "Test Connection"}
          </Button>
        </CardFooter>
      </Card>

      {/* Public API Test Section */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Public API Test</CardTitle>
          <CardDescription>
            Test if the Tauri HTTP plugin is working correctly by connecting to
            a public API
          </CardDescription>
        </CardHeader>
        <CardContent>
          {publicApiStatus && (
            <Alert
              variant={publicApiStatus.success ? "default" : "destructive"}
              className="mb-4"
            >
              <AlertTitle>
                {publicApiStatus.success ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription>
                <pre className="whitespace-pre-wrap break-words max-h-[200px] overflow-y-auto mt-2 text-xs p-2 bg-muted rounded-md">
                  {publicApiStatus.message}
                </pre>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={testPublicApi}
            disabled={publicApiLoading}
            variant="outline"
          >
            {publicApiLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {publicApiLoading ? "Testing..." : "Test Public API"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
