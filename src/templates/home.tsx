import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

export default function Template() {
	const { t } = useTranslation(["common"]);
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<MeetingRoomIcon sx={{ mr: 2 }} />
					<Typography component="h1">OBS Guru</Typography>
				</Toolbar>
			</AppBar>
			<Card sx={{ width: 300, m: 2 }}>
				<CardContent>
					<Typography>Create Streams for OBS</Typography>
				</CardContent>
				<CardActions>
					<Link passHref href="/room">
						<IconButton aria-label={t("common:openRoom")}>
							<MeetingRoomIcon />
						</IconButton>
					</Link>
				</CardActions>
			</Card>
		</>
	);
}
