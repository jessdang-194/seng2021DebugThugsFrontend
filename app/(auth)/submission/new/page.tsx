import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"
import SubmissionConfirmation from "@/components/submission-confirmation"

export default function NewSubmissionPage() {
  return (
    <div>
      <div className="mb-6">
        <Button
          variant="outline"
          className="border-custom-purple text-custom-purple hover:bg-custom-purple hover:text-white"
          asChild
        >
          <Link href="/main">
            <Home className="mr-2 h-4 w-4" />
            Back to Main
          </Link>
        </Button>
      </div>
      <SubmissionConfirmation />
    </div>
  )
}
