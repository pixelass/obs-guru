import { nanoid } from "nanoid";
import type { GetServerSideProps } from "next";
import React from "react";

export default function Page() {
	return null;
}

export const getServerSideProps: GetServerSideProps = async () => ({
	redirect: {
		permanent: false,
		destination: `/room/${nanoid()}`,
	},
});
