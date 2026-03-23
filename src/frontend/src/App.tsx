import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import AdvocatePage from "./pages/AdvocatePage";
import HomePage from "./pages/HomePage";
import IssuePage from "./pages/IssuePage";
import QuizPage from "./pages/QuizPage";
import ResourcesPage from "./pages/ResourcesPage";
import SurveyPage from "./pages/SurveyPage";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const issueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/issue",
  component: IssuePage,
});
const surveyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/survey",
  component: SurveyPage,
});
const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: QuizPage,
});
const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resources",
  component: ResourcesPage,
});
const advocateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/advocate",
  component: AdvocatePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  issueRoute,
  surveyRoute,
  quizRoute,
  resourcesRoute,
  advocateRoute,
]);

const hashHistory = createHashHistory();
const router = createRouter({ routeTree, history: hashHistory });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
