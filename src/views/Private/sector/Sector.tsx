import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { isector } from "../../../interfaces"
import { set_form_sector } from "../../../reducers/sector"
import {
  delete_sector,
  get_sectors,
  put_sector,
} from "../../../controllers/sector"
import { ColumnsType, Pagination, Switch, Table } from "../../../components/iu"
import { NotData } from "../../../components/views"

interface ilocaco {
  handleClickAdd: () => void
  btnMsg: string
}

const Sector = ({ handleClickAdd, btnMsg }: ilocaco) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadin_loadin, sectors_sectors, sector_pagina } = useAppSelector(
    (state) => state.sector,
  )

  const handleEdita = (sector: isector) => {
    dispatch(set_form_sector(sector))
    navigate(`edit/${sector.sector_sector}`)
  }

  const handleDelete = (body: isector) => {
    dispatch(delete_sector({ body }))
  }

  const { limite, pagina, totalItems } = sector_pagina

  const columns: ColumnsType<isector> = [
    {
      ellipsis: true,
      title: "Localidad",
      dataIndex: "locali_descri",
      sorter: (a, b) => a.locali_descri.length - b.locali_descri.length,
    },
    {
      ellipsis: true,
      title: "Sector",
      dataIndex: "sector_nombre",
      sorter: (a, b) => a.sector_nombre.length - b.sector_nombre.length,
    },
    {
      title: "Estado",
      className: "text-center",
      dataIndex: "sector_status",
      sorter: (a, b) => a.sector_status - b.sector_status,
      render: (_x, record) => {
        const value_estatus = Number(record.sector_status) === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          value_estatus ? (body.sector_status = 2) : (body.sector_status = 1)

          dispatch(put_sector({ body }))
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
          <Table<isector>
            bordered
            size="small"
            columns={columns}
            className="m-b-20"
            pagination={false}
            loading={loadin_loadin}
            dataSource={sectors_sectors}
            sortDirections={["ascend", "descend", "ascend"]}
            rowKey={(sector) => sector.locali_locali}
            locale={{
              triggerDesc: "Click para ordernar desendentemente",
              triggerAsc: "Click para ordernar asendentemente",
              emptyText: <NotData onclick={handleClickAdd} btnMssg={btnMsg} />,
            }}
          />

          {sectors_sectors.length > 0 && (
            <>
              <Pagination
                onChange={(pagina, limite) =>
                  dispatch(get_sectors({ ...sector_pagina, pagina, limite }))
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

export default Sector
