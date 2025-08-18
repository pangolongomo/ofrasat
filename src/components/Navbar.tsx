'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link href="/">OFRASAT</Link>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/consulting" className="hover:text-primary-foreground/80 transition-colors">Consulting</Link>
            <Link href="/finance" className="hover:text-primary-foreground/80 transition-colors">Finance</Link>
            <Link href="/communication" className="hover:text-primary-foreground/80 transition-colors">Communication</Link>
            {session ? (
              <div className="flex items-center space-x-2">
                <Link href="/dashboard" className="flex items-center space-x-2 hover:text-primary-foreground/80 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {session.user.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{session.user.name}</span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-primary-foreground hover:text-primary-foreground/80"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button asChild variant="secondary" size="sm">
                <Link href="/auth/signin">Connexion</Link>
              </Button>
            )}
          </div>
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-primary-foreground/20">
            <div className="flex flex-col space-y-4 pt-4">
              <Link href="/consulting" className="hover:text-primary-foreground/80 transition-colors">Consulting</Link>
              <Link href="/finance" className="hover:text-primary-foreground/80 transition-colors">Finance</Link>
              <Link href="/communication" className="hover:text-primary-foreground/80 transition-colors">Communication</Link>
              {session ? (
                <div className="flex flex-col space-y-2">
                  <Link href="/dashboard" className="flex items-center space-x-2 hover:text-primary-foreground/80 transition-colors">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                        {session.user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{session.user.name}</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-primary-foreground hover:text-primary-foreground/80 w-fit"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </Button>
                </div>
              ) : (
                <Button asChild variant="secondary" size="sm" className="w-fit">
                  <Link href="/auth/signin">Connexion</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}