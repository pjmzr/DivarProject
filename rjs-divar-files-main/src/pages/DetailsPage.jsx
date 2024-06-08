import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "components/modules/Loader";
import { getPostDetails } from "services/user";
import { e2p, sp } from "utils/numbers";

function DetailsPage() {
  const { id } = useParams();
  const { data, isPending, isFetching } = useQuery({
    queryKey: ["post-details"],
    queryFn: () => getPostDetails(id),
    gcTime: 0,
  });
  console.log({ data, isPending, isFetching });

  if (isPending) return <Loader />;
  const { amount, category, images, options, userMobile } = data.data.post;

  return (
    <div>
      <img
        src={`${import.meta.env.VITE_BASE_URL}${images[0]}`}
        alt={options.title}
      />
      <h1>{options.title}</h1>
      <p>شهر {options.city}</p>
      <p>{options.content}</p>
      <p>دسته‌بندی: {category}</p>
      <p>{sp(amount)} تومان</p>
      <p> شماره تماس: {e2p(userMobile)}</p>
    </div>
  );
}

export default DetailsPage;
