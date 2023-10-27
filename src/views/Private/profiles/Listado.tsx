import { ButtonAction } from "@/components/iu"
import { useAppDispatch, useAppSelector } from "@/hooks/index"
import { Switch, Table } from "antd"
import { NotData } from "@/components/views"
import { ColumnsType } from "antd/es/table"
import { iprofil } from "@/interfaces/iprofil"
import { useNavigate } from "react-router-dom"
import { set_perfil } from "@/reducers/perfil"
import { put_profile } from "@/controllers/profil"

interface ilista {
  handleClickAdd: () => void
}

const Listado = ({ handleClickAdd }: ilista) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { perfil_perfil, perfil_loadin } = useAppSelector(
    (state) => state.perfil,
  )

  const handleEdit = (perfil: iprofil) => {
    dispatch(set_perfil(perfil))
    navigate(`edit/${perfil.profil_profil}`)
  }

  const handleChangeStatus = (perfil: iprofil) => {
    const item = Object.assign({}, perfil)

    if (perfil.profil_status === 1) {
      item.profil_status = 0
    } else {
      item.profil_status = 1
    }

    dispatch(put_profile({ profil: item }))
  }

  const columns: ColumnsType<iprofil> = [
    {
      title: "Nombres Perfil",
      dataIndex: "profil_nampro",
      sorter: (a, b) =>
        a.profil_nampro.trim().length - b.profil_nampro.trim().length,
    },
    {
      title: "Estado",
      dataIndex: "profil_status",
      className: "text-center",
      render: (_, record) => (
        <Switch
          checkedChildren={"Activo"}
          unCheckedChildren={"Inactivo"}
          checked={record.profil_status === 1}
          onChange={() => handleChangeStatus(record)}
        />
      ),
    },
    {
      title: "Acciones",
      className: "text-center",
      render: (_, record) => (
        <ButtonAction handleEdit={() => handleEdit(record)} />
      ),
    },
  ]

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Table<iprofil>
            size="small"
            loading={perfil_loadin}
            columns={columns}
            showSorterTooltip={false}
            dataSource={perfil_perfil}
            bordered
            rowKey={(profil) => profil.profil_profil}
            locale={{
              emptyText: (
                <NotData
                  onclick={handleClickAdd}
                  btnMssg="Añadir Nuevo Perfil"
                />
              ),
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Listado
