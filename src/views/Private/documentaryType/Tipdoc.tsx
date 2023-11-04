import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { itipdoc } from "../../../interfaces"
import { set_form_tipdoc } from "../../../reducers/tipdoc"
import {
  delete_tipdoc,
  get_tipdocs,
  put_tipdoc,
} from "../../../controllers/tipdoc"
import { ColumnsType, Pagination, Switch, Table } from "../../../components/iu"
import { NotData } from "../../../components/views"

interface itidocom {
  handleClickAdd: () => void
  btnMsg: string
}

const Tipdoc = ({ handleClickAdd, btnMsg }: itidocom) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadin_loadin, tipdocs_tipdocs, tipdoc_pagina } = useAppSelector(
    (state) => state.tipdoc,
  )

  const handleEdita = (tipdoc: itipdoc) => {
    dispatch(set_form_tipdoc(tipdoc))
    navigate(`edit/${tipdoc.tipdoc_tipdoc}`)
  }

  const handleDelete = (body: itipdoc) => {
    dispatch(delete_tipdoc({ body }))
  }

  const { limite, pagina, totalItems } = tipdoc_pagina

  const columns: ColumnsType<itipdoc> = [
    {
      ellipsis: true,
      title: "Tipo Documento",
      dataIndex: "tipdoc_descri",
      sorter: (a, b) => a.tipdoc_descri.length - b.tipdoc_descri.length,
    },
    {
      ellipsis: true,
      title: "N°. Conservación",
      dataIndex: "tipdoc_numcon",
      sorter: (a, b) => a.tipdoc_numcon - b.tipdoc_numcon,
    },
    {
      title: "Estado",
      className: "text-center",
      dataIndex: "tipdoc_status",
      sorter: (a, b) => a.tipdoc_status - b.tipdoc_status,
      render: (_x, record) => {
        const value_estatus = Number(record.tipdoc_status) === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          value_estatus ? (body.tipdoc_status = 2) : (body.tipdoc_status = 1)

          dispatch(put_tipdoc({ body }))
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
          <Table<itipdoc>
            bordered
            size="small"
            columns={columns}
            className="m-b-20"
            pagination={false}
            loading={loadin_loadin}
            dataSource={tipdocs_tipdocs}
            sortDirections={["ascend", "descend", "ascend"]}
            rowKey={(tipdoc) => tipdoc.tipdoc_tipdoc}
            locale={{
              triggerDesc: "Click para ordernar desendentemente",
              triggerAsc: "Click para ordernar asendentemente",
              emptyText: <NotData onclick={handleClickAdd} btnMssg={btnMsg} />,
            }}
          />

          {tipdocs_tipdocs.length > 0 && (
            <>
              <Pagination
                onChange={(pagina, limite) =>
                  dispatch(get_tipdocs({ ...tipdoc_pagina, pagina, limite }))
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

export default Tipdoc
