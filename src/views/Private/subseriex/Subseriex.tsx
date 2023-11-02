import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { set_form_subser } from "../../../reducers/subser"
import { NotData } from "../../../components/views"
import { ColumnsType, Switch, Table } from "../../../components/iu"
import { delete_subser, put_subser } from "../../../controllers/subser"
import { isubser } from "../../../interfaces"

interface iseriesc {
  handleClickAdd: () => void
  btnMsg: string
}

const Subseriex = ({ handleClickAdd, btnMsg }: iseriesc) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadin_loadin, subsers_subsers } = useAppSelector(
    (state) => state.subser,
  )

  const handleEdita = (subser: isubser) => {
    dispatch(set_form_subser(subser))
    navigate(`edit/${subser.subser_subser}`)
  }

  const handleDelete = (body: isubser) => {
    dispatch(delete_subser({ body }))
  }

  const columns: ColumnsType<isubser> = [
    {
      ellipsis: true,
      title: "Fondo Documental",
      dataIndex: "fondoc_nombre",
      sorter: (a, b) => a.fondoc_nombre.length - b.fondoc_nombre.length,
    },
    {
      title: "Sección",
      dataIndex: "seccio_nombre",
      sorter: (a, b) => a.seccio_nombre.length - b.seccio_nombre.length,
    },
    {
      title: "Sub Sección",
      dataIndex: "subsec_nombre",
      sorter: (a, b) => a.subsec_nombre.length - b.subsec_nombre.length,
    },
    {
      title: "Serie",
      dataIndex: "seriex_nombre",
      sorter: (a, b) => a.seriex_nombre.length - b.seriex_nombre.length,
    },
    {
      title: "Sub Serie",
      dataIndex: "subser_nombre",
      sorter: (a, b) => a.subser_nombre.length - b.subser_nombre.length,
    },
    {
      title: "Estado",
      className: "text-center",
      dataIndex: "subser_status",
      sorter: (a, b) => a.subser_status - b.subser_status,
      render: (_x, record) => {
        const value_estatus = Number(record.subser_status) === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          value_estatus ? (body.subser_status = 2) : (body.subser_status = 1)

          dispatch(put_subser({ body }))
        }

        const classStyle = value_estatus ? "bg-success" : "bg-warning"

        return (
          <Switch
            checkedChildren={<i className="fa fa-check" aria-hidden="true" />}
            unCheckedChildren={
              <i className="fa fa-exclamation" aria-hidden="true" />
            }
            className={classStyle}
            onChange={handleChecked}
            checked={value_estatus}
          />
        )
      },
    },
    {
      title: "Acciones",
      className: "text-center",
      render: (_value, record) => (
        <>
          <button
            className="btn btn-sm btn-success m-r-5"
            onClick={() => handleEdita(record)}
          >
            <i className="fa fa-edit" />
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleDelete(record)}
          >
            <i className="fa fa-trash" />
          </button>
        </>
      ),
    },
  ]

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Table<isubser>
            bordered
            size="small"
            columns={columns}
            className="m-b-20"
            pagination={false}
            loading={loadin_loadin}
            dataSource={subsers_subsers}
            sortDirections={["ascend", "descend", "ascend"]}
            rowKey={(subser) => subser.subser_subser}
            locale={{
              triggerDesc: "Click para ordernar desendentemente",
              triggerAsc: "Click para ordernar asendentemente",
              emptyText: <NotData onclick={handleClickAdd} btnMssg={btnMsg} />,
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Subseriex
