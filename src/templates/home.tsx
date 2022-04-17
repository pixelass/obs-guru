import { Column, Grid } from "@contour/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const ObsLottie = dynamic(async () => import("@/atoms/lottie-player"), {
	ssr: false,
});

export default function Template() {
	const { t } = useTranslation(["common"]);
	return (
		<Grid
			strategy="grid"
			colCount={{ xs: 1, s: 1, m: 2, l: 2, xl: 2 }}
			sx={{ alignItems: "center", minHeight: "100vh" }}
		>
			<Column>
				<Typography variant="h3" component="h1" sx={{ textAlign: "center" }}>
					<>{t("common:headline")}</>
				</Typography>
			</Column>
			<Column flex colSpan={{ xs: 1 }} sx={{ justifyContent: "center" }}>
				<Link passHref href="/room">
					<Button variant="contained" size="large">
						<>{t("common:openRoom")}</>
					</Button>
				</Link>
			</Column>

			<Column flex colSpan={{ xs: 1 }} sx={{ justifyContent: "center" }}>
				<ObsLottie />
			</Column>
			<Column flex sx={{ justifyContent: "space-between" }}>
				<Link passHref href="/credits">
					<Typography
						color="inherit"
						component="a"
						sx={{ textDecoration: "none", textAlign: "center" }}
					>
						<>{t("common:credits")}</>
					</Typography>
				</Link>
				<IconButton
					href="https://github.com/pixelass/obs-guru"
					rel="noreferrer"
					target="blank"
					aria-label="GitHub"
					component="a"
				>
					<GitHubIcon />
				</IconButton>
			</Column>
		</Grid>
	);
}
