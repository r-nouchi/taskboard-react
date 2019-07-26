import React, { Component } from "react"
import PropTypes from "prop-types"
import { Table, Tooltip, Popconfirm } from "antd"
import I18n from "../../libs/common/i18n"
import Link from "../basics/Link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Avatar from "../basics/Avatar"
import Modal from "../basics/Modal"
import UserForm from "./UserForm"
import User from "../../libs/models/user"
import Board from "../../libs/models/board"

class SettingsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showBoardsOrderDialog: false,
      showBoardDialog: false,
      showUserDialog: false,
      selectedBoard: new Board(),
      selectedUser: new User(),
    }
    this.toggleBoardsOrderDialog = this.toggleBoardsOrderDialog.bind(this)
    this.toggleBoardDialog = this.toggleBoardDialog.bind(this)
    this.toggleUserDialog = this.toggleUserDialog.bind(this)
    this.getBoardTableColumn = this.getBoardTableColumn.bind(this)
    this.getUserTableColumns = this.getUserTableColumns.bind(this)
  }

  componentDidMount() {
    this.props.loadBoardList()
    this.props.loadUserList()
  }

  render() {
    const { boards } = this.props.boardsState
    const { users } = this.props.usersState

    return (
      <div>
        <div>
          <Table 
            rowKey={record => record.id} 
            columns={this.getBoardTableColumn()} 
            dataSource={boards} 
          />
        </div>
        <div>
          <Link text={I18n.get("ボードの表示順変更")} onClick={this.toggleBoardsOrderDialog} />
        </div>
        <div>
          <Table 
            rowKey={record => record.id}
            columns={this.getUserTableColumns()} 
            dataSource={users} 
          />
        </div>
        <Modal
          visible={this.state.showProfileDialog}
          onCancel={this.toggleProfileDialog}
          footer={null}
          destroyOnClose
          width={500}
        >
          <UserForm
            user={this.state.selectedUser}
            onSaveButtonClick={this.props.onUpdateUserButtonClick}
            isSavingProcessing={this.props.loginState.isSaveUserProcessing}
          />
        </Modal>
      </div>
    )
  }

  toggleBoardsOrderDialog() {
    this.setState({
      showBoardsOrderDialog: !this.state.showBoardsOrderDialog,
    })
  }

  toggleBoardDialog() {
    this.setState({
      showBoardDialog: !this.state.showBoardDialog,
    })
  }

  toggleUserDialog() {
    this.setState({
      showUserDialog: !this.state.showUserDialog,
    })
  }

  getBoardTableColumn() {
    return [
      {
        title: I18n.get("名前"),
        dataIndex: "name",
        key: "id",
      },
      {
        title: "Action",
        key: "action",
        render: (board) => (
          <div style={{ float: "left", display: "inline-block" }}>
            <Tooltip title={I18n.get("編集")}>
              <FontAwesomeIcon
                icon="edit"
                style={{ color: "forestgreen", marginRight: "5px" }}
                onClick={this.toggleBoardDialog}
              />
            </Tooltip>
            <Tooltip title={I18n.get("削除")}>
              <Popconfirm
                title={I18n.get("削除しますか？")}
                okText={I18n.get("削除")}
                cancelText={I18n.get("キャンセル")}
                onConfirm={() => { this.props.onDeleteBoardButtonClick(board) }}
                onCancel={() => { }}
              >
                <FontAwesomeIcon
                  icon="trash-alt"
                  style={{ color: "hotpink", marginRight: "5px" }}
                />
              </Popconfirm>
            </Tooltip>
          </div>
        ),
      },
    ]
  }

  getUserTableColumns() {
    return [
      {
        title: I18n.get("名前"),
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Avatar",
        key: "avatar",
        render: (user) => (
          <div>
            <Avatar avatar={user.avatar} size={"20px"} /> {user.avatar}
          </div>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (user) => (
          <div style={{ float: "left", display: "inline-block" }}>
            <Tooltip title={I18n.get("編集")}>
              <FontAwesomeIcon
                icon="edit"
                style={{ color: "forestgreen", marginRight: "5px" }}
                onClick={this.toggleUserDialog}
              />
            </Tooltip>
            <Tooltip title={I18n.get("削除")}>
              <Popconfirm
                title={I18n.get("削除しますか？")}
                okText={I18n.get("削除")}
                cancelText={I18n.get("キャンセル")}
                onConfirm={() => { this.props.onDeleteUserButtonClick(user) }}
                onCancel={() => { }}
              >
                <FontAwesomeIcon
                  icon="trash-alt"
                  style={{ color: "hotpink", marginRight: "5px" }}
                />
              </Popconfirm>
            </Tooltip>
          </div>
        ),
      },
    ]
  }
}

SettingsForm.propTypes = {
  loadBoardList: PropTypes.func.isRequired,
  loadUserList: PropTypes.func.isRequired,
  usersState: PropTypes.object.isRequired,
  boardsState: PropTypes.object.isRequired,
  onUpdateUserButtonClick: PropTypes.func.isRequired,
  onDeleteUserButtonClick: PropTypes.func.isRequired,
  onDeleteBoardButtonClick: PropTypes.func.isRequired,
}

export default SettingsForm
