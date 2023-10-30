import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import {
  delete_usuari,
  get_usuaris,
  put_usuari,
} from "../../../controllers/usuari"
import { Pagination, Switch } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import { NotData } from "../../../components/views"
import { iusuari } from "../../../interfaces"
import { set_usuari } from "../../../reducers/usuari"

interface iusucom {
  handleClickAdd: () => void
}

const Usuari = ({ handleClickAdd }: iusucom) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { usuari_loadin, usuari_usuari, usuari_paginat } = useAppSelector(
    (state) => state.usuari,
  )

  const handleEdita = (ususari: iusuari) => {
    dispatch(set_usuari(ususari))
    navigate(`edit/${ususari.usuari_usuari}`)
  }

  const handleDelete = (body: iusuari) => {
    dispatch(delete_usuari({ body }))
  }

  const columns: ColumnsType<iusuari> = [
    { title: "Nombres pellidos", dataIndex: "usuari_nomape" },
    { title: "Nombre usuario", dataIndex: "usuari_nomusu" },
    { title: "Correo electrónico", dataIndex: "usuari_correo" },
    {
      title: "Estado",
      dataIndex: "usuari_estado",
      className: "text-center",
      render: (_x, record) => {
        const estado_usuario = record.usuari_estado === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          estado_usuario ? (body.usuari_estado = 0) : (body.usuari_estado = 1)

          dispatch(put_usuari({ body }))
        }

        const classStyle = estado_usuario ? "bg-success" : "bg-warning"

        return (
          <Switch
            checkedChildren={<i className="fa fa-check" aria-hidden="true" />}
            unCheckedChildren={
              <i className="fa fa-exclamation" aria-hidden="true" />
            }
            className={classStyle}
            onChange={handleChecked}
            checked={estado_usuario}
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
          <Table<iusuari>
            bordered
            size="small"
            columns={columns}
            className="m-b-20"
            pagination={false}
            loading={usuari_loadin}
            dataSource={usuari_usuari}
            rowKey={(usuari) => usuari.usuari_usuari}
            locale={{
              emptyText: (
                <NotData
                  onclick={handleClickAdd}
                  btnMssg="Añadir Nuevo Usuario"
                />
              ),
            }}
          />

          {usuari_usuari.length > 0 && (
            <Pagination
              onChange={(pagina, limite) =>
                dispatch(get_usuaris({ ...usuari_paginat, pagina, limite }))
              }
              className="text-center"
              total={usuari_paginat.totalItems}
              showSizeChanger
              showTotal={(total, range) =>
                `Mostrando del ${range[0]} a ${range[1]} de ${total} items`
              }
              defaultPageSize={usuari_paginat.limite}
              defaultCurrent={usuari_paginat.pagina}
              pageSizeOptions={[10, 50, 100]}
              size="small"
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Usuari
