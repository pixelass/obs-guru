import Room from "@/templates/room";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

export default function Page() {
	return <Room />;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"])),
	},
});
