import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { Table, Switch } from "antd"
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

  const { fondoc_fondoc } = useAppSelector((state) => state.fondoc)

  const handleEdit = (item: ifondoc) => {
    navigate(`edit/${item.fondoc_fondoc}`)
    dispatch(set_fondoc(item))
  }

  const columns: ColumnsType<ifondoc> = [
    { title: "#", render: (_, _x, idx) => idx + 1 },
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
      render: (value) => (
        <Switch
          checkedChildren={"Activo"}
          unCheckedChildren={"Inactivo"}
          checked={value == "A"}
        />
      ),
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
            dataSource={fondoc_fondoc}
            columns={columns}
            showSorterTooltip={false}
            size="small"
            bordered
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
        </div>
      </div>
    </>
  )
}

export default Lista
