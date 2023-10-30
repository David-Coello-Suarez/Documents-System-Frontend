import { useEffect } from "react"
import { Switch } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import { useAppDispatch, useAppSelector } from "@/hooks/index"
import { ButtonAction } from "@/components/iu"
import { NotData } from "@/components/views"
import { iusuari } from "@/interfaces/index"
import { listar_usuario } from "@/controllers/usuari"
import { clean_array_usuari, set_usuari } from "@/reducers/usuari"
import { useNavigate } from "react-router-dom"

interface ilista {
  handleClickAdd: () => void
}

const Listado = ({ handleClickAdd }: ilista) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(listar_usuario())

    return () => {
      dispatch(clean_array_usuari())
    }
  }, [])

  const handleEdit = (usuari: iusuari) => {
    dispatch(set_usuari(usuari))
    navigate(`edit/${usuari.usuari_usuari}`)
  }

  const { usuari_usuari, usuari_loadin } = useAppSelector(
    (state) => state.usuari,
  )

  const columns: ColumnsType<iusuari> = [
    {
      title: "Nombres Apellidos",
      dataIndex: "usuari_nomape",
      sorter: (a, b) =>
        a.usuari_nomape.trim().length - b.usuari_nomape.trim().length,
    },
    {
      title: "Nombre de usuario",
      dataIndex: "usuari_nomusu",
      sorter: (a, b) =>
        a.usuari_nomusu.trim().length - b.usuari_nomusu.trim().length,
    },
    {
      title: "Correo Electrónico",
      dataIndex: "usuari_correo",
      sorter: (a, b) =>
        a.usuari_correo.trim().length - b.usuari_correo.trim().length,
    },
    {
      title: "Perfil Asig.",
      dataIndex: "usuari_perfil",
      sorter: (a, b) =>
        a.usuari_perfil.trim().length - b.usuari_perfil.trim().length,
    },
    {
      title: "Tipo Autenticación",
      dataIndex: "usuari_tipaut",
      sorter: (a, b) =>
        a.usuari_tipaut.trim().length - b.usuari_tipaut.trim().length,
    },
    {
      title: "Estado",
      dataIndex: "fondoc_estado",
      className: "text-center",
      render: (_, record) => (
        <Switch
          checkedChildren={"Activo"}
          unCheckedChildren={"Inactivo"}
          checked={record.usuari_estado == 1}
        />
      ),
    },
    {
      title: "Acciones",
      className: "text-center",
      render: (value) => <ButtonAction handleEdit={() => handleEdit(value)} />,
    },
  ]

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Table<iusuari>
            size="small"
            columns={columns}
            loading={usuari_loadin}
            showSorterTooltip={false}
            dataSource={usuari_usuari}
            bordered
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
        </div>
      </div>
    </>
  )
}

export default Listado
