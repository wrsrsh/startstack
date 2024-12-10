'use client'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import React from 'react'

export function RandomToast() {
  return (
    <Button onClick={() => toast.info("Hello")} >abc</Button>
  )
}
