import useMediaQuery from 'hooks/useMediaQuery'
import { FC, useState } from 'react'

const Footer: FC = () => {
  const { isMobile } = useMediaQuery(1038)
  return (
    <footer className="footer">
      {
        isMobile ? (
          <div className="container-xxl d-flex justify-content-between align-items-center p-4">
            <img src="/location_sign_white.png" alt="Location white" width={22} />
            <p className="fs-6">All rights received | skillupmentor.com</p>
          </div>
        ):(
        <div className="container-xxl d-flex justify-content-between align-items-center p-4">
          <img src="/geotagger_logo_white.png" alt="Geotagger white" width={100} />
          <p className="fs-6">All rights received | skillupmentor.com</p>
        </div>
        )
      }
    </footer>
  )
}

export default Footer
