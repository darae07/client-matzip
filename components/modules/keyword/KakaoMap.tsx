import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { Keyword, Marker } from '@/type'

type KakaoMapProps = {
  location: string | null
  keyword: Keyword
}

const KakaoMap = ({ location, keyword }: KakaoMapProps) => {
  const [markers, setMarkers] = useState<Marker[]>([])
  const [map, setMap] = useState<any>()
  const [noData, setNoData] = useState(false)

  useEffect(() => {
    if (map) {
      const ps = new kakao.maps.services.Places()

      ps.keywordSearch(
        `${keyword.name} ${keyword.use_team_location ? location : ''}`,
        (data, status, _pagination) => {
          if (status === kakao.maps.services.Status.ZERO_RESULT)
            return setNoData(true)

          if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds()
            let _markers = []

            for (var i = 0; i < data.length; i++) {
              // @ts-ignore
              _markers.push({
                position: {
                  lat: Number(data[i].y),
                  lng: Number(data[i].x),
                },
                content: data[i].place_name,
                place_url: data[i].place_url,
                road_address_name: data[i].road_address_name,
                phone: data[i].phone,
                id: data[i].id,
              })
              // @ts-ignore
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
            }
            setMarkers(_markers)

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds)
          }
        },
      )
    }
  }, [map, location, keyword])

  const openStore = (marker: Marker) => {
    window.open(marker.place_url)
  }

  return (
    <>
      {noData ? (
        <div>가게 정보를 불러올 수 없습니다.</div>
      ) : (
        <div className="h-60 sm:flex">
          <Map
            center={{ lat: 33.5563, lng: 126.79581 }}
            style={{ width: '100%', height: '100%' }}
            onCreate={setMap}
          >
            {markers.map((marker: Marker) => (
              <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onClick={() => openStore(marker)}
              >
                <div style={{ color: '#000' }}>{marker.content}</div>
              </MapMarker>
            ))}
          </Map>
          <div className="sm:ml-4 sm:w-72">
            {markers.map((marker: Marker) => (
              <div
                key={marker.id}
                className="cursor-pointer py-4 px-3 hover:bg-gray-50"
              >
                <p className="text-base font-bold">{marker.content}</p>
                <p className="text-gray-700">{marker.road_address_name}</p>
                <p className="text-green-700">{marker.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export { KakaoMap }
