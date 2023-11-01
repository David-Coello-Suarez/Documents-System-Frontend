import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { isubsec } from "../../../interfaces"
import { set_form_subsec } from "../../../reducers/subsec"
import { NotData } from "../../../components/views"
import { ColumnsType, Pagination, Switch, Table } from "../../../components/iu"
import {
  delete_subsec,
  get_subsecs,
  put_subsec,
} from "../../../controllers/subsec"

interface isubsection {
  handleClickAdd: () => void
}
const Subsection = ({ handleClickAdd }: isubsection) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadin_loadin, subsecs_subsecs, subsecc_paginat } = useAppSelector(
    (state) => state.subsec,
  )

  const { totalItems, limite, pagina } = subsecc_paginat

  const handleEdita = (subsec: isubsec) => {
    dispatch(set_form_subsec(subsec))
    navigate(`edit/${subsec.subsec_subsec}`)
  }

  const handleDelete = (body: isubsec) => {
    dispatch(delete_subsec({ body }))
  }

  const columns: ColumnsType<isubsec> = [
    { title: "Fondo Documental", dataIndex: "fondoc_nombre" },
    { title: "Sección", dataIndex: "seccio_nombre" },
    { title: "Sub Sección", dataIndex: "subsec_nombre" },
    {
      title: "Estado",
      dataIndex: "subsec_status",
      className: "text-center",
      render: (_x, record) => {
        const value_estatus = Number(record.subsec_status) === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          value_estatus ? (body.subsec_status = 2) : (body.subsec_status = 1)

          dispatch(put_subsec({ body }))
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
          <Table<isubsec>
            bordered
            size="small"
            columns={columns}
            className="m-b-20"
            pagination={false}
            loading={loadin_loadin}
            dataSource={subsecs_subsecs}
            rowKey={(subsec) => subsec.subsec_subsec}
            locale={{
              emptyText: (
                <NotData
                  onclick={handleClickAdd}
                  btnMssg="Añadir Nueva Subsección"
                />
              ),
            }}
          />

          {subsecs_subsecs.length > 0 && (
            <>
              <Pagination
                onChange={(pagina, limite) =>
                  dispatch(get_subsecs({ ...subsecc_paginat, pagina, limite }))
                }
                responsive
                className="text-center"
                total={totalItems}
                showSizeChanger
                showTotal={(total, range) =>
                  `Mostrando del ${range[0]} a ${range[1]} de ${total} items`
                }
                defaultPageSize={limite}
                defaultCurrent={pagina}
                pageSizeOptions={[10, 50, 100]}
                size="small"
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Subsection
