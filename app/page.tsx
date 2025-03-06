"use client"

// pages/index.js
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useEffect, useRef } from "react"

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
      {/* Decorative gradient elements */}
      <div className="absolute left-0 bottom-0 w-[300px] h-[300px] opacity-70">
        <div className="w-full h-full bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div className="absolute right-0 top-1/2 w-[400px] h-[400px] opacity-70">
        <div className="w-full h-full bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] rounded-full blur-3xl transform translate-x-1/3"></div>
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-black/50 backdrop-blur-sm">
        <Link href="/">
          <div className="text-3xl font-bold bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] text-transparent bg-clip-text">
            PropFinds
          </div>
        </Link>
        
        <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
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

        <div className="flex items-center space-x-4">
          <Link
            href="/projections"
            className="gradient-button px-8 py-4 rounded-full text-black font-medium text-lg hover:shadow-lg transition duration-300"
          >
            <span>Find Picks Now</span>
          </Link>
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

      {/* Sports Section */}
      <section 
        ref={setSectionRef(0)}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* NBA Card */}
            <Card className="bg-black/50 backdrop-blur-sm border-gray-800 hover:border-[#00B4D8] transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] flex items-center justify-center">
                    <span className="text-2xl">🏀</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">NBA</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Player props, game lines, and advanced statistics for every NBA matchup
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Player Props</span>
                  <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Game Lines</span>
                  <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Advanced Stats</span>
                </div>
              </CardContent>
            </Card>

            {/* NFL Card */}
            <Card className="bg-black/50 backdrop-blur-sm border-gray-800 hover:border-[#00B4D8] transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] flex items-center justify-center">
                    <span className="text-2xl">🏈</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">NFL</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Player props, game lines, and advanced statistics for every NFL matchup
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Player Props</span>
                  <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Game Lines</span>
                  <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Advanced Stats</span>
                </div>
              </CardContent>
            </Card>

            {/* MLB Card */}
            <Card className="bg-black/50 backdrop-blur-sm border-gray-800 hover:border-[#00B4D8] transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] flex items-center justify-center">
                    <span className="text-2xl">⚾</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">MLB</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Player props, game lines, and advanced statistics for every MLB matchup
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Player Props</span>
                  <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Game Lines</span>
                  <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Advanced Stats</span>
                </div>
              </CardContent>
            </Card>

            {/* Esports Card */}
            <Card className="bg-black/50 backdrop-blur-sm border-gray-800 hover:border-[#00B4D8] transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] flex items-center justify-center">
                    <span className="text-2xl">🎮</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Esports</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Comprehensive coverage of major esports tournaments and leagues
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">COD</span>
                  <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Dota 2</span>
                  <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">LoL</span>
                  <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Valorant</span>
                  <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">CS2</span>
                  <span className="px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#90E0EF] text-sm">Rocket League</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={setSectionRef(1)}
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

      {/* Pricing Section */}
      <section 
        ref={setSectionRef(2)}
        id="pricing" 
        className="relative z-10 py-20 px-4 scroll-mt-20 opacity-0 translate-y-4 transition-all duration-700 ease-out"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] text-transparent bg-clip-text">
              Pricing
            </h2>
            <p className="text-gray-400 text-lg">
              Choose the plan that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-black/50 backdrop-blur-sm border-gray-800 hover:border-[#00B4D8] transition-colors duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Basic</h3>
                <p className="text-3xl font-bold text-white mb-4">$29<span className="text-gray-400 text-lg">/month</span></p>
                <ul className="text-gray-400 space-y-2 mb-6">
                  <li>• Basic player projections</li>
                  <li>• Daily picks</li>
                  <li>• Basic analytics</li>
                </ul>
                <Button className="gradient-button w-full text-black">
                  <span>Get Started</span>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/50 backdrop-blur-sm border-gray-800 hover:border-[#00B4D8] transition-colors duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
                <p className="text-3xl font-bold text-white mb-4">$49<span className="text-gray-400 text-lg">/month</span></p>
                <ul className="text-gray-400 space-y-2 mb-6">
                  <li>• Advanced projections</li>
                  <li>• Real-time updates</li>
                  <li>• Lineup optimizer</li>
                </ul>
                <Button className="gradient-button w-full text-black">
                  <span>Get Started</span>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/50 backdrop-blur-sm border-gray-800 hover:border-[#00B4D8] transition-colors duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
                <p className="text-3xl font-bold text-white mb-4">$99<span className="text-gray-400 text-lg">/month</span></p>
                <ul className="text-gray-400 space-y-2 mb-6">
                  <li>• All features</li>
                  <li>• API access</li>
                  <li>• Priority support</li>
                </ul>
                <Button className="gradient-button w-full text-black">
                  <span>Get Started</span>
                </Button>
              </CardContent>
            </Card>
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
          background: linear-gradient(45deg, #90E0EF, #00B4D8, #FF00FF);
          background-size: 200% 200%;
          transition: all 0.3s ease;
          z-index: 1;
        }

        .gradient-button span {
          position: relative;
          z-index: 2;
        }

        .gradient-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #90E0EF, #00B4D8, #FF00FF);
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .gradient-button:hover::before {
          opacity: 1;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
}