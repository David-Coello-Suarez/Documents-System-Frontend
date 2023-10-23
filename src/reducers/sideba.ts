import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  sideba_sideba: [
    {
      sideba_sideba: 1,
      sideba_nombre: "Control Despacho",
      sideba_ventan: "dispatchControl",
      sideba_sidico: "fa fa-th-list",
      sideba_submen: [
        {
          sideba_sideba: 2,
          sideba_nombre: "Seguridad",
          sideba_ventan: "security",
          sideba_sidico: "",
          sideba_submen: [
            {
              sideba_sideba: 3,
              sideba_nombre: "Roles y Permisos",
              sideba_ventan: "rolesPermissions",
              sideba_sidico: "",
              sideba_submen: [],
            },
            {
              sideba_sideba: 4,
              sideba_nombre: "Perfiles",
              sideba_ventan: "profiles",
              sideba_sidico: "",
              sideba_submen: [],
            },
          ],
        },
        {
          sideba_sideba: 5,
          sideba_nombre: "Mantenimiento",
          sideba_ventan: "",
          sideba_sidico: "",
          sideba_submen: [
            {
              sideba_sideba: 6,
              sideba_nombre: "Busq. Expediente",
              sideba_ventan: "fileSearch",
              sideba_sidico: "",
              sideba_submen: [],
            },
            {
              sideba_sideba: 7,
              sideba_nombre: "Asig. Código RFID",
              sideba_ventan: "codeAssignament",
              sideba_sidico: "",
              sideba_submen: [],
            },
            {
              sideba_sideba: 8,
              sideba_nombre: "Series Faltantes",
              sideba_ventan: "missingSeries",
              sideba_sidico: "",
              sideba_submen: [],
            },
            {
              sideba_sideba: 9,
              sideba_nombre: "Clasif. Doc.",
              sideba_ventan: "",
              sideba_sidico: "",
              sideba_submen: [
                {
                  sideba_sideba: 10,
                  sideba_nombre: "Fondo Documental",
                  sideba_ventan: "documentaryBackground",
                  sideba_sidico: "",
                  sideba_submen: [],
                },
                {
                  sideba_sideba: 11,
                  sideba_nombre: "Secciones",
                  sideba_ventan: "sections",
                  sideba_sidico: "",
                  sideba_submen: [],
                },
                {
                  sideba_sideba: 12,
                  sideba_nombre: "Sub Secciones",
                  sideba_ventan: "subSections",
                  sideba_sidico: "",
                  sideba_submen: [],
                },
                {
                  sideba_sideba: 13,
                  sideba_nombre: "Series",
                  sideba_ventan: "series",
                  sideba_sidico: "",
                  sideba_submen: [],
                },
                {
                  sideba_sideba: 14,
                  sideba_nombre: "Sub Series",
                  sideba_ventan: "sbseries",
                  sideba_sidico: "",
                  sideba_submen: [],
                },
                {
                  sideba_sideba: 15,
                  sideba_nombre: "Tipo Doc",
                  sideba_ventan: "documentaryType",
                  sideba_sidico: "",
                  sideba_submen: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      sideba_sideba: 100,
      sideba_nombre: "Visor Documental",
      sideba_ventan: "documentaryViewer",
      sideba_sidico: "fa fa-share-alt",
      sideba_submen: [],
    },
  ],
}

const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {},
})

export const SidebarReducer = SidebarSlice.reducer
