import React from "react";
import { LogoutButton } from "./_components/logout-button";

function HomeRoute() {
  return (
    <section className="p-4 flex items-center justify-center h-full">
      <div className="grid gap-2 w-72">
        This will be the home route.
        <LogoutButton />
      </div>
    </section>
  );
}

export default HomeRoute;
