import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { set_form_ingcaj } from "../../../reducers/ingcaj"
import { get_ingcajs } from "../../../controllers/ingcaj"
import { ColumnsType, Pagination, Table } from "../../../components/iu"
import { NotData } from "../../../components/views"
import { iingcaj } from "../../../interfaces"

interface iincaco {
  handleClickAdd: () => void
  btnMsg: string
}

const IngCaj = ({ handleClickAdd, btnMsg }: iincaco) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loadin_loadin, ingcajs_ingcajs, ingcaj_pagina } = useAppSelector(
    (state) => state.ingcaj,
  )

  const handleEdita = (ingcaj: iingcaj) => {
    dispatch(set_form_ingcaj(ingcaj))
    navigate(`edit/${ingcaj.ingcaj_ingcaj}`)
  }

  const { limite, pagina, totalItems } = ingcaj_pagina

  const columns: ColumnsType<iingcaj> = [
    {
      className: "py-1",
      title: "N°. Ingreso",
      dataIndex: "ingcaj_ingcaj",
      sorter: (a, b) => a.ingcaj_ingcaj - b.ingcaj_ingcaj,
    },
    {
      className: "py-1",
      title: "Fec. Ingreso",
      dataIndex: "ingcaj_fecing",
      sorter: (a, b) => a.ingcaj_fecing.length - b.ingcaj_fecing.length,
    },
    {
      className: "py-1",
      title: "Transferencia",
      dataIndex: "ingcaj_titrde",
      sorter: (a, b) => a.ingcaj_titrde.length - b.ingcaj_titrde.length,
    },
    {
      className: "py-1",
      title: "Egreso",
      dataIndex: "ingcaj_numegr",
      sorter: (a, b) => a.ingcaj_numegr - b.ingcaj_numegr,
    },
    {
      title: "Estado",
      className: "text-center py-1",
      dataIndex: "ingcaj_status",
      sorter: (a, b) => a.ingcaj_status.length - b.ingcaj_status.length,
      render: (_x, record) => (
        <span className={`badge badge-${record.ingcaj_colsta}`}>
          {record.ingcaj_status}
        </span>
      ),
    },
    {
      title: "Acciones",
      className: "text-center py-1",
      render: (_, record) => (
        <>
          <button
            className="btn btn-sm btn-success m-r-5"
            onClick={() => handleEdita(record)}
          >
            <i className="fa fa-edit" />
          </button>
        </>
      ),
    },
  ]

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Table<iingcaj>
            bordered
            size="small"
            columns={columns}
            className="m-b-20"
            pagination={false}
            loading={loadin_loadin}
            dataSource={ingcajs_ingcajs}
            sortDirections={["ascend", "descend", "ascend"]}
            rowKey={(ingcaj) => ingcaj.ingcaj_ingcaj}
            locale={{
              triggerDesc: "Click para ordernar desendentemente",
              triggerAsc: "Click para ordernar asendentemente",
              emptyText: <NotData onclick={handleClickAdd} btnMssg={btnMsg} />,
            }}
          />

          {ingcajs_ingcajs.length > 0 && (
            <>
              <Pagination
                onChange={(pagina, limite) =>
                  dispatch(get_ingcajs({ ...ingcaj_pagina, pagina, limite }))
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

export default IngCaj
