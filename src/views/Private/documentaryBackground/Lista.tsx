import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { Table, Switch, Pagination } from "antd"
import type { ColumnsType } from "antd/es/table"
import { NotData } from "../../../components/views"
import { ButtonAction } from "../../../components/iu/"
import { ifondoc } from "../../../interfaces"
import { set_fondoc } from "../../../reducers/fondoc"

interface ilista {
  handleClickAdd: () => void
}

const Lista = ({ handleClickAdd }: ilista) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { fondocs_fondocs } = useAppSelector((state) => state.fondoc)

  const handleEdit = (item: ifondoc) => {
    navigate(`edit/${item.fondoc_fondoc}`)
    dispatch(set_fondoc(item))
  }

  const columns: ColumnsType<ifondoc> = [
    {
      title: "Abreviatura",
      dataIndex: "fondoc_abrevi",
      sorter: (a, b) =>
        a.fondoc_abrevi.trim().length - b.fondoc_abrevi.trim().length,
    },
    {
      title: "Descripción",
      dataIndex: "fondoc_nombre",
      sorter: (a, b) =>
        a.fondoc_nombre.trim().length - b.fondoc_nombre.trim().length,
    },
    {
      title: "Estado",
      dataIndex: "fondoc_estado",
      className: "text-center",
      render: (_x, record) => {
        const value_estatus = Number(record.fondoc_estado) === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          value_estatus
            ? (body.fondoc_estado = "0")
            : (body.fondoc_estado = "1")

          // dispatch(put_perfil({ body }))
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
      render: (value) => <ButtonAction handleEdit={() => handleEdit(value)} />,
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
                // onChange={(pagina, limite) =>
                //   dispatch(get_perfils({ ...perfils_paginat, pagina, limite }))
                // }
                responsive
                className="text-center"
                total={100}
                showSizeChanger
                showTotal={(total, range) =>
                  `Mostrando del ${range[0]} a ${range[1]} de ${total} items`
                }
                defaultPageSize={10}
                defaultCurrent={1}
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
