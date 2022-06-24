import { useState } from 'react'
import { useQuery } from 'react-query'
import { SearchIcon, CheckIcon } from '@heroicons/react/outline'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { Input } from '@/components'
import { Marker, Team } from '@/type'
import { useAppSelector } from '@/utils/hooks'
import { retrieveTeam } from '@/api'
import { LoadingSpinner } from '@/components/skeletons'
import classNames from 'classnames'

type SearchKeywordMapProps = {
  setKeyword: Function
  keyword: string | null
}
enum KakaoResponseStatus {
  INITAIL = 'INITAIL',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  OK = 'OK',
  ZERO_RESULT = 'ZERO_RESULT',
}

const SearchKeywordMap = ({ setKeyword, keyword }: SearchKeywordMapProps) => {
  const [tempKeyword, setTempKeyword] = useState('')
  const [markers, setMarkers] = useState<Marker[]>([])
  const [map, setMap] = useState<any>()
  const [mapStatus, setMapStatus] = useState<KakaoResponseStatus>(
    KakaoResponseStatus.INITAIL,
  )
  const [markerInfo, setMarkerInfo] = useState<Marker>()

  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile
  const teamId = team_profile?.team

  const myTeam = useQuery(
    ['myTeam', teamId],
    () => retrieveTeam<Team>(teamId),
    {
      enabled: !!teamId,
      staleTime: 1000 * 60 * 60,
    },
  )

  const handleSearchKeyword = () => {
    const keywordInput = document.getElementById('keyword')
    if (keywordInput) {
      handleFocus(keywordInput)
    }
    if (map) {
      setMarkerInfo(undefined)
      const ps = new kakao.maps.services.Places()

      const location = myTeam.data && myTeam.data.location
      setMapStatus(KakaoResponseStatus.LOADING)
      ps.keywordSearch(
        `${location} ${tempKeyword}`,
        (data, status, _pagination) => {
          if (status === kakao.maps.services.Status.ZERO_RESULT)
            return setMapStatus(KakaoResponseStatus.ZERO_RESULT)

          if (status === kakao.maps.services.Status.OK) {
            setMapStatus(KakaoResponseStatus.OK)
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
  }

  const updateKeyword = (marker: Marker) => {
    setKeyword(marker.content)
    setMarkerInfo(marker)
    const keywordInput = document.getElementById('keyword')
    if (keywordInput) {
      handleFocus(keywordInput)
    }
  }

  const handleFocus = (target: any) => {
    const classList = target.classList
    if (classList.contains('input-error')) {
      classList.remove('input-error')
    }
  }

  return (
    <div>
      <div className="flex w-full">
        <Input
          id="keyword"
          name="keyword"
          placeholder="맛집 이름을 입력해 주세요"
          className={classNames('w-full', { 'border-green-600': markerInfo })}
          onChange={(e) => setTempKeyword(e.target.value)}
          onFocus={(e) => handleFocus(e.target)}
        />
        {markerInfo && (
          <div className="p-2 text-green-500">
            <CheckIcon className=" h-6 w-6" />
          </div>
        )}
        <button
          type="button"
          onClick={() => handleSearchKeyword()}
          className="ml-2 w-10 rounded-md bg-blue-500 px-2 text-white"
        >
          <SearchIcon className="h-6 w-6" />
        </button>
      </div>

      <div className={` relative mt-2  w-full`}>
        <div
          className={`absolute z-10 h-52 w-full bg-white text-sm ${
            mapStatus === KakaoResponseStatus.OK && 'hidden'
          }`}
        >
          {mapStatus === KakaoResponseStatus.ZERO_RESULT && (
            <p className="text-red-600">검색결과가 없습니다.</p>
          )}
          {mapStatus === KakaoResponseStatus.INITAIL && (
            <p>맛집 이름을 검색해 보세요. 회사 근처 맛집을 찾아드려요.</p>
          )}
          {mapStatus === KakaoResponseStatus.LOADING && (
            <div className="flex h-20 w-full items-center justify-center p-3">
              <LoadingSpinner className="h-8 w-8" />
            </div>
          )}
        </div>
        {!markerInfo && mapStatus === KakaoResponseStatus.OK && (
          <div className="text-sm text-gray-800">
            지도에서 마커를 선택해주세요
          </div>
        )}
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: '100%', height: '13rem' }}
          onCreate={setMap}
        >
          {markers.map((marker: Marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => updateKeyword(marker)}
              infoWindowOptions={{
                className: `${
                  markerInfo?.id === marker.id && 'text-green-600 font-semibold'
                }`,
              }}
              image={{
                src:
                  markerInfo?.id === marker.id
                    ? 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'
                    : 'http://t1.daumcdn.net/mapjsapi/images/2x/marker.png',
                size: {
                  width: 24,
                  height: 35,
                },
              }}
            >
              <div className="p-0.5 px-2 text-sm">{marker.content}</div>
            </MapMarker>
          ))}
        </Map>
      </div>
    </div>
  )
}

export { SearchKeywordMap }
