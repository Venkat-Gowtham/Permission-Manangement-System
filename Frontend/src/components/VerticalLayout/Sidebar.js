import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"
import avatar2 from "../../assets/images/users/image.png"

const Sidebar = props => {
  const [users, setUsers] = useState(null);
    
  useEffect(() => {
    // Retrieve user data from localStorage
    const userDataFromLocalStorage = JSON.parse(localStorage.getItem('authUser'))[0];
    console.log(userDataFromLocalStorage)

    // Update the state with the retrieved data
    setUsers(userDataFromLocalStorage);
  }, [users]);

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="h-100">
          <div className="user-wid text-center py-4">
            <div className="user-img">
              <img src={avatar2} alt="" className="avatar-md mx-auto rounded-circle" />
            </div>

            {users && (
              <div className="mt-3">
                <Link to="#" className="text-dark fw-medium font-size-16">{users.TrainerName}</Link>
                <p className="text-body mt-1 mb-0 font-size-13">FUll Stack Developer</p>
              </div>
            )}
          </div>
          <div data-simplebar className="h-100">
            {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(
  mapStateToProps,
  {}
)(withRouter(withTranslation()(Sidebar)))
