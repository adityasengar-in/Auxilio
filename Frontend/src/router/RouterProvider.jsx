import { ChatPage } from '../pages/ChatPage'

export const RouterProvider = () => {
  const routes = [
    {
      path: '/',
      label: 'Chat',
      element: <ChatPage />,
    },
  ]

  const activeRoute = routes[0]

  return activeRoute.element
}
