import useMediaQuery from 'hooks/useMediaQuery'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const Footer: FC = () => {
  const { isMobile } = useMediaQuery(1038)
  return (
    <footer className="footer">
      {
        isMobile ? (
          <div className="container-xxl justify-content-between align-items-center p-4">
            <img src="/location_sign_white.png" alt="Location white" width={22} />
            <p style={{float:'right'}}>All rights received | skillupmentor.com</p>
          </div>
        ):(
        <div className="container-xxl justify-content-between align-items-center p-4">
          <img src="/geotagger_logo_white.png" alt="Geotagger white" width={100} />
          <p style={{float:'right'}}>All rights received | skillupmentor.com</p>
        </div>
        )
      }
    </footer>
  )
}

export default Footer
