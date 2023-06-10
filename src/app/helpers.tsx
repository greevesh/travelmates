import { useRouter } from "next/navigation";

export const redirect = (page: string) => {
  const router = useRouter();
  router.push(page);
};

export const error = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <div>
      <h1>{error.message || "Something went wrong."}</h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};
