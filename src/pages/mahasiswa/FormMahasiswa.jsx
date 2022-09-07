import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import { useParams } from "react-router";

import s from "../components/Tables.module.scss";
import mock from "../components/mock.jsx";

const FormMahasiswa = function () {
  let { id } = useParams(); //ngambil id dari url
  id = parseInt(id); //mengubah tipe data string jadi integer
  const [mahasiswaData] = useState(mock.mahasiswa); //ngambil data dari file mock.jsx
  const [oldData, setOldData] = useState(); //variabel untuk menyimpan data lama (jika dalam mode edit)

  useEffect(() => {
    if (id) {
      mahasiswaData.map((item) => {
        if (item.id === id) {
          setOldData(item);
        }
      });
    }
  }, []); //mengecek update data tanpa me refresh

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">
                    {id ? "Update mahasiswa" : "Tambah mahasiswa"}
                  </div>
                </div>
                <form
                  onSubmit={() => {
                    console.log("submitted");
                  }}
                >
                  <div className="px-4">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control py-4"
                        placeholder="Tambah Mahasiswa"
                        aria-label="tambah-mahasiswa"
                        defaultValue={oldData?.name}
                      />
                    </div>
                    <Button
                      className="rounded-pill float-right mt-3 mb-4"
                      color="primary"
                    >
                      {id ? "Update mahasiswa" : "Tambah mahasiswa"}
                    </Button>
                  </div>
                </form>
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default FormMahasiswa;
