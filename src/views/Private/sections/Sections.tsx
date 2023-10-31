import { Switch, Table } from "antd"
import { NotData } from "../../../components/views"
import { ColumnsType } from "antd/es/table"
import { isectio } from "../../../interfaces"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { useNavigate } from "react-router-dom"
import { set_form_sectio } from "../../../reducers/sectio"

interface isections {
  handleClickAdd: () => void
}

const Sections = ({ handleClickAdd }: isections) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadin_loadin, sectios_sectios } = useAppSelector(
    (state) => state.sectio,
  )

  const handleEdita = (sectio: isectio) => {
    dispatch(set_form_sectio(sectio))
    navigate(`edit/${sectio.sectio_sectio}`)
  }

  const columns: ColumnsType<isectio> = [
    { title: "Sección", dataIndex: "sectio_nombre" },
    { title: "Abreviatura", dataIndex: "sectio_abbrev" },
    {
      title: "Estado",
      dataIndex: "sectio_status",
      className: "text-center",
      render: (_x, record) => {
        const value_estatus = Number(record.sectio_status) === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          value_estatus ? (body.sectio_status = 0) : (body.sectio_status = 1)

          //   dispatch(put_perfil({ body }))
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
            // onClick={() => handleDelete(record)}
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
          <Table
            bordered
            size="small"
            columns={columns}
            className="m-b-20"
            pagination={false}
            loading={loadin_loadin}
            dataSource={sectios_sectios}
            rowKey={(sectio) => sectio.sectio_sectio}
            locale={{
              emptyText: (
                <NotData
                  onclick={handleClickAdd}
                  btnMssg="Añadir Nueva Sección"
                />
              ),
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Sections
