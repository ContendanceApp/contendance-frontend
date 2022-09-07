import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge,
  Button,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import moreIcon from "../../assets/tables/moreIcon.svg";

import s from "../components/Tables.module.scss";
import mock from "../components/mock.jsx";
import { Link } from "react-router-dom";

const Mahasiswa = function () {
  const [mahasiswaTable] = useState(mock.mahasiswa);
  const [mahasiswaData, setmahasiswaData] = useState(mock.mahasiswa);
  const [mahasiswaTableCurrentPage, setSecondTableCurrentPage] = useState(0);
  const [tableDropdownOpen, setTableMenuOpen] = useState(false);

  const pageSize = 10;
  const mahasiswaTablePagesCount = Math.ceil(mahasiswaTable.length / pageSize);

  const setmahasiswaTablePage = (e, index) => {
    e.preventDefault();
    setSecondTableCurrentPage(index);
  };

  const mahasiswaMenuOpen = (id) => {
    setmahasiswaData(
      mahasiswaData.map((item) => {
        if (item.id === id) {
          item.dropdownOpen = !item.dropdownOpen;
        }
        return item;
      })
    );
  };

  const tableMenuOpen = () => {
    setTableMenuOpen(!tableDropdownOpen);
  };

  const columns = ["Nama Mahasiswa", "NRP", "Email"];

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">Daftar Mahasiswa</div>
                  <div className="d-flex">
                    <Link to="mahasiswa/create-mahasiswa">
                      <Button className="rounded-pill mr-3" color="primary">
                        Tambah Mahasiswa
                      </Button>
                    </Link>
                    {/* <Dropdown
                      className="d-none d-sm-block"
                      nav
                      isOpen={tableDropdownOpen}
                      toggle={() => tableMenuOpen()}
                    >
                      <DropdownToggle nav>
                        <img
                          className="d-none d-sm-block"
                          src={moreIcon}
                          alt="More..."
                        />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <div>Copy</div>
                        </DropdownItem>
                        <DropdownItem>
                          <div>Edit</div>
                        </DropdownItem>
                        <DropdownItem>
                          <div>Delete</div>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown> */}
                  </div>
                </div>
                <div className="widget-table-overflow">
                  <Table
                    className="table-striped table-borderless table-hover"
                    responsive
                  >
                    <thead>
                      <tr>
                        <th>
                          <div className="checkbox checkbox-primary">
                            <input
                              id="checkbox200"
                              className="styled"
                              type="checkbox"
                            />
                            <label htmlFor="checkbox200" />
                          </div>
                        </th>
                        {columns.map((col, index) => (
                          <th key={index}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mahasiswaData
                        .slice(
                          mahasiswaTableCurrentPage * pageSize,
                          (mahasiswaTableCurrentPage + 1) * pageSize
                        )
                        .map((item) => (
                          <tr key={uuidv4()}>
                            <td>
                              <div className="checkbox checkbox-primary">
                                <input
                                  id={item.id}
                                  className="styled"
                                  type="checkbox"
                                />
                                <label />
                              </div>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.nrp}</td>
                            <td>{item.email}</td>
                            <td>
                              <Dropdown
                                className="d-none d-sm-block"
                                nav
                                isOpen={item.dropdownOpen}
                                toggle={() => mahasiswaMenuOpen(item.id)}
                              >
                                <DropdownToggle nav>
                                  <img
                                    className="d-none d-sm-block"
                                    src={moreIcon}
                                    alt="More ..."
                                  />
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem>
                                    <Link
                                      to={`mahasiswa/edit-mahasiswa/${item.id}`}
                                    >
                                      <div>Edit</div>
                                    </Link>
                                  </DropdownItem>
                                  <DropdownItem>
                                    <Link
                                      to={`mahasiswa/delete-mahasiswa/${item.id}`}
                                      className="secondary-red"
                                    >
                                      <div className="secondary-red">
                                        Delete
                                      </div>
                                    </Link>
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Pagination className="pagination-with-border">
                    <PaginationItem disabled={mahasiswaTableCurrentPage <= 0}>
                      <PaginationLink
                        onClick={(e) =>
                          setmahasiswaTablePage(
                            e,
                            mahasiswaTableCurrentPage - 1
                          )
                        }
                        previous
                        href="#top"
                      />
                    </PaginationItem>
                    {[...Array(mahasiswaTablePagesCount)].map((page, i) => (
                      <PaginationItem
                        active={i === mahasiswaTableCurrentPage}
                        key={i}
                      >
                        <PaginationLink
                          onClick={(e) => setmahasiswaTablePage(e, i)}
                          href="#top"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem
                      disabled={
                        mahasiswaTableCurrentPage >=
                        mahasiswaTablePagesCount - 1
                      }
                    >
                      <PaginationLink
                        onClick={(e) =>
                          setmahasiswaTablePage(
                            e,
                            mahasiswaTableCurrentPage + 1
                          )
                        }
                        next
                        href="#top"
                      />
                    </PaginationItem>
                  </Pagination>
                </div>
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Mahasiswa;
