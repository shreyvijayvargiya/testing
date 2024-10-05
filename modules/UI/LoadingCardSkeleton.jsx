import { Skeleton } from "@mantine/core";

const LoadingSkeletonCard = () => {
	return (
		<>
			<Skeleton height={50} circle mb="sm" />
			<hr className="bg-gray-200 my-2" />
			<Skeleton height={8} radius="xl" />
			<Skeleton height={8} mt={6} radius="xl" />
			<Skeleton height={8} mt={6} width="90%" radius="xl" />
			<Skeleton height={8} mt={6} width="80%" radius="xl" />
		</>
	);
};
export default LoadingSkeletonCard;
