import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { NotData } from "../../../components/views"
import { iseriex } from "../../../interfaces"
import { ColumnsType, Pagination, Switch, Table } from "../../../components/iu"
import {
  delete_seriex,
  get_seriexs,
  put_seriex,
} from "../../../controllers/seriex"
import { set_form_seriex } from "../../../reducers/seriex"

interface iserie {
  handleClickAdd: () => void
}

const Seriex = ({ handleClickAdd }: iserie) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadin_loadin, seriexs_seriexs, seriex_paginat } = useAppSelector(
    (state) => state.seriex,
  )

  const { totalItems, limite, pagina } = seriex_paginat

  const handleEdita = (seriex: iseriex) => {
    dispatch(set_form_seriex(seriex))
    navigate(`edit/${seriex.seriex_seriex}`)
  }

  const handleDelete = (body: iseriex) => {
    dispatch(delete_seriex({ body }))
  }

  const columns: ColumnsType<iseriex> = [
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
      title: "Abreviatura",
      dataIndex: "seriex_abrevi",
      sorter: (a, b) => a.seriex_abrevi.length - b.seriex_abrevi.length,
    },
    {
      title: "Estado",
      dataIndex: "seriex_status",
      className: "text-center",
      sorter: (a, b) => a.seriex_status - b.seriex_status,
      render: (_x, record) => {
        const value_estatus = Number(record.seriex_status) === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          value_estatus ? (body.seriex_status = 2) : (body.seriex_status = 1)

          dispatch(put_seriex({ body }))
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
          <Table<iseriex>
            bordered
            size="small"
            columns={columns}
            className="m-b-20"
            pagination={false}
            loading={loadin_loadin}
            dataSource={seriexs_seriexs}
            sortDirections={["ascend", "descend", "ascend"]}
            rowKey={(seriex) => seriex.seriex_seriex}
            locale={{
              triggerDesc: "Click para ordernar desendentemente",
              triggerAsc: "Click para ordernar asendentemente",
              emptyText: (
                <NotData
                  onclick={handleClickAdd}
                  btnMssg="Añadir Nueva serie"
                />
              ),
            }}
          />

          {seriexs_seriexs.length > 0 && (
            <>
              <Pagination
                onChange={(pagina, limite) =>
                  dispatch(get_seriexs({ ...seriex_paginat, pagina, limite }))
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

export default Seriex
