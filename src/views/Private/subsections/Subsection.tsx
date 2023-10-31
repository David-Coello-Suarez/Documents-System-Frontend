import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { isubsec } from "../../../interfaces"
import { set_form_subsec } from "../../../reducers/subsec"
import { ColumnsType } from "antd/es/table"
import { Switch, Table } from "antd"
import { NotData } from "../../../components/views"

interface isubsection {
  handleClickAdd: () => void
}
const Subsection = ({ handleClickAdd }: isubsection) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadin_loadin, subsecs_subsecs } = useAppSelector(
    (state) => state.subsec,
  )

  const handleEdita = (subsec: isubsec) => {
    dispatch(set_form_subsec(subsec))
    navigate(`edit/${subsec.subsec_subsec}`)
  }

  const columns: ColumnsType<isubsec> = [
    { title: "Fondo Documental", dataIndex: "sectio_nombre" },
    { title: "Sección", dataIndex: "sectio_nombre" },
    { title: "Sub Sección", dataIndex: "subsec_nombre" },
    { title: "Abreviatura", dataIndex: "subsec_abrevv" },
    {
      title: "Estado",
      dataIndex: "subsec_status",
      className: "text-center",
      render: (_x, record) => {
        const value_estatus = Number(record.subsec_status) === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          value_estatus ? (body.subsec_status = 0) : (body.subsec_status = 1)

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
          <Table<isubsec>
            bordered
            size="small"
            columns={columns}
            className="m-b-20"
            pagination={false}
            loading={loadin_loadin}
            dataSource={subsecs_subsecs}
            rowKey={(sectio) => sectio.sectio_sectio}
            locale={{
              emptyText: (
                <NotData
                  onclick={handleClickAdd}
                  btnMssg="Añadir Nueva Subsección"
                />
              ),
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Subsection
