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

const Presensi = function () {
  const [presensiTable] = useState(mock.presensi);
  const [presensiData, setpresensiData] = useState(mock.presensi);
  const [presensiTableCurrentPage, setSecondTableCurrentPage] = useState(0);
  const [tableDropdownOpen, setTableMenuOpen] = useState(false);

  const pageSize = 10;
  const presensiTablePagesCount = Math.ceil(presensiTable.length / pageSize);

  const setpresensiTablePage = (e, index) => {
    e.preventDefault();
    setSecondTableCurrentPage(index);
  };

  const presensiMenuOpen = (id) => {
    setpresensiData(
      presensiData.map((item) => {
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

  const columns = ["NRP", "Nama Presensi", "Waktu", "Mata Kuliah"];

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">Daftar Presensi</div>
                  <div className="d-flex">
                    <Link to="presensi/create-presensi">
                      <Button className="rounded-pill mr-3" color="primary">
                        Tambah Presensi
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
                      {presensiData
                        .slice(
                          presensiTableCurrentPage * pageSize,
                          (presensiTableCurrentPage + 1) * pageSize
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
                            <td>{item.nrp}</td>
                            <td>{item.name}</td>
                            <td>{item.waktu}</td>
                            <td>{item.matkul}</td>
                            <td>
                              <Dropdown
                                className="d-none d-sm-block"
                                nav
                                isOpen={item.dropdownOpen}
                                toggle={() => presensiMenuOpen(item.id)}
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
                                      to={`presensi/edit-presensi/${item.id}`}
                                    >
                                      <div>Edit</div>
                                    </Link>
                                  </DropdownItem>
                                  <DropdownItem>
                                    <Link
                                      to={`presensi/delete-presensi/${item.id}`}
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
                    <PaginationItem disabled={presensiTableCurrentPage <= 0}>
                      <PaginationLink
                        onClick={(e) =>
                          setpresensiTablePage(e, presensiTableCurrentPage - 1)
                        }
                        previous
                        href="#top"
                      />
                    </PaginationItem>
                    {[...Array(presensiTablePagesCount)].map((page, i) => (
                      <PaginationItem
                        active={i === presensiTableCurrentPage}
                        key={i}
                      >
                        <PaginationLink
                          onClick={(e) => setpresensiTablePage(e, i)}
                          href="#top"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem
                      disabled={
                        presensiTableCurrentPage >= presensiTablePagesCount - 1
                      }
                    >
                      <PaginationLink
                        onClick={(e) =>
                          setpresensiTablePage(e, presensiTableCurrentPage + 1)
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

export default Presensi;
