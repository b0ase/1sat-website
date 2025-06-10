import Link from 'next/link';
import { FaGithub, FaCode, FaShieldAlt, FaCoins, FaComments, FaBrain, FaWater, FaChartLine, FaRocket, FaClock } from 'react-icons/fa';
import { FaTrendingUp } from 'react-icons/fa6';

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
          parameters: ["redirect_uri?"],
          example: "GET /api/auth/handcash/login?redirect_uri=/profile",
          status: 'available'
        },
        {
          path: "/api/auth/handcash/callback",
          method: "GET",
          description: "Handle HandCash OAuth callback",
          parameters: ["code", "state"],
          example: "Automatically called after HandCash authorization",
          status: 'available'
        },
        {
          path: "/api/auth/handcash/logout",
          method: "POST",
          description: "Logout and clear session",
          authentication: true,
          status: 'available'
        }
      ]
    },
    {
      title: "Token Management",
      icon: <FaCoins className="w-6 h-6" />,
      description: "Basic token listing and management",
      endpoints: [
        {
          path: "/api/tokens/social-links",
          method: "GET",
          description: "Get social links for a token",
          parameters: ["tokenId OR tick"],
          example: "GET /api/tokens/social-links?tick=PEPE",
          status: 'available'
        },
        {
          path: "/api/tokens/social-links",
          method: "POST",
          description: "Update social links for a token",
          parameters: ["tokenId", "socialLinks"],
          authentication: true,
          status: 'available'
        },
        {
          path: "/api/tokens/list",
          method: "POST",
          description: "Create basic token listing",
          parameters: ["tokenId", "amount", "pricePerToken"],
          authentication: true,
          status: 'available'
        }
      ]
    },
    {
      title: "Advanced Pricing Strategies",
      icon: <FaChartLine className="w-6 h-6" />,
      description: "Sophisticated pricing mechanisms for token sales",
      endpoints: [
        {
          path: "/api/pricing/bonding-curve",
          method: "POST",
          description: "Create bonding curve listing - price increases with each purchase",
          parameters: ["tokenId", "initialPrice", "priceMultiplier", "totalSupply", "batchSize"],
          example: "Start at 100 sats, increase by 1.05x after each batch sale",
          authentication: true,
          status: 'planned'
        },
        {
          path: "/api/pricing/dutch-auction",
          method: "POST",
          description: "Create Dutch auction - price decreases over time until sold",
          parameters: ["tokenId", "startPrice", "endPrice", "duration", "decreaseInterval"],
          example: "Start at 1000 sats, decrease by 10% every hour for 24 hours",
          authentication: true,
          status: 'planned'
        },
        {
          path: "/api/pricing/batch-release",
          method: "POST",
          description: "Release tokens in batches based on conditions",
          parameters: ["tokenId", "batchSize", "triggerCondition", "nextBatchPrice"],
          example: "Release 1000 tokens at 500 sats, next batch at 600 sats only after current sells out",
          authentication: true,
          status: 'planned'
        },
        {
          path: "/api/pricing/tiered-pricing",
          method: "POST",
          description: "Different prices for different quantity tiers",
          parameters: ["tokenId", "tiers[]"],
          example: "1-100 tokens: 100 sats, 101-500: 90 sats, 501+: 80 sats",
          authentication: true,
          status: 'planned'
        },
        {
          path: "/api/pricing/dynamic",
          method: "POST",
          description: "AI-powered dynamic pricing based on demand/market conditions",
          parameters: ["tokenId", "basePrice", "demandMultiplier", "marketFactors"],
          authentication: true,
          status: 'coming-soon'
        }
      ]
    },
    {
      title: "Sale Management",
      icon: <FaRocket className="w-6 h-6" />,
      description: "Advanced sale mechanics and automation",
      endpoints: [
        {
          path: "/api/sales/create-campaign",
          method: "POST",
          description: "Create comprehensive sale campaign with multiple strategies",
          parameters: ["tokenId", "strategy", "configuration", "schedule"],
          authentication: true,
          status: 'planned'
        },
        {
          path: "/api/sales/reserve-price",
          method: "POST",
          description: "Set minimum reserve price with automatic relisting",
          parameters: ["tokenId", "reservePrice", "relistDelay"],
          authentication: true,
          status: 'planned'
        },
        {
          path: "/api/sales/whitelist",
          method: "POST",
          description: "Create whitelist-only sale periods",
          parameters: ["tokenId", "whitelistAddresses", "saleWindow", "discountPct"],
          authentication: true,
          status: 'planned'
        },
        {
          path: "/api/sales/bulk-operations",
          method: "POST",
          description: "Batch create/update/cancel multiple listings",
          parameters: ["operations[]"],
          authentication: true,
          status: 'coming-soon'
        }
      ]
    },
    {
      title: "Market Analytics",
      icon: <FaTrendingUp className="w-6 h-6" />,
      description: "Real-time market data and analytics",
      endpoints: [
        {
          path: "/api/analytics/price-history",
          method: "GET",
          description: "Historical price data with various timeframes",
          parameters: ["tokenId", "timeframe", "interval"],
          example: "GET /api/analytics/price-history?tokenId=PEPE&timeframe=7d&interval=1h",
          status: 'coming-soon'
        },
        {
          path: "/api/analytics/demand-indicators",
          method: "GET",
          description: "Real-time demand signals and market sentiment",
          parameters: ["tokenId"],
          status: 'coming-soon'
        },
        {
          path: "/api/analytics/optimal-pricing",
          method: "GET",
          description: "AI-suggested optimal pricing based on market conditions",
          parameters: ["tokenId", "quantity", "timeframe"],
          authentication: true,
          status: 'coming-soon'
        },
        {
          path: "/api/analytics/competitor-analysis",
          method: "GET",
          description: "Compare pricing with similar tokens",
          parameters: ["tokenId", "category"],
          status: 'planned'
        }
      ]
    },
    {
      title: "Automation & Triggers",
      icon: <FaClock className="w-6 h-6" />,
      description: "Automated trading and conditional executions",
      endpoints: [
        {
          path: "/api/automation/price-triggers",
          method: "POST",
          description: "Set price-based triggers for automatic actions",
          parameters: ["tokenId", "triggerPrice", "action", "direction"],
          example: "Auto-list more tokens if price goes above 1000 sats",
          authentication: true,
          status: 'planned'
        },
        {
          path: "/api/automation/time-triggers",
          method: "POST",
          description: "Schedule time-based actions",
          parameters: ["schedule", "action", "parameters"],
          example: "Reduce price by 5% every day at 12:00 UTC",
          authentication: true,
          status: 'planned'
        },
        {
          path: "/api/automation/volume-triggers",
          method: "POST",
          description: "Actions based on trading volume",
          parameters: ["tokenId", "volumeThreshold", "action"],
          authentication: true,
          status: 'planned'
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
          description: "Sanitize external content for safe display",
          parameters: ["url"],
          example: "GET /api/sanitize?url=https://ordfs.network/abc123_0",
          status: 'available'
        }
      ]
    },
    {
      title: "AI Chat Assistant",
      icon: <FaComments className="w-6 h-6" />,
      description: "AI-powered market assistant",
      endpoints: [
        {
          path: "/api/chat",
          method: "POST",
          description: "Chat with AI assistant about market insights",
          parameters: ["message", "context"],
          example: 'POST /api/chat {"message": "What\'s the best pricing strategy for my token?"}',
          status: 'available'
        }
      ]
    },
    {
      title: "AI Models",
      icon: <FaBrain className="w-6 h-6" />,
      description: "Machine learning models for market predictions",
      endpoints: [
        {
          path: "/api/models/price-prediction",
          method: "POST",
          description: "Predict future token prices using ML",
          parameters: ["tokenId", "timeframe", "features"],
          authentication: true,
          status: 'coming-soon'
        },
        {
          path: "/api/models/demand-forecast",
          method: "POST",
          description: "Forecast demand patterns",
          parameters: ["tokenId", "marketConditions"],
          authentication: true,
          status: 'coming-soon'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-accent/5">
      {/* Header */}
      <div className="hero bg-gradient-to-r from-primary to-accent text-primary-content py-20">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">1Sat Ordinals API</h1>
            <p className="text-xl mb-8 opacity-90">
              Comprehensive API suite for BSV token trading, advanced pricing strategies, and market analytics
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="https://github.com/your-repo" className="btn btn-outline btn-primary-content">
                <FaGithub className="w-5 h-5 mr-2" />
                GitHub Documentation
              </Link>
              <Link href="/market/bsv20" className="btn btn-primary-content bg-white/20 hover:bg-white/30 border-none">
                <FaCode className="w-5 h-5 mr-2" />
                Explore Market
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* API Categories */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-8">
          {apiCategories.map((category, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="card-title text-2xl">{category.title}</h2>
                    <p className="text-base-content/70">{category.description}</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {category.endpoints.map((endpoint, endIndex) => (
                    <div key={endIndex} className="border border-base-300 rounded-lg p-4 hover:bg-base-200/50 transition-colors">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className={`badge font-mono font-bold ${
                          endpoint.method === 'GET' ? 'badge-info' :
                          endpoint.method === 'POST' ? 'badge-success' :
                          endpoint.method === 'PUT' ? 'badge-warning' :
                          'badge-error'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm bg-base-300 px-2 py-1 rounded font-mono flex-1 min-w-0">
                          {endpoint.path}
                        </code>
                        {endpoint.authentication && (
                          <span className="badge badge-secondary badge-sm">Auth Required</span>
                        )}
                        {getStatusBadge(endpoint.status)}
                      </div>

                      <p className="text-base-content/80 mb-3">{endpoint.description}</p>

                      {endpoint.parameters && (
                        <div className="mb-3">
                          <p className="text-sm font-semibold mb-1">Parameters:</p>
                          <div className="flex flex-wrap gap-1">
                            {endpoint.parameters.map((param, paramIndex) => (
                              <code key={paramIndex} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                                {param}
                              </code>
                            ))}
                          </div>
                        </div>
                      )}

                      {endpoint.example && (
                        <div>
                          <p className="text-sm font-semibold mb-1">Example:</p>
                          <code className="text-xs bg-base-300 p-2 rounded block font-mono overflow-x-auto">
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

        {/* Implementation Guide */}
        <div className="card bg-gradient-to-r from-accent/10 to-primary/10 shadow-xl mt-12">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">🚀 Advanced Pricing Strategy Examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-base-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-primary">💰 Bonding Curve Strategy</h3>
                <p className="text-sm text-base-content/80 mb-3">
                  Perfect for increasing scarcity and rewarding early buyers. Price automatically increases with each sale.
                </p>
                <div className="mockup-code text-xs">
                  <pre data-prefix="POST"><code>/api/pricing/bonding-curve</code></pre>
                  <pre data-prefix=">" className="text-success"><code>{`{
  "tokenId": "MYTOKEN",
  "initialPrice": 100,
  "priceMultiplier": 1.05,
  "batchSize": 1000
}`}</code></pre>
                </div>
              </div>

              <div className="bg-base-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-accent">🎯 Batch Release Strategy</h3>
                <p className="text-sm text-base-content/80 mb-3">
                  Create artificial scarcity by only releasing new tokens after current batch sells out.
                </p>
                <div className="mockup-code text-xs">
                  <pre data-prefix="POST"><code>/api/pricing/batch-release</code></pre>
                  <pre data-prefix=">" className="text-success"><code>{`{
  "tokenId": "RARETOKEN",
  "batchSize": 500,
  "triggerCondition": "sold_out",
  "nextBatchPrice": 1200
}`}</code></pre>
                </div>
              </div>

              <div className="bg-base-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-warning">⏰ Dutch Auction</h3>
                <p className="text-sm text-base-content/80 mb-3">
                  Start high and automatically decrease price until tokens sell. Great for price discovery.
                </p>
                <div className="mockup-code text-xs">
                  <pre data-prefix="POST"><code>/api/pricing/dutch-auction</code></pre>
                  <pre data-prefix=">" className="text-success"><code>{`{
  "tokenId": "AUCTION",
  "startPrice": 2000,
  "endPrice": 500,
  "duration": "24h",
  "decreaseInterval": "1h"
}`}</code></pre>
                </div>
              </div>

              <div className="bg-base-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-info">📊 Dynamic AI Pricing</h3>
                <p className="text-sm text-base-content/80 mb-3">
                  Let AI analyze market conditions and automatically adjust prices for maximum profit.
                </p>
                <div className="mockup-code text-xs">
                  <pre data-prefix="POST"><code>/api/pricing/dynamic</code></pre>
                  <pre data-prefix=">" className="text-success"><code>{`{
  "tokenId": "SMART",
  "basePrice": 800,
  "demandMultiplier": 1.2,
  "marketFactors": ["volume", "sentiment"]
}`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Authentication Guide */}
        <div className="card bg-base-100 shadow-xl mt-8">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">🔑 Authentication</h2>
            <p className="text-base-content/80 mb-4">
              Most advanced features require HandCash authentication. Here's how to get started:
            </p>

            <div className="steps steps-vertical lg:steps-horizontal">
              <div className="step step-primary">
                <div className="flex flex-col items-center text-center">
                  <span className="font-bold">Connect Wallet</span>
                  <span className="text-sm">Visit /api/auth/handcash/login</span>
                </div>
              </div>
              <div className="step step-primary">
                <div className="flex flex-col items-center text-center">
                  <span className="font-bold">Authorize</span>
                  <span className="text-sm">Complete HandCash OAuth flow</span>
                </div>
              </div>
              <div className="step step-primary">
                <div className="flex flex-col items-center text-center">
                  <span className="font-bold">Access APIs</span>
                  <span className="text-sm">Use authenticated endpoints</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 p-8 bg-base-200 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Ready to build the future of token trading?</h3>
          <p className="text-base-content/70 mb-4">
            Join our community and help shape the next generation of BSV token markets.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/market/bsv20" className="btn btn-primary">
              Start Trading
            </Link>
            <Link href="https://discord.gg/yourserver" className="btn btn-outline">
              Join Discord
            </Link>
            <Link href="https://github.com/your-repo" className="btn btn-outline">
              Contribute
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
