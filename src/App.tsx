import "./styles.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";

import { Dialog } from "primereact/dialog";
import { ProductService } from "../src/service/ProductService";
import { classNames } from "primereact/utils";
export default function App() {
  let emptyProduct = {
    mezunUlkeId: "",
    mezunFakulteId: "",
    mezunUniversiteId: "",
    diplomaTarih: "",
    mezunBransId: "",
    mezunBolumId: "",
    mezunTipId: "",
    diplomaNumarasi: "",
    saglikbakTescilNumarasi: "",
    mezuniyetTarihi: "",
    diplomaDosyaAdres: ""
  };

  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const toast = useRef(null as any);
  const dt = useRef(null);
  const productService = new ProductService();

  useEffect(() => {
    productService.getProducts().then((data) => setProducts(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.mezunUlkeId.trim()) {
      let _products = [...products];
      let _product = { ...product };
      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000
        });
      } else {
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };
  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );

  const date = [
    { label: "	2022-03-25", value: "	2022-03-25" },
    { label: "	2022-05-25", value: "	2022-05-25" }
  ];
  const fakulte = [
    {
      label: "Teknoloji Fakultesi",
      value: "83d219d2-1ad7-4373-b86a-76b5a0c41625"
    },
    {
      label: "Muhendislik Fakultesi",
      value: "0edb02b4-ef88-4655-ae5d-0d776ddb4d14"
    }
  ];

  const ulke = [
    { label: "Türkiye", value: "d3f9f72a-bb15-4080-85fc-26df8e2c835c" },
    { label: "Rusya", value: "e3f9f72a-bb15-4080-85fc-26df8e2c835c" }
  ];
  const universite = [
    {
      label: "Selçuk Üniversitesi",
      value: "01cb9de9-e906-445c-8950-189d9e82524e"
    },
    { label: "KTUN", value: "7c6332c2-3467-4707-b2b8-dffe47706104" }
  ];
  const brans = [
    {
      label: "brans2",
      value: "4afaf71f-b3b4-4899-8eaf-8fa1e426fa82"
    },
    { label: "brans1", value: "546fa8cf-a7bd-4cf7-bd8e-9eb66421b12e" }
  ];
  const bolum = [
    {
      label: "Bilgisayar Mühendisliği",
      value: "5036b66a-1f76-4ee7-aebb-615497fa9136"
    },
    {
      label: "Elektrik-Elektronik Mühendisliği",
      value: "0023101d-8234-4564-9ce6-96da4caa794b"
    }
  ];
  const mezunTip = [
    {
      label: "Lisans",
      value: "d1be2e9c-9d4c-4ccf-a799-d1ed6202029b"
    },
    {
      label: "Önlisans",
      value: "ed373ed2-d929-4bcf-be3a-18f69c85f70d"
    }
  ];
  console.log(products, "veri");
  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
        {productDialog && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: " 1fr 1fr 1fr",
              gridTemplateRows: "1fr ",
              gap: "1vw"
            }}
          >
            <div className="field">
              <label htmlFor="mezunUlkeId">Mezun Ulke</label>
              <Dropdown
                value={product.mezunUlkeId}
                options={ulke}
                onChange={(e) => onInputChange(e, "mezunUlkeId")}
                optionLabel="label"
                placeholder="Select a mezun ulke"
              />
            </div>
            <div className="field">
              <label htmlFor="mezunFakulteId">Mezun Fakulte</label>
              <Dropdown
                value={product.mezunFakulteId}
                options={fakulte}
                onChange={(e) => onInputChange(e, "mezunFakulteId")}
                optionLabel="label"
                placeholder="Select a mezun fakulte"
              />
            </div>

            <div className="field">
              <label htmlFor="mezunUniversiteId">Mezun Universite</label>
              <Dropdown
                value={product.mezunUniversiteId}
                options={universite}
                onChange={(e) => onInputChange(e, "mezunUniversiteId")}
                optionLabel="label"
                placeholder="Select a mezun universite"
              />
            </div>
            <div className="field">
              <label htmlFor="mezunBransId">Mezun Brans</label>
              <Dropdown
                value={product.mezunBransId}
                options={brans}
                onChange={(e) => onInputChange(e, "mezunBransId")}
                optionLabel="label"
                placeholder="Select a mezun brans"
              />
            </div>
            <div className="field">
              <label htmlFor="mezunBolumId">Mezun Bölüm</label>
              <Dropdown
                value={product.mezunBolumId}
                options={bolum}
                onChange={(e) => onInputChange(e, "mezunBolumId")}
                optionLabel="label"
                placeholder="Select a mezun bölum"
              />
            </div>
            <div className="field">
              <label htmlFor="mezunTipId">Mezun Tip</label>
              <Dropdown
                value={product.mezunTipId}
                options={mezunTip}
                onChange={(e) => onInputChange(e, "mezunTipId")}
                optionLabel="label"
                placeholder="Select a mezun tip"
              />
            </div>

            <div className="field">
              <label htmlFor="diplomaTarih">diplomaTarih</label>
              <Dropdown
                value={product.diplomaTarih}
                options={date}
                onChange={(e) => onInputChange(e, "diplomaTarih")}
                optionLabel="label"
                placeholder="Select a diplomaTarih"
              />
            </div>

            <div className="field">
              <label htmlFor="diplomaNumarasi">Diploma Numarasi</label>
              <InputText
                id="diplomaNumarasi"
                value={product.diplomaNumarasi}
                onChange={(e) => onInputChange(e, "diplomaNumarasi")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !product.diplomaNumarasi
                })}
              />
              {submitted && !product.diplomaNumarasi && (
                <small className="p-error">diplomaNumarasi is required.</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="saglikbakTescilNumarasi">
                saglikbakTescilNumarasi
              </label>
              <InputText
                id="saglikbakTescilNumarasi"
                value={product.saglikbakTescilNumarasi}
                onChange={(e) => onInputChange(e, "saglikbakTescilNumarasi")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !product.saglikbakTescilNumarasi
                })}
              />
              {submitted && !product.saglikbakTescilNumarasi && (
                <small className="p-error">
                  saglikbakTescilNumarasi is required.
                </small>
              )}
            </div>
            <div className="field">
              <label htmlFor="mezuniyetTarihi">Mezuniyet Tarihi</label>
              <Dropdown
                value={product.mezuniyetTarihi}
                options={date}
                onChange={(e) => onInputChange(e, "mezuniyetTarihi")}
                optionLabel="label"
                placeholder="Select a mezuniyetTarihi"
              />
            </div>

            <div className="field">
              <label htmlFor="diplomaDosyaAdres">diplomaDosyaAdres</label>
              <InputText
                id="diplomaDosyaAdres"
                value={product.diplomaDosyaAdres}
                onChange={(e) => onInputChange(e, "diplomaDosyaAdres")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !product.diplomaDosyaAdres
                })}
              />
              {submitted && !product.diplomaDosyaAdres && (
                <small className="p-error">
                  diplomaDosyaAdres is required.
                </small>
              )}
            </div>
          </div>
        )}
        <DataTable
          ref={dt}
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          paginator
          rows={10}
          responsiveLayout="scroll"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          <Column
            field="mezunUlkeId"
            header="Mezun Ulke "
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="mezunFakulteId"
            header="Mezun Fakulte "
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="mezunUniversiteId"
            header="Mezun Universite "
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="mezunBransId"
            header="Mezun Brans "
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="mezunBolumId"
            header="Mezun Bolum "
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="mezunTipId"
            header="Mezun Tip "
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>

          <Column
            field="diplomaTarih"
            header="Diploma Tarih"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="diplomaNumarasi"
            header="Diploma Numarası"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="saglikbakTescilNumarasi"
            header="Saglik bak Tescil Numarasi"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="mezuniyetTarihi"
            header="Mezuniyet Tarih"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="diplomaDosyaAdres"
            header="Diploma Dosya Adres"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
