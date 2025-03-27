import { useUser } from '@/context/UserContext'
import { LayoutDashboard, PanelRightOpen } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

function Sidebar() {
    const { sidebarOpen, setSidebarOpen } = useUser()
    return (
        <>
            <aside className={`bg-muted text-muted-foreground w-64 fixed h-screen top-0 left-0 transform transition-transform z-50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:block`}>
                <div className='p-4 flex justify-between items-center '>
                    <div className="flex items-center">
                        <Link href="/dashboard" className="mr-10 flex items-center">
                            <div className="p-1.5 rounded-lg bg-white mr-2">
                                <LayoutDashboard className="text-black" />
                            </div>
                            <span className="font-bold text-xl text-white">DashBase</span>
                        </Link>
                    </div>
                    <Button variant='ghost' size='icon' className='text-white md:hidden' onClick={() => setSidebarOpen(false)}><PanelRightOpen /></Button>
                </div>
                <ul className='p-4 space-y-4'>
                    <li className='cursor-pointer bg-background p-1.5 rounded-md'>Details</li>
                </ul>
            </aside>
            {/* Overlay for mobile */}
            {sidebarOpen && (<div className='h-screen w-screen backdrop-blur-sm bg-black/30 z-30 fixed top-0 left-0 md:hidden' />)}
        </>
    )
}

export default Sidebar