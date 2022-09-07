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

const MataKuliah = function () {
  const [matkulTable] = useState(mock.matkuls);
  const [matkulData, setmatkulData] = useState(mock.matkuls);
  const [matkulTableCurrentPage, setSecondTableCurrentPage] = useState(0);
  const [tableDropdownOpen, setTableMenuOpen] = useState(false);

  const pageSize = 10;
  const matkulTablePagesCount = Math.ceil(matkulTable.length / pageSize);

  const setmatkulTablePage = (e, index) => {
    e.preventDefault();
    setSecondTableCurrentPage(index);
  };

  const matkulMenuOpen = (id) => {
    setmatkulData(
      matkulData.map((item) => {
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

  const columns = ["Nama Matkul"];

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">Daftar Mata Kuliah</div>
                  <div className="d-flex">
                    <Link to="mata-kuliah/create-matkul">
                      <Button className="rounded-pill mr-3" color="primary">
                        Tambah Matkul
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
                      {matkulData
                        .slice(
                          matkulTableCurrentPage * pageSize,
                          (matkulTableCurrentPage + 1) * pageSize
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
                            <td>
                              <Dropdown
                                className="d-none d-sm-block"
                                nav
                                isOpen={item.dropdownOpen}
                                toggle={() => matkulMenuOpen(item.id)}
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
                                      to={`mata-kuliah/edit-matkul/${item.id}`}
                                    >
                                      <div>Edit</div>
                                    </Link>
                                  </DropdownItem>
                                  <DropdownItem>
                                    <Link
                                      to={`mata-kuliah/delete-matkul/${item.id}`}
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
                    <PaginationItem disabled={matkulTableCurrentPage <= 0}>
                      <PaginationLink
                        onClick={(e) =>
                          setmatkulTablePage(e, matkulTableCurrentPage - 1)
                        }
                        previous
                        href="#top"
                      />
                    </PaginationItem>
                    {[...Array(matkulTablePagesCount)].map((page, i) => (
                      <PaginationItem
                        active={i === matkulTableCurrentPage}
                        key={i}
                      >
                        <PaginationLink
                          onClick={(e) => setmatkulTablePage(e, i)}
                          href="#top"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem
                      disabled={
                        matkulTableCurrentPage >= matkulTablePagesCount - 1
                      }
                    >
                      <PaginationLink
                        onClick={(e) =>
                          setmatkulTablePage(e, matkulTableCurrentPage + 1)
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

export default MataKuliah;
