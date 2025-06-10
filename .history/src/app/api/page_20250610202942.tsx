import Link from 'next/link';
import { FaGithub, FaCode, FaShieldAlt, FaCoins, FaComments, FaBrain, FaWater } from 'react-icons/fa';

interface APIEndpoint {
  path: string;
  method: string;
  description: string;
  parameters?: string[];
  example?: string;
  authentication?: boolean;
}

interface APICategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  endpoints: APIEndpoint[];
}

export default function APIDocumentationPage() {
  const apiCategories: APICategory[] = [
    {
      title: "Authentication",
      icon: <FaShieldAlt className="w-6 h-6" />,
      description: "HandCash OAuth authentication endpoints",
      endpoints: [
        {
          path: "/api/auth/handcash/login",
          method: "GET",
          description: "Generate HandCash OAuth login URL",
          example: "GET /api/auth/handcash/login",
        },
        {
          path: "/api/auth/handcash/callback",
          method: "GET",
          description: "Handle HandCash OAuth callback with authorization code",
          parameters: ["code", "state"],
          example: "GET /api/auth/handcash/callback?code=abc123&state=xyz",
        },
        {
          path: "/api/auth/handcash/logout",
          method: "POST",
          description: "Logout current user and clear authentication",
          authentication: true,
          example: "POST /api/auth/handcash/logout",
        }
      ]
    },
    {
      title: "Token Management",
      icon: <FaCoins className="w-6 h-6" />,
      description: "BSV20/BSV21 token social links and metadata",
      endpoints: [
        {
          path: "/api/tokens/social-links",
          method: "GET",
          description: "Get social links for a specific token",
          parameters: ["tokenId OR tick"],
          example: "GET /api/tokens/social-links?tick=PEPE",
        },
        {
          path: "/api/tokens/social-links",
          method: "POST",
          description: "Update social links for a token (creator only)",
          parameters: ["tokenId", "socialLinks"],
          authentication: true,
          example: "POST /api/tokens/social-links",
        }
      ]
    },
    {
      title: "Content Security",
      icon: <FaWater className="w-6 h-6" />,
      description: "Sanitize and validate external content",
      endpoints: [
        {
          path: "/api/sanitize",
          method: "GET",
          description: "Sanitize SVG, HTML, and image content from external URLs",
          parameters: ["url"],
          example: "GET /api/sanitize?url=https://ordfs.network/abc123_0",
        }
      ]
    },
    {
      title: "AI Chat",
      icon: <FaComments className="w-6 h-6" />,
      description: "AI-powered chat and assistance",
      endpoints: [
        {
          path: "/api/chat",
          method: "POST",
          description: "Stream AI chat responses for user queries",
          parameters: ["messages"],
          example: "POST /api/chat",
        }
      ]
    },
    {
      title: "AI Models",
      icon: <FaBrain className="w-6 h-6" />,
      description: "External AI model integrations",
      endpoints: [
        {
          path: "/api/openai",
          method: "POST",
          description: "OpenAI GPT model integration",
          parameters: ["prompt", "model"],
          example: "POST /api/openai",
        },
        {
          path: "/api/ollama",
          method: "POST",
          description: "Local Ollama model integration",
          parameters: ["prompt", "model"],
          example: "POST /api/ollama",
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <FaCode className="w-12 h-12 text-primary mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              1Sat API Documentation
            </h1>
          </div>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            Complete API reference for the 1Sat Ordinals platform. Manage tokens, authenticate users,
            sanitize content, and integrate AI features.
          </p>
          <div className="flex items-center justify-center mt-6 gap-4">
            <div className="badge badge-primary badge-lg">REST API</div>
            <div className="badge badge-secondary badge-lg">JSON</div>
            <div className="badge badge-accent badge-lg">OAuth 2.0</div>
          </div>
        </div>

        {/* Base URL */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl">
              <FaGithub className="w-6 h-6" />
              Base URL
            </h2>
            <div className="bg-base-200 p-4 rounded-lg font-mono text-sm">
              <span className="text-accent">Production:</span> https://1sat.market<br/>
              <span className="text-info">Development:</span> http://localhost:3000
            </div>
          </div>
        </div>

        {/* API Categories */}
        <div className="grid gap-8">
          {apiCategories.map((category, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-3xl mb-4">
                  <span className="text-primary">{category.icon}</span>
                  {category.title}
                </h2>
                <p className="text-base-content/70 mb-6 text-lg">{category.description}</p>

                <div className="space-y-4">
                  {category.endpoints.map((endpoint, endpointIndex) => (
                    <div key={endpointIndex} className="border border-base-300 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className={`badge ${
                            endpoint.method === 'GET' ? 'badge-info' :
                            endpoint.method === 'POST' ? 'badge-success' :
                            'badge-warning'
                          } badge-lg font-mono`}>
                            {endpoint.method}
                          </span>
                          <code className="text-lg font-mono bg-base-200 px-3 py-1 rounded">
                            {endpoint.path}
                          </code>
                        </div>
                        {endpoint.authentication && (
                          <div className="badge badge-warning">
                            <FaShieldAlt className="w-3 h-3 mr-1" />
                            Auth Required
                          </div>
                        )}
                      </div>

                      <p className="text-base-content/80 mb-4">{endpoint.description}</p>

                      {endpoint.parameters && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-base-content/60">Parameters</h4>
                          <div className="flex flex-wrap gap-2">
                            {endpoint.parameters.map((param, paramIndex) => (
                              <span key={paramIndex} className="badge badge-outline">
                                {param}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {endpoint.example && (
                        <div>
                          <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-base-content/60">Example</h4>
                          <div className="bg-base-200 p-3 rounded font-mono text-sm">
                            {endpoint.example}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Authentication Guide */}
        <div className="card bg-gradient-to-r from-primary/10 to-accent/10 shadow-xl mt-8">
          <div className="card-body">
            <h2 className="card-title text-2xl">
              <FaShieldAlt className="w-6 h-6" />
              Authentication Guide
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="font-semibold mb-2">HandCash OAuth Flow</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Direct user to <code>/api/auth/handcash/login</code></li>
                  <li>User authorizes on HandCash</li>
                  <li>HandCash redirects to <code>/api/auth/handcash/callback</code></li>
                  <li>JWT token set as HTTP-only cookie</li>
                  <li>Use authenticated endpoints with cookie</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Token Features</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Secure JWT tokens</li>
                  <li>User profile data</li>
                  <li>Handle and display name</li>
                  <li>Avatar URL</li>
                  <li>Creator verification status</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-base-300">
          <p className="text-base-content/60">
            Need help? Join our community or{' '}
            <Link href="/" className="link link-primary">
              return to the main site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
