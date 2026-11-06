"use client";

import { useEffect } from "react";
import { Button } from "@nextui-org/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="rounded-portal border border-border bg-card p-8 text-center shadow-sm">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        Something went wrong
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        {error.message || "An unexpected error occurred."}
      </p>
      <Button
        className="mt-6 font-semibold"
        color="primary"
        radius="lg"
        onPress={() => reset()}
      >
        Try again
      </Button>
    </div>
  );
}
