'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertTriangle, LogOutIcon, PanelRightClose, Trash2Icon } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import toast, { Toaster } from 'react-hot-toast'

function Navbar() {
  const [deletingAccount, setDeletingAccount] = useState(false)
  const { logout, user, deleteAccount, setSidebarOpen } = useUser()
  const router = useRouter()

  const handleLogout = () => {
    try {
      const data = logout()
      if (data.success) {
        router.push('/auth/login')
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.log("Logout failed:", error);
    }
  }

  const handleDeleteAccount = () => {
    setDeletingAccount(true)
    try {
      const data = deleteAccount(user.email)
      if (data.success) {
        toast.success(data.message)
        router.push('/')
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.log('Error in account deletion:', error);
    } finally {
      setDeletingAccount(false)
    }
  }

  return (
    <header className="sticky bg-background top-0 z-10 w-full md:px-4">
      <div className="flex px-3 py-4 items-center">
        <Button variant='ghost' size='icon' className='mr-2 md:hidden' onClick={() => setSidebarOpen(true)}><PanelRightClose /></Button>
        <div className="flex items-center md:hidden">
          <Link href="/dashboard">
            <span className="font-bold text-xl">DashBase</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar>
                    <AvatarFallback className='text-base'>{user?.name[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-red-500' onClick={() => setDeletingAccount(true)}>
                  <Trash2Icon className="mr-2 h-4 w-4" />
                  <span>Delete Account</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

        </div>
      </div>
      <AlertDialog open={deletingAccount} onOpenChange={setDeletingAccount}>
        <AlertDialogContent className="sm:max-w-md animate-in fade-in-90 zoom-in-90 duration-200">
          <AlertDialogHeader>
            <AlertDialogTitle className='font-semibold flex items-center text-red-600 dark:text-red-500'>
              <AlertTriangle className="h-5 w-5 mr-2" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={handleDeleteAccount}>Delete</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </header >
  )
}

export default Navbar