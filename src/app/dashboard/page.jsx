'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserContext'
import { AlertTriangle, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import toast, { Toaster } from 'react-hot-toast'

function DashboardPage() {
  const { logout, user, loading, deleteAccount } = useUser()
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
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <LoaderCircle className='animate-spin w-10 h-10' />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-5 justify-center items-center min-h-screen'>
      <p>Dashboard Page</p>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <Button onClick={handleLogout}>Logout</Button>

      <AlertDialog >
        <AlertDialogTrigger asChild>
          <Button variant='destructive'>Delete Account</Button>
        </AlertDialogTrigger>
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
    </div>
  )
}

export default DashboardPage