"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ClusterNotFound = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10 px-4">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Cluster Not Found</CardTitle>
          <CardDescription className="text-center">
            The cluster you're looking for doesn't exist or has been removed.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-6">
          <AlertCircle className="h-16 w-16 text-muted-foreground" />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => router.push("/dashboard")}>
            Return to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClusterNotFound;