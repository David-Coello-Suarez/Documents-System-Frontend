import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { set_perfil } from "../../../reducers/perfil"
import { iprofil } from "../../../interfaces"
import {
  delete_perfil,
  get_perfils,
  put_perfil,
} from "../../../controllers/profil"
import { ColumnsType } from "antd/es/table"
import { Switch, Table, Pagination } from "antd"
import { NotData } from "../../../components/views"

interface iperfil {
  handleClickAdd: () => void
}

const Perfil = ({ handleClickAdd }: iperfil) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleEdita = (perfil: iprofil) => {
    dispatch(set_perfil(perfil))
    navigate(`edit/${perfil.profil_profil}`)
  }

  const handleDelete = (body: iprofil) => {
    dispatch(delete_perfil({ body }))
  }

  const { loading_loading, perfils_perfils, perfils_paginat } = useAppSelector(
    (state) => state.perfil,
  )

  const columns: ColumnsType<iprofil> = [
    { title: "Abreviatura", dataIndex: "profil_abbrev" },
    { title: "Perfil", dataIndex: "profil_nampro" },
    {
      title: "Estado",
      dataIndex: "profil_status",
      className: "text-center",
      render: (_x, record) => {
        const value_estatus = Number(record.profil_status) === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          value_estatus
            ? (body.profil_status = "0")
            : (body.profil_status = "1")

          dispatch(put_perfil({ body }))
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
          <Table<iprofil>
            bordered
            size="small"
            columns={columns}
            className="m-b-20"
            pagination={false}
            loading={loading_loading}
            dataSource={perfils_perfils}
            rowKey={(perfil) => perfil.profil_profil}
            locale={{
              emptyText: (
                <NotData
                  onclick={handleClickAdd}
                  btnMssg="Añadir Nueva Provincia"
                />
              ),
            }}
          />
          {perfils_perfils.length > 0 && (
            <Pagination
              onChange={(pagina, limite) =>
                dispatch(get_perfils({ ...perfils_paginat, pagina, limite }))
              }
              className="text-center"
              total={perfils_paginat.totalItems}
              showSizeChanger
              showTotal={(total, range) =>
                `Mostrando del ${range[0]} a ${range[1]} de ${total} items`
              }
              defaultPageSize={perfils_paginat.limite}
              defaultCurrent={perfils_paginat.pagina}
              pageSizeOptions={[10, 50, 100]}
              size="small"
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Perfil
