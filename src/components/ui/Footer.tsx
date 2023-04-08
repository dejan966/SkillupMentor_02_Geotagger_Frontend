import { FC } from 'react'

const Footer: FC = () => {
  return (
    //isMobile img src location_sign_white.png
    <footer className="footer">
      <div className="container-xxl d-flex justify-content-between align-items-center p-4">
        <img src="/geotagger_logo_white.png" alt="Geotagger white" width={100} />
        <p className="fs-6">All rights received | skillupmentor.com</p>
      </div>
    </footer>
  )
}

export default Footer
