import React from "react"
import ContentLoader from 'react-content-loader'
import { useMediaQuery } from "react-responsive"

const BetLoader = (): React.ReactElement => {
    const isMobile = useMediaQuery({ maxWidth: 1200})

    return (
        <ContentLoader height={150} width={2000} speed={0.8} style={{
            marginTop: '20px',
            maxWidth: isMobile ? '100%' : '550px'
            }}
        >
            <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
        </ContentLoader>
    )
}

export default BetLoader
