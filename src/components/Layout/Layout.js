// -- React and related libs
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";

// -- Third Party Libs
import PropTypes from "prop-types";

// -- Custom Components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Breadcrumbs from "../Breadbrumbs/Breadcrumbs";
import Dashboard from "../../pages/dashboard/Dashboard";
import Typography from "../../pages/typography/Typography";
import Notifications from "../../pages/notifications/Notifications";
import Tables from "../../pages/tables/Tables";
import Charts from "../../pages/uielements/charts/Charts";
import Icons from "../../pages/uielements/icons/IconsPage";
import Maps from "../../pages/uielements/maps/google/GoogleMapPage";
import Beacons from "../../pages/beacons/Beacons";

// -- Component Styles
import s from "./Layout.module.scss";
import Rooms from "../../pages/rooms/Rooms";
import CreateRoom from "../../pages/rooms/FormRoom";
import FormBeacon from "../../pages/beacons/FormBeacon";
import FormRoom from "../../pages/rooms/FormRoom";
import MataKuliah from "../../pages/matakuliah/MataKuliah";
import FormMataKuliah from "../../pages/matakuliah/FormMataKuliah";
import Dosen from "../../pages/dosen/Dosen";
import FormDosen from "../../pages/dosen/FormDosen";
import Mahasiswa from "../../pages/mahasiswa/Mahasiswa";
import FormMahasiswa from "../../pages/mahasiswa/FormMahasiswa";
import Presensi from "../../pages/presensi/Presensi";
import FormPresensi from "../../pages/presensi/FormPresensi";

const Layout = (props) => {
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <Header />
        <Sidebar />
        <main className={s.content}>
          <Breadcrumbs url={props.location.pathname} />
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />

            {/* Beacon Routes */}
            <Route path="/dashboard/beacons" exact component={Beacons} />
            <Route
              path="/dashboard/beacons/create-beacon"
              exact
              component={FormBeacon}
            />
            <Route
              path="/dashboard/beacons/edit-beacon/:id"
              exact
              component={FormBeacon}
            />
            <Route
              path="/dashboard/beacons/delete-beacon/:id"
              exact
              render={() => <Redirect to="/error" />}
            />

            {/* Room Routes */}
            <Route path="/dashboard/rooms" exact component={Rooms} />
            <Route
              path="/dashboard/rooms/create-room"
              exact
              component={FormRoom}
            />
            <Route
              path="/dashboard/rooms/edit-room/:id"
              exact
              component={FormRoom}
            />
            <Route
              path="/dashboard/beacons/delete-room/:id"
              exact
              render={() => <Redirect to="/error" />}
            />

            {/* Pengguna Routes */}
            <Route path="/dashboard/dosen" exact component={Dosen} />
            <Route
              path="/dashboard/dosen/create-dosen"
              exact
              component={FormDosen}
            />
            <Route
              path="/dashboard/dosen/edit-dosen/:id"
              exact
              component={FormDosen}
            />
            <Route
              path="/dashboard/dosen/delete-dosen/:id"
              exact
              render={() => <Redirect to="/error" />}
            />

            <Route path="/dashboard/mahasiswa" exact component={Mahasiswa} />
            <Route
              path="/dashboard/mahasiswa/create-mahasiswa"
              exact
              component={FormMahasiswa}
            />
            <Route
              path="/dashboard/mahasiswa/edit-mahasiswa/:id"
              exact
              component={FormMahasiswa}
            />
            <Route
              path="/dashboard/mahasiswa/delete-mahasiswa/:id"
              exact
              render={() => <Redirect to="/error" />}
            />

            {/* Matkul Routes */}
            <Route path="/dashboard/mata-kuliah" exact component={MataKuliah} />
            <Route
              path="/dashboard/mata-kuliah/create-matkul"
              exact
              component={FormMataKuliah}
            />
            <Route
              path="/dashboard/mata-kuliah/edit-matkul/:id"
              exact
              component={FormMataKuliah}
            />
            <Route
              path="/dashboard/mata-kuliah/delete-matkul/:id"
              exact
              render={() => <Redirect to="/error" />}
            />

            {/* Presensi Routes */}
            <Route path="/dashboard/presensi" exact component={Presensi} />
            <Route
              path="/dashboard/presensi/create-presensi"
              exact
              component={FormPresensi}
            />
            <Route
              path="/dashboard/presensi/edit-presensi/:id"
              exact
              component={FormPresensi}
            />
            <Route
              path="/dashboard/mata-kuliah/delete-matkul/:id"
              exact
              render={() => <Redirect to="/error" />}
            />

            {/* Archive Routes */}
            <Route path="/dashboard/typography" exact component={Typography} />
            <Route path="/dashboard/tables" exact component={Tables} />
            <Route
              path="/dashboard/notifications"
              exact
              component={Notifications}
            />
            <Route
              path="/dashboard/ui-elements"
              exact
              render={() => <Redirect to={"/dashboard/ui-elements/charts"} />}
            />
            <Route
              path="/dashboard/ui-elements/charts"
              exact
              component={Charts}
            />
            <Route
              path="/dashboard/ui-elements/icons"
              exact
              component={Icons}
            />
            <Route path="/dashboard/ui-elements/maps" exact component={Maps} />
            <Route path="*" exact render={() => <Redirect to="/error" />} />
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
