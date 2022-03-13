import { useEffect } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    kakao: any
  }
}
const KakaoMap = () => {
  const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY

  useEffect(() => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map')
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      }
      new window.kakao.maps.Map(mapContainer, mapOption)
    })
  }, [])
  return (
    <>
      <div id="map" className="h-full w-full"></div>
    </>
  )
}

export { KakaoMap }
