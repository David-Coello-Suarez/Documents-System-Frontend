import { useNavigate } from "react-router-dom"
import { NotData } from "../../../components/views"
import { ColumnsType, Switch, Table, Pagination } from "../../../components/iu"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { iseccio } from "../../../interfaces"
import { set_form_seccio } from "../../../reducers/seccio"
import {
  delete_seccio,
  get_seccios,
  put_seccio,
} from "../../../controllers/seccio"

interface isections {
  handleClickAdd: () => void
}

const Sections = ({ handleClickAdd }: isections) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadin_loadin, seccios_seccios, seccio_paginat } = useAppSelector(
    (state) => state.seccio,
  )

  const { totalItems, limite, pagina } = seccio_paginat

  const handleEdita = (seccio: iseccio) => {
    dispatch(set_form_seccio(seccio))
    navigate(`edit/${seccio.seccio_seccio}`)
  }

  const handleDelete = (body: iseccio) => {
    dispatch(delete_seccio({ body }))
  }

  const columns: ColumnsType<iseccio> = [
    { title: "Fondo Doc.", dataIndex: "fondoc_nombre" },
    { title: "Sección", dataIndex: "seccio_nombre" },
    { title: "Abreviatura", dataIndex: "seccio_abrevi" },
    {
      title: "Estado",
      dataIndex: "seccio_status",
      className: "text-center",
      render: (_x, record) => {
        const value_estatus = Number(record.seccio_status) === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          value_estatus ? (body.seccio_status = 2) : (body.seccio_status = 1)

          dispatch(put_seccio({ body }))
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
          <Table<iseccio>
            bordered
            size="small"
            columns={columns}
            className="m-b-20"
            pagination={false}
            loading={loadin_loadin}
            dataSource={seccios_seccios}
            rowKey={(seccio) => seccio.seccio_seccio}
            locale={{
              emptyText: (
                <NotData
                  onclick={handleClickAdd}
                  btnMssg="Añadir Nueva Sección"
                />
              ),
            }}
          />

          {seccios_seccios.length > 0 && (
            <>
              <Pagination
                onChange={(pagina, limite) =>
                  dispatch(get_seccios({ ...seccio_paginat, pagina, limite }))
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

export default Sections
