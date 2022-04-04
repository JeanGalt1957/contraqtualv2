import '../../styles/PagesStyles/globals.css'
import React from 'react'
import ScreenerLayoutWrapper from '../../components/GlobalComponents/screenerLayoutWrapper'
import Polls from "./polls"
import ActivePolls from "./activepolls"
import About from "./about";
import welcome from "../pages/index"
import { getComponentName } from '../../library/utils'
import { AppProps } from 'next/dist/shared/lib/router/router'

const MyApp = ({ Component, pageProps }: AppProps) => {
	if (Component == welcome) {
		return (
			<Component {...pageProps} />
		)
	}

	else if (
		Component == Polls ||
		Component == ActivePolls ||
		Component == About
	) {
		return (
			<ScreenerLayoutWrapper title={getComponentName(Component)}>
				<Component {...pageProps} />
			</ScreenerLayoutWrapper>
		)
	}	
	
	return <>The page doesnt exist</>
}

export default MyApp
