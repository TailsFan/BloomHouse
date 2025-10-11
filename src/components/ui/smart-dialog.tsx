"use client"

import * as React from "react"
import { useAndroidWebView } from "@/hooks/use-android-webview"
import { Dialog as RegularDialog, DialogContent as RegularDialogContent, DialogHeader as RegularDialogHeader, DialogFooter as RegularDialogFooter, DialogTitle as RegularDialogTitle, DialogDescription as RegularDialogDescription, DialogOverlay as RegularDialogOverlay, DialogClose as RegularDialogClose, DialogTrigger as RegularDialogTrigger, DialogPortal as RegularDialogPortal } from "@/components/ui/dialog"
import { Dialog as AndroidDialog, DialogContent as AndroidDialogContent, DialogHeader as AndroidDialogHeader, DialogFooter as AndroidDialogFooter, DialogTitle as AndroidDialogTitle, DialogDescription as AndroidDialogDescription, DialogOverlay as AndroidDialogOverlay, DialogClose as AndroidDialogClose, DialogTrigger as AndroidDialogTrigger, DialogPortal as AndroidDialogPortal } from "@/components/ui/android-dialog"

// Умный Dialog компонент, который автоматически выбирает реализацию
export const Dialog = React.forwardRef<
  React.ElementRef<typeof RegularDialog>,
  React.ComponentPropsWithoutRef<typeof RegularDialog>
>(({ children, ...props }, ref) => {
  const isAndroidWebView = useAndroidWebView()
  
  if (isAndroidWebView) {
    return <AndroidDialog ref={ref} {...props}>{children}</AndroidDialog>
  }
  
  return <RegularDialog ref={ref} {...props}>{children}</RegularDialog>
})
Dialog.displayName = "SmartDialog"

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof RegularDialogContent>,
  React.ComponentPropsWithoutRef<typeof RegularDialogContent>
>(({ children, ...props }, ref) => {
  const isAndroidWebView = useAndroidWebView()
  
  if (isAndroidWebView) {
    return <AndroidDialogContent ref={ref} {...props}>{children}</AndroidDialogContent>
  }
  
  return <RegularDialogContent ref={ref} {...props}>{children}</RegularDialogContent>
})
DialogContent.displayName = "SmartDialogContent"

export const DialogHeader = React.forwardRef<
  React.ElementRef<typeof RegularDialogHeader>,
  React.ComponentPropsWithoutRef<typeof RegularDialogHeader>
>(({ children, ...props }, ref) => {
  const isAndroidWebView = useAndroidWebView()
  
  if (isAndroidWebView) {
    return <AndroidDialogHeader ref={ref} {...props}>{children}</AndroidDialogHeader>
  }
  
  return <RegularDialogHeader ref={ref} {...props}>{children}</RegularDialogHeader>
})
DialogHeader.displayName = "SmartDialogHeader"

export const DialogFooter = React.forwardRef<
  React.ElementRef<typeof RegularDialogFooter>,
  React.ComponentPropsWithoutRef<typeof RegularDialogFooter>
>(({ children, ...props }, ref) => {
  const isAndroidWebView = useAndroidWebView()
  
  if (isAndroidWebView) {
    return <AndroidDialogFooter ref={ref} {...props}>{children}</AndroidDialogFooter>
  }
  
  return <RegularDialogFooter ref={ref} {...props}>{children}</RegularDialogFooter>
})
DialogFooter.displayName = "SmartDialogFooter"

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof RegularDialogTitle>,
  React.ComponentPropsWithoutRef<typeof RegularDialogTitle>
>(({ children, ...props }, ref) => {
  const isAndroidWebView = useAndroidWebView()
  
  if (isAndroidWebView) {
    return <AndroidDialogTitle ref={ref} {...props}>{children}</AndroidDialogTitle>
  }
  
  return <RegularDialogTitle ref={ref} {...props}>{children}</RegularDialogTitle>
})
DialogTitle.displayName = "SmartDialogTitle"

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof RegularDialogDescription>,
  React.ComponentPropsWithoutRef<typeof RegularDialogDescription>
>(({ children, ...props }, ref) => {
  const isAndroidWebView = useAndroidWebView()
  
  if (isAndroidWebView) {
    return <AndroidDialogDescription ref={ref} {...props}>{children}</AndroidDialogDescription>
  }
  
  return <RegularDialogDescription ref={ref} {...props}>{children}</RegularDialogDescription>
})
DialogDescription.displayName = "SmartDialogDescription"

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof RegularDialogOverlay>,
  React.ComponentPropsWithoutRef<typeof RegularDialogOverlay>
>(({ children, ...props }, ref) => {
  const isAndroidWebView = useAndroidWebView()
  
  if (isAndroidWebView) {
    return <AndroidDialogOverlay ref={ref} {...props}>{children}</AndroidDialogOverlay>
  }
  
  return <RegularDialogOverlay ref={ref} {...props}>{children}</RegularDialogOverlay>
})
DialogOverlay.displayName = "SmartDialogOverlay"

export const DialogClose = React.forwardRef<
  React.ElementRef<typeof RegularDialogClose>,
  React.ComponentPropsWithoutRef<typeof RegularDialogClose>
>(({ children, ...props }, ref) => {
  const isAndroidWebView = useAndroidWebView()
  
  if (isAndroidWebView) {
    return <AndroidDialogClose ref={ref} {...props}>{children}</AndroidDialogClose>
  }
  
  return <RegularDialogClose ref={ref} {...props}>{children}</RegularDialogClose>
})
DialogClose.displayName = "SmartDialogClose"

export const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof RegularDialogTrigger>,
  React.ComponentPropsWithoutRef<typeof RegularDialogTrigger>
>(({ children, ...props }, ref) => {
  const isAndroidWebView = useAndroidWebView()
  
  if (isAndroidWebView) {
    return <AndroidDialogTrigger ref={ref} {...props}>{children}</AndroidDialogTrigger>
  }
  
  return <RegularDialogTrigger ref={ref} {...props}>{children}</RegularDialogTrigger>
})
DialogTrigger.displayName = "SmartDialogTrigger"

export const DialogPortal = React.forwardRef<
  React.ElementRef<typeof RegularDialogPortal>,
  React.ComponentPropsWithoutRef<typeof RegularDialogPortal>
>(({ children, ...props }, ref) => {
  const isAndroidWebView = useAndroidWebView()
  
  if (isAndroidWebView) {
    return <AndroidDialogPortal ref={ref} {...props}>{children}</AndroidDialogPortal>
  }
  
  return <RegularDialogPortal ref={ref} {...props}>{children}</RegularDialogPortal>
})
DialogPortal.displayName = "SmartDialogPortal"
