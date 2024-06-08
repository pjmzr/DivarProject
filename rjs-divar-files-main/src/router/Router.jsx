import { Navigate, Route, Routes } from "react-router-dom";

import PageNotFound from "pages/404";
import AdminPage from "pages/AdminPage";
import AuthPage from "pages/AuthPage";
import DashboardPage from "pages/DashboardPage";
import HomePage from "pages/HomePage";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "services/user";
import Loader from "components/modules/Loader";
import DetailsPage from "src/pages/DetailsPage";

function Router() {
  const { data, isPending, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  // console.log({ data, isPending, error });

  if (isPending) return <Loader />;

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/admin"
        element={
          data && data.data.role === "USER" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/v/:id" element={<DetailsPage/>}/>
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
