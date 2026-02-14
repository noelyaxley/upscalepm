"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

// Register plugins once, globally
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

// Configure ScrollTrigger for mobile
ScrollTrigger.config({
  ignoreMobileResize: true,
})

export { gsap, ScrollTrigger, SplitText, useGSAP }
