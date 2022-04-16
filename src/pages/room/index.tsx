import { nanoid } from "nanoid";
import type { GetServerSideProps } from "next";

export default function Page() {
	return null;
}

export const getServerSideProps: GetServerSideProps = async () => ({
	redirect: {
		permanent: false,
		destination: `/room/${nanoid()}`,
	},
});
