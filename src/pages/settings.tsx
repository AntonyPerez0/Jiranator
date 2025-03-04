import { useState } from "react";
import { fetch } from "@tauri-apps/plugin-http";

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
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>API Settings Tests</h1>

      {/* Jira Settings */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "5px",
          maxWidth: "600px",
          marginBottom: "30px",
        }}
      >
        <h2>Jira Integration</h2>
        <p style={{ color: "#555", marginBottom: "20px" }}>
          Configure your Jira connection settings
        </p>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="jiraUrl"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Jira URL
          </label>
          <input
            id="jiraUrl"
            type="text"
            placeholder="https://your-domain.atlassian.net"
            value={jiraUrl}
            onChange={(e) => setJiraUrl(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="apiToken"
            style={{ display: "block", marginBottom: "5px" }}
          >
            API Token
          </label>
          <input
            id="apiToken"
            type="password"
            placeholder="Your Jira API token"
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
          <p style={{ fontSize: "0.8rem", color: "#555", marginTop: "5px" }}>
            Create a token at{" "}
            <a
              href="https://id.atlassian.com/manage/api-tokens"
              target="_blank"
              rel="noreferrer"
            >
              Atlassian API Tokens
            </a>
          </p>
        </div>

        <button
          onClick={testConnection}
          disabled={!jiraUrl || !email || !apiToken || loading}
          style={{
            padding: "8px 16px",
            backgroundColor:
              !jiraUrl || !email || !apiToken || loading
                ? "#cccccc"
                : "#0066cc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor:
              !jiraUrl || !email || !apiToken || loading
                ? "not-allowed"
                : "pointer",
          }}
        >
          {loading ? "Testing..." : "Test Connection"}
        </button>

        {testStatus && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: testStatus.success ? "#e6ffe6" : "#ffe6e6",
              border: `1px solid ${testStatus.success ? "#00cc00" : "#cc0000"}`,
              borderRadius: "4px",
            }}
          >
            <strong>{testStatus.success ? "Success" : "Error"}</strong>
            <p>{testStatus.message}</p>
          </div>
        )}
      </div>

      {/* Public API Test Section */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "5px",
          maxWidth: "600px",
        }}
      >
        <h2>Public API Test</h2>
        <p style={{ color: "#555", marginBottom: "20px" }}>
          Test if the Tauri HTTP plugin is working correctly by connecting to a
          public API
        </p>

        <button
          onClick={testPublicApi}
          disabled={publicApiLoading}
          style={{
            padding: "8px 16px",
            backgroundColor: publicApiLoading ? "#cccccc" : "#0066cc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: publicApiLoading ? "not-allowed" : "pointer",
          }}
        >
          {publicApiLoading ? "Testing..." : "Test Public API"}
        </button>

        {publicApiStatus && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: publicApiStatus.success ? "#e6ffe6" : "#ffe6e6",
              border: `1px solid ${
                publicApiStatus.success ? "#00cc00" : "#cc0000"
              }`,
              borderRadius: "4px",
            }}
          >
            <strong>{publicApiStatus.success ? "Success" : "Error"}</strong>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {publicApiStatus.message}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
