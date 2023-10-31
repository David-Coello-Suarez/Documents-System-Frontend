import { useNavigate } from "react-router-dom"
import { Table, Switch } from "antd"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { set_form_subser } from "../../../reducers/subser"
import { ColumnsType } from "antd/es/table"
import { NotData } from "../../../components/views"
import { isubser } from "../../../interfaces"

interface iseriesc {
  handleClickAdd: () => void
  btnMsg: string
}

const Subseries = ({ handleClickAdd, btnMsg }: iseriesc) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadin_loadin, subsers_subsers } = useAppSelector(
    (state) => state.subser,
  )

  const handleEdita = (subser: isubser) => {
    dispatch(set_form_subser(subser))
    navigate(`edit/${subser.series_series}`)
  }

  const columns: ColumnsType<isubser> = [
    { title: "Fondo Documental", dataIndex: "fondoc_nombre" },
    { title: "Sección", dataIndex: "sectio_nombre" },
    { title: "Sub Sección", dataIndex: "subsec_nombre" },
    { title: "Serie", dataIndex: "series_nombre" },
    { title: "Sub Serie", dataIndex: "subseri_nombre" },
    {
      title: "Estado",
      dataIndex: "series_status",
      className: "text-center",
      render: (_x, record) => {
        const value_estatus = Number(record.subseri_status) === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          value_estatus ? (body.subseri_status = 0) : (body.subseri_status = 1)

          //   dispatch(put_perfil({ body }))
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
            // onClick={() => handleDelete(record)}
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
            rowKey={(subser) => subser.subser_subser}
            locale={{
              emptyText: <NotData onclick={handleClickAdd} btnMssg={btnMsg} />,
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Subseries
