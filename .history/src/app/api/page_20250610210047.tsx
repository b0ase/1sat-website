import Link from 'next/link';
import { FaGithub, FaCode, FaShieldAlt, FaCoins, FaComments, FaBrain, FaWater, FaChartLine, FaRocket, FaClock } from 'react-icons/fa';

interface APIEndpoint {
  path: string;
  method: string;
  description: string;
  parameters?: string[];
  example?: string;
  authentication?: boolean;
  status?: 'available' | 'coming-soon' | 'planned';
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
          parameters: ["redirect_uri (optional)"],
          example: "GET /api/auth/handcash/login",
          status: 'available'
        },
        {
          path: "/api/auth/handcash/callback",
          method: "GET",
          description: "Handle HandCash OAuth callback",
          parameters: ["code", "state"],
          example: "GET /api/auth/handcash/callback?code=abc123",
          status: 'available'
        },
        {
          path: "/api/auth/handcash/logout",
          method: "POST",
          description: "Handle user logout",
          example: "POST /api/auth/handcash/logout",
          status: 'available'
        }
      ]
    },
    {
      title: "Token Management",
      icon: <FaCoins className="w-6 h-6" />,
      description: "Token social links and metadata management",
      endpoints: [
        {
          path: "/api/tokens/social-links",
          method: "GET",
          description: "Get social links for a token",
          parameters: ["tokenId", "tick"],
          example: "GET /api/tokens/social-links?tick=ORDI",
          status: 'available'
        },
        {
          path: "/api/tokens/social-links",
          method: "POST",
          description: "Update social links for a token",
          parameters: ["tokenId", "tick", "socialLinks"],
          example: "POST /api/tokens/social-links",
          authentication: true,
          status: 'available'
        }
      ]
    },
    {
      title: "Content Security",
      icon: <FaShieldAlt className="w-6 h-6" />,
      description: "Content sanitization and security",
      endpoints: [
        {
          path: "/api/sanitize",
          method: "GET",
          description: "Sanitize external content (SVG, HTML, images)",
          parameters: ["url"],
          example: "GET /api/sanitize?url=https://example.com/image.svg",
          status: 'available'
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
          description: "Chat with AI assistant",
          parameters: ["messages", "model"],
          example: "POST /api/chat",
          status: 'available'
        }
      ]
    },
    {
      title: "AI Models",
      icon: <FaBrain className="w-6 h-6" />,
      description: "Local and cloud AI model endpoints",
      endpoints: [
        {
          path: "/api/ollama/generate",
          method: "POST",
          description: "Generate content using local Ollama models",
          parameters: ["model", "prompt", "stream"],
          example: "POST /api/ollama/generate",
          status: 'available'
        },
        {
          path: "/api/ollama/model",
          method: "GET",
          description: "Get available Ollama models",
          example: "GET /api/ollama/model",
          status: 'available'
        },
        {
          path: "/api/openai/generate",
          method: "POST",
          description: "Generate content using OpenAI models",
          parameters: ["model", "messages", "temperature"],
          example: "POST /api/openai/generate",
          status: 'available'
        },
        {
          path: "/api/openai/transcribe",
          method: "POST",
          description: "Transcribe audio using OpenAI Whisper",
          parameters: ["file"],
          example: "POST /api/openai/transcribe",
          status: 'available'
        }
      ]
    },
    {
      title: "Advanced Pricing Strategies",
      icon: <FaChartLine className="w-6 h-6" />,
      description: "Sophisticated token selling mechanisms",
      endpoints: [
        {
          path: "/api/pricing/bonding-curve",
          method: "POST",
          description: "Create bonding curve pricing (price increases with sales)",
          parameters: ["tokenId", "initialPrice", "curve", "maxPrice"],
          example: "POST /api/pricing/bonding-curve",
          authentication: true,
          status: 'planned'
        },
        {
          path: "/api/pricing/dutch-auction",
          method: "POST",
          description: "Start Dutch auction (price decreases over time)",
          parameters: ["tokenId", "startPrice", "endPrice", "duration"],
          example: "POST /api/pricing/dutch-auction",
          authentication: true,
          status: 'planned'
        },
        {
          path: "/api/pricing/batch-release",
          method: "POST",
          description: "Release tokens in batches with conditions",
          parameters: ["tokenId", "batches", "conditions"],
          example: "POST /api/pricing/batch-release",
          authentication: true,
          status: 'planned'
        },
        {
          path: "/api/pricing/whitelist",
          method: "POST",
          description: "Create whitelist-based pricing tiers",
          parameters: ["tokenId", "tiers", "addresses"],
          example: "POST /api/pricing/whitelist",
          authentication: true,
          status: 'planned'
        }
      ]
    },
    {
      title: "Market Automation",
      icon: <FaRocket className="w-6 h-6" />,
      description: "Automated trading and market making",
      endpoints: [
        {
          path: "/api/automation/volume-triggers",
          method: "POST",
          description: "Set price changes based on volume milestones",
          parameters: ["tokenId", "triggers"],
          example: "POST /api/automation/volume-triggers",
          authentication: true,
          status: 'planned'
        },
        {
          path: "/api/automation/market-maker",
          method: "POST",
          description: "Enable automated market making",
          parameters: ["tokenId", "spread", "liquidity"],
          example: "POST /api/automation/market-maker",
          authentication: true,
          status: 'planned'
        },
        {
          path: "/api/automation/stop-loss",
          method: "POST",
          description: "Set automatic stop-loss orders",
          parameters: ["tokenId", "stopPrice", "quantity"],
          example: "POST /api/automation/stop-loss",
          authentication: true,
          status: 'planned'
        }
      ]
    },
    {
      title: "Analytics & Insights",
      icon: <FaChartLine className="w-6 h-6" />,
      description: "Market analysis and performance metrics",
      endpoints: [
        {
          path: "/api/analytics/price-history",
          method: "GET",
          description: "Get detailed price history and trends",
          parameters: ["tokenId", "timeframe", "interval"],
          example: "GET /api/analytics/price-history?tokenId=ORDI&timeframe=30d",
          status: 'planned'
        },
        {
          path: "/api/analytics/holder-analysis",
          method: "GET",
          description: "Analyze holder distribution and behavior",
          parameters: ["tokenId"],
          example: "GET /api/analytics/holder-analysis?tokenId=ORDI",
          status: 'planned'
        },
        {
          path: "/api/analytics/market-sentiment",
          method: "GET",
          description: "Get market sentiment indicators",
          parameters: ["tokenId"],
          example: "GET /api/analytics/market-sentiment?tokenId=ORDI",
          status: 'planned'
        }
      ]
    },
    {
      title: "Scheduled Operations",
      icon: <FaClock className="w-6 h-6" />,
      description: "Time-based automated actions",
      endpoints: [
        {
          path: "/api/scheduler/delayed-listing",
          method: "POST",
          description: "Schedule future token listings",
          parameters: ["tokenId", "listingTime", "price"],
          example: "POST /api/scheduler/delayed-listing",
          authentication: true,
          status: 'planned'
        },
        {
          path: "/api/scheduler/recurring-sales",
          method: "POST",
          description: "Set up recurring token sales",
          parameters: ["tokenId", "schedule", "quantity"],
          example: "POST /api/scheduler/recurring-sales",
          authentication: true,
          status: 'planned'
        }
      ]
    }
  ];

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'available':
        return <span className="badge badge-success badge-sm">Available</span>;
      case 'coming-soon':
        return <span className="badge badge-warning badge-sm">Coming Soon</span>;
      case 'planned':
        return <span className="badge badge-info badge-sm">Planned</span>;
      default:
        return <span className="badge badge-success badge-sm">Available</span>;
    }
  };

  const getMethodBadge = (method: string) => {
    const colors = {
      GET: 'badge-accent',
      POST: 'badge-primary',
      PUT: 'badge-warning',
      DELETE: 'badge-error'
    };
    return <span className={`badge badge-sm ${colors[method as keyof typeof colors] || 'badge-neutral'}`}>{method}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaCode className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              1Sat Ordinals API
            </h1>
          </div>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Comprehensive API documentation for the 1Sat Ordinals marketplace.
            Build powerful applications with our token management, AI features, and advanced trading mechanisms.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Link href="https://github.com/b0ase/1sat-website" className="btn btn-outline btn-sm gap-2">
              <FaGithub className="w-4 h-4" />
              View Source
            </Link>
            <span className="text-sm text-base-content/50">Base URL: {typeof window !== 'undefined' ? window.location.origin : 'https://1satordinals.com'}</span>
          </div>
        </div>

        {/* Authentication Notice */}
        <div className="alert alert-info mb-8">
          <FaShieldAlt className="w-5 h-5" />
          <div>
            <h3 className="font-bold">Authentication</h3>
            <div className="text-sm">
              Endpoints marked with 🔒 require HandCash OAuth authentication.
              Use <code className="bg-base-300 px-2 py-1 rounded">/api/auth/handcash/login</code> to get started.
            </div>
          </div>
        </div>

        {/* API Categories */}
        <div className="grid gap-8">
          {apiCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="card-title text-2xl text-primary">{category.title}</h2>
                    <p className="text-base-content/70">{category.description}</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {category.endpoints.map((endpoint, endpointIndex) => (
                    <div key={endpointIndex} className="border border-base-300 rounded-lg p-4 bg-base-50 hover:bg-base-200 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getMethodBadge(endpoint.method)}
                          <code className="font-mono text-sm bg-base-300 px-2 py-1 rounded">
                            {endpoint.path}
                          </code>
                          {endpoint.authentication && <span className="text-warning">🔒</span>}
                        </div>
                        {getStatusBadge(endpoint.status)}
                      </div>

                      <p className="text-base-content/80 mb-3">{endpoint.description}</p>

                      {endpoint.parameters && (
                        <div className="mb-3">
                          <h4 className="font-semibold text-sm text-base-content/70 mb-2">Parameters:</h4>
                          <div className="flex flex-wrap gap-2">
                            {endpoint.parameters.map((param, paramIndex) => (
                              <span key={paramIndex} className="bg-base-300 text-xs px-2 py-1 rounded font-mono">
                                {param}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {endpoint.example && (
                        <div>
                          <h4 className="font-semibold text-sm text-base-content/70 mb-2">Example:</h4>
                          <code className="block bg-base-300 p-2 rounded text-xs font-mono text-base-content/90">
                            {endpoint.example}
                          </code>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-base-300">
          <p className="text-base-content/60 text-sm">
            This API is actively developed. Endpoints marked as &quot;Planned&quot; will be implemented based on community feedback and platform needs.
          </p>
          <div className="mt-4">
            <Link href="/" className="btn btn-primary btn-sm">
              Back to Marketplace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
