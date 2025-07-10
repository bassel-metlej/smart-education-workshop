import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router";

import { AppSuspense } from "../components/molecules";

const importTemplate = (page: keyof typeof import("../templates")) =>
  React.lazy(() =>
    import("../templates").then((mod) => {
      const Component = mod[page];
      // Ensure we're getting a React component, not a type or enum
      if (typeof Component === 'function') {
        return { default: Component as React.ComponentType };
      }
      throw new Error(`Template ${String(page)} is not a valid React component`);
    })
  );

const importPage = (page: keyof typeof import("../pages")) =>
  React.lazy(() => import("../pages").then((mod) => ({ default: mod[page] })));

const RootLayout = importTemplate("RootLayout");
const Products = importPage("Products");
const AboutPage = importPage("AboutPage");
const ContactPage = importPage("ContactPage");
const DashboardPage = importPage("DashboardPage");

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={<RootLayout />}
        >
          <Route path="/" element={<Products />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route
          path="*"
          element={<Navigate replace to="/" />}
        />
      </>
    )
  );

  return (
    <div className="w-screen h-screen">
      <AppSuspense>
        <RouterProvider router={router} />
      </AppSuspense>
    </div>
  );
};

export { Routes };
