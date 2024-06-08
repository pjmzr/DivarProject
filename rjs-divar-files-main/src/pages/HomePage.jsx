import React from "react";
import { useQuery } from "@tanstack/react-query";

import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import Loader from "components/modules/Loader";
import { getAllPosts } from "services/user";
import { getCategory } from "services/admin";

function HomePage() {
  const { data: categories, isPending: categoryPending } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });
  const { data: posts, isPending: postPending } = useQuery({
    queryKey: ["post-list"],
    queryFn: getAllPosts,
  });
  return (
    <>
      {categoryPending || postPending ? (
        <Loader />
      ) : (
        <div style={{ display: "flex" }}>
          <Sidebar categories={categories} />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
}

export default HomePage;
