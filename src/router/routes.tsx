import { lazy, type ComponentType } from "react"
import type { RouteObject } from "react-router-dom"
import { routes } from "shared/utils/routes"
import { PrivateRoute, EmployeeRoute } from "shared/ui"
import { AppErrorPage } from "pages/AppErrorPage"
import { RootLayout } from "./RootLayout"

const lazyPage = <M extends Record<K, ComponentType>, K extends keyof M>(load: () => Promise<M>, name: K) =>
  lazy(async () => ({ default: (await load())[name] }))

const MainPage = lazyPage(() => import("pages/MainPage"), "MainPage")
const AssistantPage = lazyPage(() => import("pages/AssistantPage"), "AssistantPage")
const TicketsPage = lazyPage(() => import("pages/TicketsPage"), "TicketsPage")
const NotificationsPage = lazyPage(() => import("pages/NotificationsPage"), "NotificationsPage")
const ProfilePage = lazyPage(() => import("pages/ProfilePage"), "ProfilePage")
const SettingsPage = lazyPage(() => import("pages/SettingsPage"), "SettingsPage")
const NotFoundPage = lazyPage(() => import("pages/NotFoundPage"), "NotFoundPage")
const LoginPage = lazyPage(() => import("pages/LoginPage"), "LoginPage")
const RegisterPage = lazyPage(() => import("pages/RegisterPage"), "RegisterPage")
const AnalyticsPage = lazyPage(() => import("pages/AnalyticsPage"), "AnalyticsPage")
const CreateTicketPage = lazyPage(() => import("pages/CreateTicketPage"), "CreateTicketPage")
const FeedbackPage = lazyPage(() => import("pages/FeedbackPage"), "FeedbackPage")
const TicketStatusPage = lazyPage(() => import("pages/TicketStatusPage"), "TicketStatusPage")
const MyReviewsPage = lazyPage(() => import("pages/MyReviewsPage"), "MyReviewsPage")
const GuestTicketTrackPage = lazyPage(() => import("pages/GuestTicketTrackPage"), "GuestTicketTrackPage")

export const appRoutes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <AppErrorPage />,
    children: [
      { path: routes.login, element: <LoginPage /> },
      { path: routes.register, element: <RegisterPage /> },
      { path: routes.main, element: <MainPage /> },
      { path: routes.assistant, element: <AssistantPage /> },
      { path: routes.createTicket, element: <CreateTicketPage /> },
      { path: routes.guestTicketTrack, element: <GuestTicketTrackPage /> },

      {
        element: <PrivateRoute />,
        children: [
          { path: routes.tickets, element: <TicketsPage /> },
          { path: routes.notifications, element: <NotificationsPage /> },
          { path: routes.ticketStatus, element: <TicketStatusPage /> },
          { path: routes.feedback, element: <FeedbackPage /> },
          { path: routes.myReviews, element: <MyReviewsPage /> },
          { path: routes.profile, element: <ProfilePage /> },
          { path: routes.settings, element: <SettingsPage /> },

          {
            element: <EmployeeRoute />,
            children: [{ path: routes.analytics, element: <AnalyticsPage /> }],
          },
        ],
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]
