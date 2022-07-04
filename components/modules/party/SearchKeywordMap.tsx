import { useState } from 'react'
import { useQuery } from 'react-query'
import { SearchIcon, CheckIcon } from '@heroicons/react/outline'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { Marker, Team, SearchKeywordValue } from '@/type'
import { useAppSelector } from '@/utils/hooks'
import { retrieveTeam } from '@/api'
import { LoadingSpinner, Form, FormInput, FormCheckbox } from '@/components'
import classNames from 'classnames'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@/components/buttons'
import { useStepperContext } from '@/components/stepper'

type SearchKeywordMapProps = {
  setKeyword: Function
  setStep?: Function
}
enum KakaoResponseStatus {
  INITAIL = 'INITAIL',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  OK = 'OK',
  ZERO_RESULT = 'ZERO_RESULT',
}
const searchKeywordSchema = Yup.object().shape({
  keyword: Yup.string().required('맛집 이름을 입력해 주세요'),
})
const searchKeywordValues = {
  keyword: '',
  use_team_location: true,
  use_kakaomap: true,
  isSetted: false,
}
export const SearchKeywordMap = ({
  setKeyword,
  setStep,
}: SearchKeywordMapProps) => {
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

  const handleSubmit = (values: SearchKeywordValue) => {
    setKeyword(values)
    searchKakaoMap(values)
  }

  const searchKakaoMap = (values: SearchKeywordValue) => {
    if (map) {
      setMarkerInfo(undefined)
      const ps = new kakao.maps.services.Places()

      const location = myTeam.data && myTeam.data.location
      setMapStatus(KakaoResponseStatus.LOADING)
      ps.keywordSearch(
        `${values.keyword} ${values.use_team_location ? location : ''}`,
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
                road_address_name: data[i].road_address_name,
                phone: data[i].phone,
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

  const selectKeyword = (marker: Marker) => {
    setKeyword((prev: SearchKeywordValue) => {
      return { ...prev, keyword: marker.content, isSetted: true }
    })
    const bounds = new kakao.maps.LatLngBounds()
    bounds.extend(
      new kakao.maps.LatLng(marker.position.lat, marker.position.lng),
    )
    map.setBounds(bounds)
    setMarkerInfo(marker)
  }

  const handleUnuseKakaomap = () => {
    setKeyword((prev: SearchKeywordValue) => {
      return { ...prev, use_kakaomap: false, isSetted: true }
    })
    setStep && setStep(1)
  }
  return (
    <div>
      <Form<SearchKeywordValue>
        onSubmit={handleSubmit}
        options={{
          resolver: yupResolver(searchKeywordSchema),
          mode: 'onBlur',
          defaultValues: searchKeywordValues,
        }}
        className="relative"
      >
        <FormInput<SearchKeywordValue>
          id="keyword"
          name="keyword"
          placeholder="맛집 이름을 입력해 주세요"
          className={classNames('inline-block w-full', {
            'border-green-600': markerInfo,
          })}
        />
        <div className="absolute right-0 inline-flex">
          {markerInfo && (
            <span className="inline-block p-2 text-green-500">
              <CheckIcon className=" h-6 w-6" />
            </span>
          )}
          <button
            type="submit"
            className="ml-2 h-11 w-10 rounded-md bg-blue-500 px-2 text-white"
          >
            <SearchIcon className="h-6 w-6" />
          </button>
        </div>

        <FormCheckbox<SearchKeywordValue>
          name="use_team_location"
          type="checkbox"
          label="회사 주변에서 검색하기"
          className="my-2"
        />
      </Form>

      <div className={`relative mt-2 w-full`}>
        <div
          className={`absolute z-10 h-80 w-full bg-white text-sm ${
            mapStatus === KakaoResponseStatus.OK && 'hidden'
          }`}
        >
          {mapStatus === KakaoResponseStatus.ZERO_RESULT && (
            <div>
              <p className="text-red-600">검색결과가 없습니다.</p>
              <Button color="blue" onClick={handleUnuseKakaomap}>
                지도 없이 등록하기
              </Button>
            </div>
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
        <div className="sm:flex">
          <Map
            center={{ lat: 33.5563, lng: 126.79581 }}
            style={{ width: '100%', height: '20rem' }}
            onCreate={setMap}
          >
            {markers.map((marker: Marker) => (
              <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onClick={() => selectKeyword(marker)}
                infoWindowOptions={{
                  className: `${
                    markerInfo?.id === marker.id &&
                    'text-green-600 font-semibold'
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
          <div className="sm:ml-4 sm:w-72">
            <ul className="h-80 overflow-y-auto rounded-lg text-sm text-gray-800 shadow">
              {markers.map((marker: Marker) => (
                <li
                  key={marker.id}
                  onClick={() => selectKeyword(marker)}
                  className={classNames(
                    'cursor-pointer border-b py-4 px-3 hover:bg-gray-50',
                    {
                      'bg-blue-100': markerInfo?.id === marker.id,
                    },
                  )}
                >
                  <p className="text-base font-bold">{marker.content}</p>
                  <p className="text-gray-700">{marker.road_address_name}</p>
                  <p className="text-green-700">{marker.phone}</p>
                </li>
              ))}
              <li className="cursor-pointer py-3 px-3 hover:bg-gray-50">
                <p className="mb-1 text-gray-600">찾는 맛집이 없나요?</p>
                <Button color="blue" onClick={handleUnuseKakaomap}>
                  지도 없이 등록하기
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export const WrappedStepperContextSearchKeywordMap = ({
  setKeyword,
}: SearchKeywordMapProps) => {
  const { setStep } = useStepperContext()

  return <SearchKeywordMap setKeyword={setKeyword} setStep={setStep} />
}
