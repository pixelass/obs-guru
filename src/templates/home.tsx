import { Column, Grid } from "@contour/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
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
			sx={{
				alignItems: "center",
				minHeight: "100vh",
				color: "#000000",
			}}
		>
			<Column>
				<Typography variant="h3" component="h1" sx={{ textAlign: "center" }}>
					<>{t("common:headline")}</>
				</Typography>
			</Column>
			<Column flex colSpan={{ xs: 1 }} sx={{ justifyContent: "center" }}>
				<Stack gap={2} alignItems="center">
					<Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
						<>{t("common:introText0")}</>
					</Typography>
					<Link passHref href="/room">
						<Button variant="contained" size="large">
							<>{t("common:streamNow")}</>
						</Button>
					</Link>
					<Typography sx={{ textAlign: "center" }}>
						<>{t("common:introText1")}</>
					</Typography>
					<Typography sx={{ textAlign: "center" }}>
						<>{t("common:introText2")}</>
					</Typography>
				</Stack>
			</Column>

			<Column
				flex
				colSpan={{ xs: 1 }}
				sx={{
					justifyContent: "center",
					backgroundImage: "url(/assets/obs.svg)",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "50% 10%",
					backgroundSize: "70%",
				}}
			>
				<ObsLottie />
			</Column>
			<Column>
				<IconButton
					href="https://github.com/pixelass/obs-guru"
					rel="noreferrer"
					target="_blank"
					aria-label="GitHub"
					component="a"
					color="inherit"
				>
					<GitHubIcon />
				</IconButton>
			</Column>
		</Grid>
	);
}
