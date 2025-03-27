'use client'

import { useUser } from '@/context/UserContext'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { DataTable } from '@/components/DataTable'
import Sidebar from '@/components/Sidebar'

function DashboardPage() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user === null) {
      router.push('/auth/login')
    }
  }, [user])

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <LoaderCircle className='animate-spin w-10 h-10' />
      </div>
    )
  }

  return (
    <div className='md:flex'>
      <Sidebar />

      <div className='flex flex-col w-full'>
        <Navbar />
        <main className='p-6 flex justify-center items-center h-[82vh]'>
          <DataTable />
        </main>
      </div>
    </div>
  )
}

export default DashboardPage