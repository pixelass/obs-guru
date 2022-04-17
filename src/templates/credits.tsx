import { Column, Grid } from "@contour/react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import budda from "../../public/icons/icon-512x512.png";

export default function Template() {
	return (
		<Grid
			strategy="grid"
			colCount={{ xs: 1, s: 1, m: 2, l: 2, xl: 2 }}
			sx={{ alignItems: "center", minHeight: "100vh" }}
		>
			<Column flex sx={{ alignItems: "center", justifyContent: "center" }}>
				<Stack gap={3}>
					<Typography
						href="https://www.vecteezy.com/free-vector/buddha"
						rel="noreferrer"
						target="blank"
						color="inherit"
						component="a"
						sx={{ textDecoration: "none", textAlign: "center" }}
					>
						Buddha Vectors by Vecteezy
					</Typography>
					<Box
						sx={{
							position: "relative",
							maxWidth: 300,
						}}
					>
						<Image src={budda} layout="intrinsic" />
					</Box>
				</Stack>
			</Column>
		</Grid>
	);
}
