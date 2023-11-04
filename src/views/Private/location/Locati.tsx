import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { iubicac } from "../../../interfaces"
import { set_form_ubicac } from "../../../reducers/ubicac"
import {
  delete_ubicac,
  get_ubicacs,
  put_ubicac,
} from "../../../controllers/ubicac"
import { ColumnsType, Pagination, Switch, Table } from "../../../components/iu"
import { NotData } from "../../../components/views"

interface iloccom {
  handleClickAdd: () => void
  btnMsg: string
}

const Ubicac = ({ handleClickAdd, btnMsg }: iloccom) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadin_loadin, ubicacs_ubicacs, ubicac_pagina } = useAppSelector(
    (state) => state.ubicac,
  )

  const handleEdita = (ubicac: iubicac) => {
    dispatch(set_form_ubicac(ubicac))
    navigate(`edit/${ubicac.ubicac_ubicac}`)
  }

  const handleDelete = (body: iubicac) => {
    dispatch(delete_ubicac({ body }))
  }

  const { limite, pagina, totalItems } = ubicac_pagina

  const columns: ColumnsType<iubicac> = [
    {
      ellipsis: true,
      title: "Localidad",
      dataIndex: "locali_nombre",
      sorter: (a, b) => a.locali_nombre.length - b.locali_nombre.length,
    },
    {
      ellipsis: true,
      title: "Sector",
      dataIndex: "sector_nombre",
      sorter: (a, b) => a.sector_nombre.length - b.sector_nombre.length,
    },
    {
      ellipsis: true,
      title: "Sub Sector",
      dataIndex: "subsct_nombre",
      sorter: (a, b) => a.subsct_nombre.length - b.subsct_nombre.length,
    },
    {
      ellipsis: true,
      title: "Ubicación",
      dataIndex: "ubicac_descri",
      sorter: (a, b) => a.ubicac_descri.length - b.ubicac_descri.length,
    },
    {
      ellipsis: true,
      title: "N°. Division",
      dataIndex: "ubicac_numdiv",
      sorter: (a, b) => a.ubicac_numdiv - b.ubicac_numdiv,
    },
    {
      title: "Estado",
      className: "text-center",
      dataIndex: "ubicac_status",
      sorter: (a, b) => a.ubicac_status - b.ubicac_status,
      render: (_x, record) => {
        const value_estatus = Number(record.ubicac_status) === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          value_estatus ? (body.ubicac_status = 2) : (body.ubicac_status = 1)

          dispatch(put_ubicac({ body }))
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
          <Table<iubicac>
            bordered
            size="small"
            columns={columns}
            className="m-b-20"
            pagination={false}
            loading={loadin_loadin}
            dataSource={ubicacs_ubicacs}
            sortDirections={["ascend", "descend", "ascend"]}
            rowKey={(ubicac) => ubicac.locali_locali}
            locale={{
              triggerDesc: "Click para ordernar desendentemente",
              triggerAsc: "Click para ordernar asendentemente",
              emptyText: <NotData onclick={handleClickAdd} btnMssg={btnMsg} />,
            }}
          />

          {ubicacs_ubicacs.length > 0 && (
            <>
              <Pagination
                onChange={(pagina, limite) =>
                  dispatch(get_ubicacs({ ...ubicac_pagina, pagina, limite }))
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

export default Ubicac
