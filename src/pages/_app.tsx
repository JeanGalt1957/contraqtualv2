import '../../styles/PagesStyles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ScreenerLayoutWrapper from '../../components/GlobalComponents/screenerLayoutWrapper'
import Bets from "./bets"
import welcome from "../pages/index"
import { AppProps } from 'next/dist/shared/lib/router/router'

const MyApp = ({ Component, pageProps }: AppProps) => {
	if (Component == welcome) {
		return (
			<Component {...pageProps} />
		)
	}

	else if (Component == Bets) {
		return (
			<ScreenerLayoutWrapper>
				<Component {...pageProps} />
			</ScreenerLayoutWrapper>
		)
	}	
	
	return <>The page doesnt exist</>
}

export default MyApp
