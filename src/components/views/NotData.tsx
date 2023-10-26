import { Empty } from "antd"

interface inotdata {
  onclick: () => void
  btnMssg: string
}

const NotData = (props: inotdata) => {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 60 }}
      description={<span>No hay datos para mostrar</span>}
    >
      <button
        onClick={props.onclick}
        className="align-items-center btn btn-primary btn-rounded btn-sm"
      >
        <i className="fa fa-plus" />
        <strong className="m-l-5">{props.btnMssg}</strong>
      </button>
    </Empty>
  )
}

export default NotData
