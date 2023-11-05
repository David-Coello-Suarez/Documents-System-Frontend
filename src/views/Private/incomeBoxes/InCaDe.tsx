import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { delete_incade, get_incade } from "../../../controllers/ingcaj"
import { clean_ingcajs, set_form_ingcaj } from "../../../reducers/ingcaj"
import { iingcaj } from "../../../interfaces"
import { ColumnsType, Table } from "../../../components/iu"

const InCaDe = () => {
  const dispatch = useAppDispatch()

  const { ingcajs_ingcajs, incaj_ingcaj, loadin_loadin } = useAppSelector(
    (state) => state.ingcaj,
  )

  useEffect(() => {
    if (incaj_ingcaj.ingcaj_ingcaj) {
      dispatch(get_incade(incaj_ingcaj.ingcaj_ingcaj))
    }

    return () => {
      dispatch(clean_ingcajs())
    }
  }, [dispatch, incaj_ingcaj.ingcaj_ingcaj])

  const handleEdita = (ingcaj: iingcaj) => {
    dispatch(set_form_ingcaj(ingcaj))
  }

  const handleDelete = (body: iingcaj) => {
    dispatch(delete_incade({ body }))
  }

  const columns: ColumnsType<iingcaj> = [
    {
      className: "py-1",
      title: "Tipo Doc.",
      dataIndex: "tipdoc_descri",
      sorter: (a, b) => a.tipdoc_descri.length - b.tipdoc_descri.length,
    },
    {
      className: "py-1",
      title: "Cod. Caja",
      dataIndex: "ingcaj_codcaj",
      sorter: (a, b) => a.ingcaj_codcaj.length - b.ingcaj_codcaj.length,
    },
    {
      className: "py-1",
      title: "Cod. RFID",
      dataIndex: "ingcaj_codrfi",
      sorter: (a, b) => a.ingcaj_codrfi.length - b.ingcaj_codrfi.length,
    },
    {
      title: "AÑO",
      className: "text-center py-1",
      dataIndex: "ingcaj_anioxx",
      sorter: (a, b) => a.ingcaj_anioxx - b.ingcaj_anioxx,
    },
    {
      title: "Sub Serie",
      className: "text-center py-1",
      dataIndex: "subser_nombre",
      sorter: (a, b) => a.subser_nombre.length - b.subser_nombre.length,
    },
    {
      title: "Ubicación",
      className: "text-center py-1",
      dataIndex: "ubicac_descri",
      sorter: (a, b) => a.ubicac_descri.length - b.ubicac_descri.length,
    },
    {
      title: "División",
      className: "text-center py-1",
      dataIndex: "ingcaj_numdiv",
      sorter: (a, b) => a.ingcaj_numdiv.length - b.ingcaj_numdiv.length,
    },
    {
      title: "Serie",
      className: "text-center py-1",
      dataIndex: "ingcaj_serref",
      sorter: (a, b) => a.ingcaj_serref.length - b.ingcaj_serref.length,
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
          <button
            className="btn btn-sm btn-outline-danger m-r-5"
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
              //   emptyText: <NotData onclick={handleClickAdd} btnMssg={btnMsg} />,
            }}
          />
        </div>
      </div>
    </>
  )
}

export default InCaDe
