import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignupConfirmationPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Check Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent you a confirmation email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-slate-400 text-center">
              Please check your email inbox and click the confirmation link to complete your registration.
            </p>
            <p className="text-slate-400 text-center text-sm">
              If you don't see the email, please check your spam folder.
            </p>
            <div className="flex justify-center mt-6">
              <Link href="/login">
                <Button variant="outline">Return to Login</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 