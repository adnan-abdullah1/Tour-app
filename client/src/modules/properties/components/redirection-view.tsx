
"use client";

import { Button } from "@/components/ui/button";

export default function ClientRedirectButton({ redirectionUrl }: { redirectionUrl?: string }) {
  const handleClick = () => {
    if (redirectionUrl) {
      window.open(redirectionUrl, "_blank");
    }
  };

  return (
    <Button variant="tour_button_primary" onClick={handleClick}>
      Check availability
    </Button>
  );
}
