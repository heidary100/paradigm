import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-8">
          <FileX className="h-24 w-24 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The article you're looking for doesn't exist or has been moved. It might have been removed, renamed, or you
          might have mistyped the URL.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/articles">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
