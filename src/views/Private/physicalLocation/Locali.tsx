import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { ilocali } from "../../../interfaces"
import { set_form_locali } from "../../../reducers/locali"
import {
  delete_locali,
  get_localis,
  put_locali,
} from "../../../controllers/locali"
import { ColumnsType, Pagination, Switch, Table } from "../../../components/iu"
import { NotData } from "../../../components/views"

interface ilocaco {
  handleClickAdd: () => void
  btnMsg: string
}

const Locali = ({ handleClickAdd, btnMsg }: ilocaco) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadin_loadin, localis_localis, locali_pagina } = useAppSelector(
    (state) => state.locali,
  )

  const handleEdita = (locali: ilocali) => {
    dispatch(set_form_locali(locali))
    navigate(`edit/${locali.locali_locali}`)
  }

  const handleDelete = (body: ilocali) => {
    dispatch(delete_locali({ body }))
  }

  const { limite, pagina, totalItems } = locali_pagina

  const columns: ColumnsType<ilocali> = [
    {
      ellipsis: true,
      title: "Localidad",
      dataIndex: "locali_descri",
      sorter: (a, b) => a.locali_descri.length - b.locali_descri.length,
    },
    {
      title: "Estado",
      className: "text-center",
      dataIndex: "locali_status",
      sorter: (a, b) => a.locali_status - b.locali_status,
      render: (_x, record) => {
        const value_estatus = Number(record.locali_status) === 1

        const handleChecked = () => {
          const body = Object.assign({}, record)

          value_estatus ? (body.locali_status = 2) : (body.locali_status = 1)

          dispatch(put_locali({ body }))
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
          <Table<ilocali>
            bordered
            size="small"
            columns={columns}
            className="m-b-20"
            pagination={false}
            loading={loadin_loadin}
            dataSource={localis_localis}
            sortDirections={["ascend", "descend", "ascend"]}
            rowKey={(locali) => locali.locali_locali}
            locale={{
              triggerDesc: "Click para ordernar desendentemente",
              triggerAsc: "Click para ordernar asendentemente",
              emptyText: <NotData onclick={handleClickAdd} btnMssg={btnMsg} />,
            }}
          />

          {localis_localis.length > 0 && (
            <>
              <Pagination
                onChange={(pagina, limite) =>
                  dispatch(get_localis({ ...locali_pagina, pagina, limite }))
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

export default Locali
