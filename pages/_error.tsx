import { NextPageContext } from 'next'

interface ErrorComponentProps {
  statusCode?: number
}

const Error = ({ statusCode }: ErrorComponentProps): JSX.Element => {
  return (
    <div className="container mx-auto flex h-screen w-fit items-center">
      <div className="text-center">
        <h2 className="text-7xl font-black text-blue-400">{statusCode}</h2>
        <h1 className="mt-5 text-2xl">에러가 발생했습니다.</h1>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
