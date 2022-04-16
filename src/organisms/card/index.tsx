import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

export default function Card({ children }) {
	return (
		<MuiCard>
			<CardContent>
				<Typography>{children}</Typography>
			</CardContent>
		</MuiCard>
	);
}
