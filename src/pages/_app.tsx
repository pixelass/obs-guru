import { cache } from "@/ions/configs/emotion";
import { PeerProvider } from "@/ions/contexts/peer";
import { fontFaces, globalStyles } from "@/ions/styles";
import { theme } from "@/ions/theme";
import {
	CacheProvider as EmotionCacheProvider,
	ThemeProvider as EmotionThemeProvider,
} from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import React from "react";

function App({ Component, pageProps }) {
	return (
		<>
			{fontFaces}
			{globalStyles}
			<Head>
				<title key="title">OBS Guru</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="msapplication-TileColor" content={theme.palette.primary.main} />
				<meta name="theme-color" content={theme.palette.primary.main} />
			</Head>
			<EmotionCacheProvider value={cache}>
				<EmotionThemeProvider theme={theme}>
					<CssBaseline />
					<PeerProvider>
						<Component {...pageProps} />
					</PeerProvider>
				</EmotionThemeProvider>
			</EmotionCacheProvider>
		</>
	);
}

export default appWithTranslation(App);
