import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM

    // For now, we'll simulate the API call to the external endpoint
    try {
      const response = await fetch("https://api.paradaim.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (!response.ok) {
        throw new Error("External API failed")
      }

      const result = await response.json()
      return NextResponse.json({ success: true, data: result })
    } catch (externalError) {
      // Fallback: Log the contact form submission locally
      console.log("Contact form submission:", { name, email, message, timestamp: new Date().toISOString() })

      return NextResponse.json({
        success: true,
        message: "Thank you for your message. We'll get back to you soon!",
      })
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
