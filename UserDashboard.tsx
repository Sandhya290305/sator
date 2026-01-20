import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { RegistrationForm } from './RegistrationForm';
import { UsersList } from './UsersList';
import { useIsRegistered } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, UserPlus } from 'lucide-react';

export function UserDashboard() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const { data: isRegistered, isLoading: isCheckingRegistration } = useIsRegistered();

  if (isInitializing) {
    return (
      <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Initializing...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Welcome to Sator</CardTitle>
            <CardDescription>Please login to access the user management system</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                Click the "Login" button in the header to authenticate with Internet Identity.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isCheckingRegistration) {
    return (
      <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Checking registration status...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            {isRegistered
              ? 'View all registered users in the system'
              : 'Register to join the community and view all users'}
          </p>
        </div>

        {!isRegistered && (
          <Card>
            <CardHeader>
              <CardTitle>Register Your Account</CardTitle>
              <CardDescription>Complete your registration to access all features</CardDescription>
            </CardHeader>
            <CardContent>
              <RegistrationForm />
            </CardContent>
          </Card>
        )}

        <UsersList />
      </div>
    </div>
  );
}
