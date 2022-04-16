import styled from "@mui/material/styles/styled";

export const StyledVideo = styled("video")({
	width: "100%",
	height: "100%",
	objectFit: "contain",
});

export const StyledAbsoluteVideo = styled(StyledVideo)({
	position: "absolute",
	inset: 0,
});

export const StyledVideoWrapper = styled("figure")({
	position: "relative",
	width: "100%",
	margin: 0,
	paddingBottom: `${(100 / 16) * 9}%`,
	background: "rebeccapurple",
});
