"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, FileText, ChevronRight, Menu, X, ArrowDown, Bookmark, Code, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
  id: string
}

type Project = {
  title: string
  description: string
  tags: string[]
  image: string
  link: string
}

type BlogPost = {
  title: string
  excerpt: string
  date: string
  category: string
  slug: string
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Writing", href: "#writing", id: "writing" },
    { label: "Contact", href: "#contact", id: "contact" },
  ]

  const projects: Project[] = [
    {
      title: "Sourdough Blog",
      description: "A comprehensive guide to sourdough baking with detailed step-by-step instructions.",
      tags: ["Next.js", "MDX", "TailwindCSS"],
      image: "/projects/sourdough.jpg",
      link: "/blog/sourdough-journey"
    },
    {
      title: "FFMPEG Guide",
      description: "Technical tutorial on using FFMPEG for video processing and manipulation.",
      tags: ["Technical Writing", "Tutorial", "CLI"],
      image: "/projects/ffmpeg.jpg",
      link: "/blog/ffmpeg-intro"
    },
    {
      title: "Personal Portfolio",
      description: "Modern, responsive portfolio website built with Next.js and TailwindCSS.",
      tags: ["React", "Next.js", "TailwindCSS"],
      image: "/projects/portfolio.jpg",
      link: "https://github.com/CharlieMacnamara/Charlie-Webpage"
    }
  ]

  const blogPosts: BlogPost[] = [
    {
      title: "Sourdough Journey",
      excerpt: "My personal journey into artisan sourdough baking with tips for beginners.",
      date: "February 28, 2024",
      category: "Baking",
      slug: "/blog/sourdough-journey"
    },
    {
      title: "FFMPEG Introduction",
      excerpt: "A comprehensive guide to using FFMPEG for video manipulation.",
      date: "October 23, 2023",
      category: "Technology",
      slug: "/blog/ffmpeg-intro"
    },
    {
      title: "Bottoms Movie Review",
      excerpt: "A refreshing take on coming-of-age comedy that subverts expectations.",
      date: "September 24, 2023",
      category: "Film",
      slug: "/blog/bottoms-movie-review"
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })

      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xl font-bold"
            aria-label="Charlie's Portfolio"
            tabIndex={0}
          >
            <span className="text-primary">Charlie</span>
            <span className="hidden sm:inline-block">Macnamara</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollToSection(item.id)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  activeSection === item.id ? "text-primary" : "text-muted-foreground"
                )}
                aria-current={activeSection === item.id ? "page" : undefined}
                tabIndex={0}
              >
                {item.label}
              </button>
            ))}
            <Button 
              asChild 
              size="sm" 
              className="ml-2"
            >
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault()
                  handleScrollToSection("contact")
                }}
                tabIndex={0}
                aria-label="Contact me"
              >
                Contact
              </a>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Open menu"
                tabIndex={0}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleScrollToSection(item.id)}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary px-2 py-1 rounded-md",
                      activeSection === item.id ? "bg-muted text-primary" : "text-muted-foreground"
                    )}
                    aria-current={activeSection === item.id ? "page" : undefined}
                    tabIndex={0}
                  >
                    {item.label}
                  </button>
                ))}
                <Button 
                  className="mt-2"
                  size="sm"
                  onClick={() => handleScrollToSection("contact")}
                  tabIndex={0}
                  aria-label="Contact me"
                >
                  Contact Me
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section 
          id="home" 
          className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Technical Writer & Web Enthusiast
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Hi, I'm <span className="text-primary">Charlie</span>
                  </h1>
                  <p className="mt-4 max-w-[600px] text-muted-foreground md:text-xl">
                    I create clear, engaging documentation and build modern web experiences.
                    When I'm not writing code or docs, I'm experimenting with sourdough.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button 
                      asChild 
                      size="lg" 
                      className="group"
                      tabIndex={0}
                      aria-label="View my work"
                    >
                      <a 
                        href="#projects" 
                        onClick={(e) => {
                          e.preventDefault()
                          handleScrollToSection("projects")
                        }}
                      >
                        View My Work
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                    <Button 
                      asChild 
                      variant="outline" 
                      size="lg"
                      tabIndex={0}
                      aria-label="Download my resume"
                    >
                      <a 
                        href="/public/writer-resume-cmacnamara.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Download Resume
                        <FileText className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] lg:h-[400px] lg:w-[400px] rounded-full overflow-hidden border-4 border-primary/20"
                >
                  <Image
                    src="/profile.jpg"
                    alt="Charlie Macnamara"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-2">Scroll to learn more</p>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowDown className="h-5 w-5 text-primary" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section 
          id="about" 
          className="py-16 md:py-24 bg-muted/50"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[800px] space-y-6 text-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
                <p className="mt-2 text-muted-foreground">Get to know my background and expertise</p>
              </div>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center space-y-4 rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="rounded-full bg-primary/10 p-4">
                  <PenTool className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Technical Writing</h3>
                <p className="text-center text-muted-foreground">
                  Creating clear, concise, and engaging documentation that helps users understand complex topics.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center space-y-4 rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="rounded-full bg-primary/10 p-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Web Development</h3>
                <p className="text-center text-muted-foreground">
                  Building modern, responsive web applications using React, Next.js, and TailwindCSS.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col items-center space-y-4 rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="rounded-full bg-primary/10 p-4">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Content Creation</h3>
                <p className="text-center text-muted-foreground">
                  Sharing knowledge through tutorials, blog posts, and educational content.
                </p>
              </motion.div>
            </div>
            <div className="mt-12 mx-auto max-w-[800px]">
              <p className="text-muted-foreground">
                I'm a passionate technical writer and web developer with a background in creating
                clear, engaging documentation and modern web experiences. My expertise spans across
                technical writing, web development, and content creation.
              </p>
              <p className="mt-4 text-muted-foreground">
                When I'm not working on documentation or code, you'll find me experimenting with
                sourdough baking, exploring new technologies, or writing about film and culture.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          id="projects" 
          className="py-16 md:py-24"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[800px] space-y-6 text-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h2>
                <p className="mt-2 text-muted-foreground">A selection of my recent work</p>
              </div>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <motion.div 
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
                >
                  <Link 
                    href={project.link} 
                    className="absolute inset-0 z-10"
                    aria-label={`View ${project.title} project`}
                    tabIndex={0}
                  >
                    <span className="sr-only">View {project.title}</span>
                  </Link>
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10" />
                    <div className="h-full w-full bg-muted" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Writing Section */}
        <section 
          id="writing" 
          className="py-16 md:py-24 bg-muted/50"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[800px] space-y-6 text-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Writing</h2>
                <p className="mt-2 text-muted-foreground">Thoughts, tutorials, and insights</p>
              </div>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post, index) => (
                <motion.article 
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
                >
                  <Link 
                    href={post.slug} 
                    className="absolute inset-0 z-10"
                    aria-label={`Read ${post.title} article`}
                    tabIndex={0}
                  >
                    <span className="sr-only">Read {post.title}</span>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <time dateTime={post.date}>{post.date}</time>
                      <span>•</span>
                      <span>{post.category}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-primary">
                      Read More
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button 
                asChild 
                variant="outline"
                tabIndex={0}
                aria-label="View all posts"
              >
                <Link href="/blog">
                  View All Posts
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          className="py-16 md:py-24"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[800px] space-y-6 text-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Me</h2>
                <p className="mt-2 text-muted-foreground">Let's discuss your project or opportunity</p>
              </div>
            </div>
            <div className="mt-12 mx-auto max-w-[600px]">
              <div className="grid gap-8 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col space-y-2"
                >
                  <h3 className="text-xl font-semibold">Connect With Me</h3>
                  <p className="text-muted-foreground">
                    Feel free to reach out through any of the platforms below.
                  </p>
                  <div className="mt-4 flex flex-col space-y-4">
                    <a 
                      href="mailto:hello@charlie.com" 
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      tabIndex={0}
                      aria-label="Email me"
                    >
                      <Mail className="h-5 w-5" />
                      <span>hello@charlie.com</span>
                    </a>
                    <a 
                      href="https://github.com/CharlieMacnamara" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      tabIndex={0}
                      aria-label="Visit my GitHub profile"
                    >
                      <Github className="h-5 w-5" />
                      <span>GitHub</span>
                    </a>
                    <a 
                      href="https://linkedin.com/in/charliemacnamara" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      tabIndex={0}
                      aria-label="Visit my LinkedIn profile"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col space-y-2"
                >
                  <h3 className="text-xl font-semibold">Work Inquiries</h3>
                  <p className="text-muted-foreground">
                    Currently available for freelance projects, technical writing, and consulting opportunities.
                  </p>
                  <div className="mt-6">
                    <Button 
                      asChild 
                      className="w-full"
                      tabIndex={0}
                      aria-label="Download my resume"
                    >
                      <a 
                        href="/public/writer-resume-cmacnamara.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Download Resume
                        <FileText className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/20">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Charlie Macnamara. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/CharlieMacnamara" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors"
              tabIndex={0}
              aria-label="Visit my GitHub profile"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com/in/charliemacnamara" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors"
              tabIndex={0}
              aria-label="Visit my LinkedIn profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

