"use client"

// pages/index.js
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerOffset = 80 // Height of the fixed header
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    })
  }
}

export default function Home() {
  const sectionsRef = useRef<HTMLElement[]>([])
  const [selectedSport, setSelectedSport] = useState("NBA")

  useEffect(() => {
    // Handle hash links on page load
    const handleHashLink = () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        scrollToSection(hash)
      }
    }

    window.addEventListener('load', handleHashLink)
    return () => window.removeEventListener('load', handleHashLink)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '-50px'
      }
    )

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section)
      }
    })

    return () => observer.disconnect()
  }, [])

  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
    if (el) {
      sectionsRef.current[index] = el
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative scroll-smooth">
      {/* Analytics Background Pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#90E0EF_1px,transparent_1px)] opacity-[0.15] [background-size:32px_32px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00B4D8_1px,transparent_1px),linear-gradient(to_bottom,#00B4D8_1px,transparent_1px)] opacity-[0.1] [background-size:32px_32px]"></div>
      </div>

      {/* Decorative gradient elements with updated positioning and effects */}
      <div className="fixed left-0 bottom-0 w-[500px] h-[500px] opacity-40">
        <div className="w-full h-full bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] rounded-full blur-[128px] transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div className="fixed right-0 top-1/3 w-[600px] h-[600px] opacity-40">
        <div className="w-full h-full bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] rounded-full blur-[128px] transform translate-x-1/3"></div>
      </div>
      <div className="fixed left-1/2 top-0 w-[400px] h-[400px] opacity-30">
        <div className="w-full h-full bg-gradient-to-r from-[#00B4D8] to-[#FF00FF] rounded-full blur-[96px] transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between max-w-7xl mx-auto relative">
          <div className="flex justify-between items-center w-full md:w-auto">
            <Link href="/">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] text-transparent bg-clip-text">
                PropFinds
              </div>
            </Link>
            <div className="md:hidden">
              <Link
                href="/projections"
                className="gradient-button px-6 py-2 rounded-full text-black font-medium text-base hover:shadow-lg transition duration-300"
              >
                <span>Find Picks Now</span>
              </Link>
            </div>
          </div>
          
          <nav className="flex flex-row flex-wrap justify-start md:absolute md:left-1/2 md:-translate-x-1/2 gap-4 md:space-x-8 mt-4 md:mt-0 items-center pl-2 md:pl-0">
            <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-white transition">
              Features
            </button>
            <button onClick={() => scrollToSection('sports')} className="text-gray-300 hover:text-white transition">
              Sports
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-white transition">
              Pricing
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition">
              Contact
            </button>
          </nav>

          <div className="hidden md:block">
            <Link
              href="/projections"
              className="gradient-button px-8 py-4 rounded-full text-black font-medium text-lg hover:shadow-lg transition duration-300 rounded-full"
            >
              <span>Find Picks Now</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] text-transparent bg-clip-text">
            Discover Winning Picks. Make Every Bet Count.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Unlock real-time sports data for smart prop insights—effortlessly discover, analyze, and manage your picks across top sportsbooks.
          </p>
          <Link href="/projections">
            <Button className="gradient-button text-black px-8 py-6 text-lg hover:shadow-lg transition duration-300">
              <span>Find Picks Now</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={setSectionRef(0)}
        id="features" 
        className="relative z-10 py-20 px-4 scroll-mt-20 opacity-0 translate-y-4 transition-all duration-700 ease-out"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] text-transparent bg-clip-text">
              Features
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to make informed betting decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-black/50 backdrop-blur-sm border-gray-800 hover:border-[#00B4D8] transition-colors duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Player Projections</h3>
                <p className="text-gray-400">
                  Advanced statistical models for accurate player performance predictions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 backdrop-blur-sm border-gray-800 hover:border-[#00B4D8] transition-colors duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] flex items-center justify-center mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Lineup Optimizer</h3>
                <p className="text-gray-400">
                  Build optimal lineups based on projections and value
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 backdrop-blur-sm border-gray-800 hover:border-[#00B4D8] transition-colors duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Real-time Updates</h3>
                <p className="text-gray-400">
                  Stay ahead with live odds and line movement alerts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section 
        ref={setSectionRef(1)}
        id="sports" 
        className="relative z-10 py-20 px-4 scroll-mt-20 opacity-0 translate-y-4 transition-all duration-700 ease-out"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] text-transparent bg-clip-text">
              Available Sports
            </h2>
            <p className="text-gray-400 text-lg">
              Comprehensive analytics across major sports leagues
            </p>
          </div>

          {/* Sports Selection Bar */}
          <div className="flex justify-center mb-12 overflow-x-auto pb-4">
            <div className="flex space-x-2 p-1 bg-black/30 backdrop-blur-sm rounded-full border border-gray-800">
              {["NBA", "NFL", "MLB", "Esports"].map((sport) => (
                <button
                  key={sport}
                  onClick={() => setSelectedSport(sport)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    selectedSport === sport
                      ? "gradient-button text-black font-medium"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span>{sport}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sports Content */}
          <div className="max-w-4xl mx-auto">
            {selectedSport === "NBA" && (
              <div className="space-y-8">
                <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] flex items-center justify-center">
                      <span className="text-3xl">🏀</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">NBA Analytics</h3>
                      <p className="text-gray-400">Comprehensive coverage of all NBA games and player statistics</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Available Data</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Player Props & Performance Metrics
                        </li>
                        <li className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Team Statistics & Trends
                        </li>
                        <li className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Historical Performance Data
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Player Props</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Game Lines</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Advanced Stats</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Live Updates</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Injury Reports</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedSport === "NFL" && (
              <div className="space-y-8">
                <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] flex items-center justify-center">
                      <span className="text-3xl">🏈</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">NFL Analytics</h3>
                      <p className="text-gray-400">In-depth analysis of NFL games and player performance</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Available Data</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Player Props & Performance Stats
                        </li>
                        <li className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Team Analytics & Trends
                        </li>
                        <li className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Weather Impact Analysis
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Player Props</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Game Lines</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Advanced Stats</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Weather Data</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Injury Updates</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedSport === "MLB" && (
              <div className="space-y-8">
                <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] flex items-center justify-center">
                      <span className="text-3xl">⚾</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">MLB Analytics</h3>
                      <p className="text-gray-400">Complete baseball statistics and performance metrics</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Available Data</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Player Props & Statistics
                        </li>
                        <li className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Pitching Analysis
                        </li>
                        <li className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Weather & Ballpark Factors
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Player Props</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Game Lines</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Advanced Stats</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Pitcher Analysis</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Park Factors</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedSport === "Esports" && (
              <div className="space-y-8">
                <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] flex items-center justify-center">
                      <span className="text-3xl">🎮</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Esports Analytics</h3>
                      <p className="text-gray-400">Coverage across major esports titles and tournaments</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Available Data</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Player & Team Statistics
                        </li>
                        <li className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Tournament Analysis
                        </li>
                        <li className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Meta & Patch Impact
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Games Covered</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">CS2</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Dota 2</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">LoL</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Valorant</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">COD</span>
                        <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Rocket League</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section 
        ref={setSectionRef(2)}
        id="pricing" 
        className="relative z-10 py-20 px-4 scroll-mt-20 opacity-0 translate-y-4 transition-all duration-700 ease-out"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly Plan */}
            <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#333] hover:border-[#00B4D8] transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-white">Monthly Plan</h3>
              <div className="text-4xl font-bold mb-6 text-white">
                $14.99<span className="text-lg text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time odds and lines
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Player projections
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced analytics
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Mobile app access
                </li>
              </ul>
              <button className="w-full py-3 px-6 rounded-lg gradient-button text-black font-semibold hover:shadow-lg hover:shadow-[#00B4D8]/20 transition-all duration-300">
                Start 3-Day Free Trial
              </button>
            </div>

            {/* Yearly Plan */}
            <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#333] hover:border-[#00B4D8] transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] text-white px-4 py-1 rounded-full text-sm font-semibold">
                Best Value
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Yearly Plan</h3>
              <div className="text-4xl font-bold mb-2 text-white">
                $139.99<span className="text-lg text-gray-400">/year</span>
              </div>
              <div className="text-sm text-[#00B4D8] mb-6">Save 22% compared to monthly</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time odds and lines
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Player projections
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced analytics
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Mobile app access
                </li>
              </ul>
              <button className="w-full py-3 px-6 rounded-lg gradient-button text-black font-semibold hover:shadow-lg hover:shadow-[#00B4D8]/20 transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={setSectionRef(3)}
        id="contact" 
        className="relative z-10 py-20 px-4 scroll-mt-20 opacity-0 translate-y-4 transition-all duration-700 ease-out"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] text-transparent bg-clip-text">
              Contact Us
            </h2>
            <p className="text-gray-400 text-lg">
              Get in touch with our team
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-black/50 backdrop-blur-sm border-gray-800">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input id="name" placeholder="Your name" className="bg-black/30 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" className="bg-black/30 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <textarea
                      id="message"
                      placeholder="Your message"
                      className="w-full h-32 bg-black/30 border border-gray-700 rounded-md p-3 text-white placeholder-gray-400"
                    />
                  </div>
                  <Button className="gradient-button w-full text-black">
                    <span>Send Message</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] text-transparent bg-clip-text">
            Ready to Start Winning?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of successful bettors who trust our analytics for their picks
          </p>
          <Link href="/projections">
            <Button className="gradient-button text-black px-8 py-6 text-lg hover:shadow-lg transition duration-300">
              <span>Get Started Now</span>
            </Button>
          </Link>
        </div>
      </section>

      <style jsx global>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .gradient-button {
          position: relative;
          overflow: hidden;
          background: linear-gradient(90deg, #90E0EF 0%, #00B4D8 33%, #FF00FF 66%, #90E0EF 100%);
          background-size: 400% 100%;
          transition: all 0.3s ease;
          z-index: 1;
          border-radius: 9999px;
          animation: none;
        }

        .gradient-button span {
          position: relative;
          z-index: 2;
        }

        .gradient-button:hover {
          animation: gradientShift 2.5s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Add subtle floating animation to gradient orbs */
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        .fixed > div {
          animation: float 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}