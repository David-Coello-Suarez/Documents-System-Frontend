import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { Table, Switch, Pagination } from "antd"
import type { ColumnsType } from "antd/es/table"
import { NotData } from "../../../components/views"
import { ifondoc } from "../../../interfaces"
import { set_fondoc } from "../../../reducers/fondoc"
import {
  delete_fondoc,
  get_fondocs,
  put_fondoc,
} from "../../../controllers/fondoc"

interface ilista {
  handleClickAdd: () => void
}

const Lista = ({ handleClickAdd }: ilista) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { fondocs_fondocs, fondoc_paginat, loadin_loadin } = useAppSelector(
    (state) => state.fondoc,
  )

  const handleEdit = (item: ifondoc) => {
    navigate(`edit/${item.fondoc_fondoc}`)
    dispatch(set_fondoc(item))
  }

  const handleDelete = (body: ifondoc) => {
    dispatch(delete_fondoc({ body }))
  }

  const columns: ColumnsType<ifondoc> = [
    {
      title: "Fondo Doc.",
      dataIndex: "fondoc_nombre",
      sorter: (a, b) =>
        a.fondoc_nombre.trim().length - b.fondoc_nombre.trim().length,
    },
    {
      title: "Descripción",
      dataIndex: "fondoc_descri",
      sorter: (a, b) =>
        a.fondoc_descri.trim().length - b.fondoc_descri.trim().length,
    },
    {
      title: "Estado",
      dataIndex: "fondoc_status",
      className: "text-center",
      render: (_x, record) => {
        const value_estatus = Number(record.fondoc_status) === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          value_estatus ? (body.fondoc_status = 0) : (body.fondoc_status = 1)

          dispatch(put_fondoc({ body }))
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
            onClick={() => handleEdit(record)}
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
          <Table<ifondoc>
            bordered
            size="small"
            columns={columns}
            className="m-b-20"
            pagination={false}
            loading={loadin_loadin}
            dataSource={fondocs_fondocs}
            showSorterTooltip={false}
            rowKey={(fondoc) => fondoc.fondoc_fondoc}
            locale={{
              emptyText: (
                <NotData
                  onclick={handleClickAdd}
                  btnMssg="Añadir Nuevo Fondo Documental"
                />
              ),
            }}
          />

          {fondocs_fondocs.length > 0 && (
            <>
              <Pagination
                onChange={(pagina, limite) =>
                  dispatch(get_fondocs({ ...fondoc_paginat, pagina, limite }))
                }
                responsive
                className="text-center"
                total={fondoc_paginat.totalItems}
                showSizeChanger
                showTotal={(total, range) =>
                  `Mostrando del ${range[0]} a ${range[1]} de ${total} items`
                }
                defaultPageSize={fondoc_paginat.limite}
                defaultCurrent={fondoc_paginat.pagina}
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

export default Lista
