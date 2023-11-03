import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { isubsct } from "../../../interfaces"
import { set_form_subsct } from "../../../reducers/subsct"
import {
  delete_subsct,
  get_subscts,
  put_subsct,
} from "../../../controllers/subsct"
import { ColumnsType, Pagination, Switch, Table } from "../../../components/iu"
import { NotData } from "../../../components/views"

interface issccom {
  handleClickAdd: () => void
  btnMsg: string
}

const Subsct = ({ handleClickAdd, btnMsg }: issccom) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadin_loadin, subscts_subscts, subsct_pagina } = useAppSelector(
    (state) => state.subsct,
  )

  const handleEdita = (subsct: isubsct) => {
    dispatch(set_form_subsct(subsct))
    navigate(`edit/${subsct.subsct_subsct}`)
  }

  const handleDelete = (body: isubsct) => {
    dispatch(delete_subsct({ body }))
  }

  const { limite, pagina, totalItems } = subsct_pagina

  const columns: ColumnsType<isubsct> = [
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
      ellipsis: true,
      title: "Sub Sector",
      dataIndex: "subsct_nombre",
      sorter: (a, b) => a.subsct_nombre.length - b.subsct_nombre.length,
    },
    {
      title: "Estado",
      className: "text-center",
      dataIndex: "subsct_status",
      sorter: (a, b) => a.subsct_status - b.subsct_status,
      render: (_x, record) => {
        const value_estatus = Number(record.subsct_status) === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          value_estatus ? (body.subsct_status = 2) : (body.subsct_status = 1)

          dispatch(put_subsct({ body }))
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
          <Table<isubsct>
            bordered
            size="small"
            columns={columns}
            className="m-b-20"
            pagination={false}
            loading={loadin_loadin}
            dataSource={subscts_subscts}
            sortDirections={["ascend", "descend", "ascend"]}
            rowKey={(subsct) => subsct.locali_locali}
            locale={{
              triggerDesc: "Click para ordernar desendentemente",
              triggerAsc: "Click para ordernar asendentemente",
              emptyText: <NotData onclick={handleClickAdd} btnMssg={btnMsg} />,
            }}
          />

          {subscts_subscts.length > 0 && (
            <>
              <Pagination
                onChange={(pagina, limite) =>
                  dispatch(get_subscts({ ...subsct_pagina, pagina, limite }))
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

export default Subsct
