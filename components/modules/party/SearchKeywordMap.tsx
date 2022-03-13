import { Field, Formik, Form } from 'formik'
import { Input } from 'components'
import { SearchIcon } from '@heroicons/react/outline'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useState } from 'react'
import { Marker } from 'type/lunch'
import { useAppSelector } from 'hooks'
import { useQuery } from 'react-query'
import { retrieveTeam } from 'api/team'
import { Team } from 'type/team'

const keywordValue = {
  keyword: '',
}

type Keyword = {
  keyword: string
}

type SearchKeywordMapProps = {
  setKeyword: Function
}
const SearchKeywordMap = ({ setKeyword }: SearchKeywordMapProps) => {
  const [markers, setMarkers] = useState<Marker[]>([])
  const [map, setMap] = useState<any>()
  const [noData, setNoData] = useState(true)

  const user = useAppSelector((state) => state.user)
  const team_profile = user.user?.team_profile
  const teamId = team_profile?.team

  const myTeam = useQuery(
    ['myTeam', teamId],
    () => retrieveTeam<Team>(teamId),
    {
      enabled: !!teamId,
    },
  )

  const handleSearchKeyword = (values: Keyword) => {
    if (map) {
      const ps = new kakao.maps.services.Places()

      const location = myTeam.data && myTeam.data.location
      ps.keywordSearch(
        `${location} ${values.keyword}`,
        (data, status, _pagination) => {
          if (status === kakao.maps.services.Status.ZERO_RESULT)
            return setNoData(true)

          if (status === kakao.maps.services.Status.OK) {
            setNoData(false)
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
  }

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={keywordValue}
        onSubmit={handleSearchKeyword}
      >
        {({ handleSubmit, values }) => (
          <Form>
            <div className="flex w-full">
              <Field
                name="keyword"
                component={Input}
                value={values.keyword}
                placeholder="맛집 이름"
                className="w-full"
              />
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="ml-2 w-10 rounded-md bg-blue-500 px-2 text-white"
              >
                <SearchIcon className="h-6 w-6" />
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className={`${noData ? '' : ''} mt-2 h-36 w-full`}>
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: '100%', height: '100%' }}
          onCreate={setMap}
        >
          {markers.map((marker: Marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => updateKeyword(marker)}
            >
              <div style={{ color: '#000' }}>{marker.content}</div>
            </MapMarker>
          ))}
        </Map>
      </div>
    </div>
  )
}

export { SearchKeywordMap }
