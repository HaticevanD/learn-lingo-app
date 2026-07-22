import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Modal from "../Modal/Modal";
import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";
import TrialLessonForm from "../Forms/TrialLessonForm/TrialLessonForm";

import styles from "./Layout.module.css";

function Layout() {
  const [modalType, setModalType] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const openLoginModal = () => {
    setModalType("login");
  };

  const openRegistrationModal = () => {
    setModalType("registration");
  };

  const openTrialLessonModal = (teacher) => {
    setSelectedTeacher(teacher);
    setModalType("trial");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedTeacher(null);
  };

  return (
    <div className={styles.page}>
      <Header
        onLoginClick={openLoginModal}
        onRegistrationClick={openRegistrationModal}
      />

      <main className={styles.main}>
        <Outlet
          context={{
            openTrialLessonModal,
          }}
        />
      </main>

      <Modal
        isOpen={modalType !== null}
        onClose={closeModal}
        contentClassName={modalType === "trial" ? styles.trialLessonModal : ""}
      >
        {modalType === "login" && <LoginForm onSuccess={closeModal} />}

        {modalType === "registration" && (
          <RegisterForm onSuccess={closeModal} />
        )}

        {modalType === "trial" && selectedTeacher && (
          <TrialLessonForm teacher={selectedTeacher} onSuccess={closeModal} />
        )}
      </Modal>
    </div>
  );
}

export default Layout;
