import { useEffect } from 'react'

const KakaoMap = () => {
  useEffect(() => {
    window.kakao.maps.load(() => {
      const placeSearchCB = (data: any, status: any, pagination: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          var bounds = new window.kakao.maps.LatLngBounds()
          for (var i = 0; i < data.length; i++) {
            displayMarker(data[i])
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x))
          }
          map.setBounds(bounds)
        }
      }

      function displayMarker(place: any) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(place.y, place.x),
        })

        // 마커에 클릭이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'click', function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              place.place_name +
              '</div>',
          )
          infowindow.open(map, marker)
          window.open(place.place_url)
        })
      }

      var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 })

      const mapContainer = document.getElementById('map')
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      }
      var map = new window.kakao.maps.Map(mapContainer, mapOption)

      const ps = new window.kakao.maps.services.Places()
      ps.keywordSearch('역삼동 돝고기', placeSearchCB)
    })
  }, [])

  return (
    <>
      <div id="map" className="h-full w-full"></div>
    </>
  )
}

export { KakaoMap }
