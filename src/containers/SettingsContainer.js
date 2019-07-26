import { connect } from "react-redux"
import SettingsPage from "../components/pages/SettingsPage"
import {
  listUsersStartEvent,
  createUserStartEvent,
  updateUserStartEvent,
  deleteUserStartEvent,
  listBoardsStartEvent,
  createBoardStartEvent,
  updateBoardStartEvent,
  deleteBoardStartEvent,
  changeBoardOrderStartEvent,
} from "../actions"

const mapStateToProps = (state) => ({
  settingsState: state.settingsState,
  boardsState: state.boardsState,
  usersState: state.usersState,
})

const mapDispatchToProps = (dispatch) => ({
  loadUserList() {
    dispatch(listUsersStartEvent())
  },
  onCreateUserButtonClick(userCreateRequest) {
    dispatch(createUserStartEvent(userCreateRequest))
  },
  onUpdateUserButtonClick(user) {
    dispatch(updateUserStartEvent(user))
  },
  onDeleteUserButtonClick(user) {
    dispatch(deleteUserStartEvent(user))
  },
  loadBoardList() {
    dispatch(listBoardsStartEvent())
  },
  onCreateBoardButtonClick(boardCreateRequest) {
    dispatch(createBoardStartEvent(boardCreateRequest))
  },
  onUpdateBoardButtonClick(board) {
    dispatch(updateBoardStartEvent(board))
  },
  onDeleteBoardButtonClick(board) {
    dispatch(deleteBoardStartEvent(board))
  },
  changeBoardOrderLinkClick(boards) {
    dispatch(changeBoardOrderStartEvent(boards))
  },
})

const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsPage)

export default SettingsContainer
