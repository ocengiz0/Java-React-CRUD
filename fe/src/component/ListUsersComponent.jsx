import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store/modules';
import { Drawer, Icon, Col, Row, Select, DatePicker, Divider, Table, Input, InputNumber, Button, Popconfirm, Form } from 'antd';
import moment from 'moment'

const dateFormat = 'DD/MM/YYYY';
const Search = Input.Search;

const EditableContext = React.createContext();

// Editable cell component for in-row editing
class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'Date') {
            return <DatePicker
                style={{ width: '100%' }}
                getPopupContainer={trigger => trigger.parentNode}
                format={dateFormat}
            />;
        }
        else if (this.props.inputType === 'TextArea') {
            return <Input.TextArea />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            rules,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: rules,
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class ListUsersComponent extends Component {
    constructor(props) {
        super(props)

        // Define column structure for And design table
        this.columns = [
            {
                title: 'First Name',
                dataIndex: 'firstName',
                sorter: (a, b) => a.firstName.length - b.firstName.length,
                editable: true,
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                sorter: (a, b) => a.lastName.length - b.lastName.length,
                editable: true,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                sorter: (a, b) => a.email.length - b.email.length,
                editable: true,
            },
            {
                title: 'Date of Birth',
                dataIndex: 'dateOfBirth',
                render: (text, record) => {
                    return record.dateOfBirth && moment(record.dateOfBirth, 'YYYY/MM/DD').format('DD/MM/YYYY')
                },
                sorter: (a, b) => a.dateOfBirth && a.dateOfBirth.length - b.dateOfBirth && b.dateOfBirth.length,
                editable: true,
                inputType: 'Date'
            },
            {
                title: 'Address',
                dataIndex: 'address',
                sorter: (a, b) => a.address && a.address.length - b.address && b.address.length,
                editable: true,
                inputType: 'TextArea'
            },
            {
                title: 'Actions',
                dataIndex: '',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {form => (
                                    <a
                                        href="javascript:;"
                                        onClick={() => this.save(form, record.id)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Save
                            </a>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancelEdit()}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    ) : (
                            <>
                                <a href="javascript:;" onClick={() => this.edit(record.id)}>
                                    Edit
                                </a>
                                <Divider type="vertical" />
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                                    <a href="javascript:;">Delete</a>
                                </Popconfirm>
                            </>
                        );
                },
            }
        ];

        this.state = {
            users: [],
            usersFiltered: [],
            message: null,
            editing: false,
            drawerVisible: false
        }
    }

    componentDidMount() {
        this.fetch();
        this.setState({ usersFiltered: this.state.users });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.dispatch(actions.users.addUser(values)).then(result => {
                    if (result) {
                        this.fetch();
                        this.props.form.resetFields();
                    }
                });
            }
        });
    };

    fetch() {
        this.props.dispatch(actions.users.getUserList()).then(result => {
            this.setState({
                users: result,
                usersFiltered: result
            });
            this.onDrawerClose();
        });
    };

    handleDelete = id => {
        const users = [...this.state.users];
        this.props.dispatch(actions.users.deleteUser(id)).then(result => {
            this.setState({ users: users.filter(user => user.id !== id) })
        });
    };

    showDrawer = () => {
        this.setState({
            drawerVisible: true,
        });
    };

    onDrawerClose = () => {
        this.setState({
            drawerVisible: false,
        });
    };

    isEditing = record => record.id === this.state.editingKey;

    cancelEdit = () => {
        this.setState({ editingKey: '' });
    };

    save(form, id) {
        form.validateFields((error, values) => {
            if (error) {
                return;
            }
            this.props.dispatch(actions.users.updateUser(id, values)).then(result => {
                if (result) {
                    this.fetch();
                    this.cancelEdit();
                }
            });
        });
    }

    edit(id) {
        this.setState({ editingKey: id });
    }

    handleSearchChange = value => {
        const queryText = value.target.value.toLowerCase();
        this.setState({
            usersFiltered: this.state.users.filter(user =>
                user.firstName.toLowerCase().includes(queryText) ||
                user.lastName.toLowerCase().includes(queryText) ||
                user.email.toLowerCase().includes(queryText) ||
                user.address.toLowerCase().includes(queryText))
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.inputType,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <div>
                <div>
                    <Button type="primary" onClick={this.showDrawer}>
                        <Icon type="plus" /> Add User
                    </Button>
                    <Search
                        className="search-box"
                        placeholder="Search Users"
                        onChange={this.handleSearchChange}
                        onSearch={value => console.log(value)}
                        style={{ width: 200, marginLeft: 30 }}
                    />
                </div>
                <Divider type="horizontal" />
                <Drawer
                    title="Create a new user"
                    width={720}
                    onClose={this.onDrawerClose}
                    visible={this.state.drawerVisible}
                >
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="First Name">
                                    {getFieldDecorator('firstName', {
                                        rules: [{ required: true, message: 'Please enter first name' }],
                                    })(<Input placeholder="Please enter first name" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Last Name">
                                    {getFieldDecorator('lastName', {
                                        rules: [{ required: true, message: 'Please enter last name' }],
                                    })(<Input placeholder="Please enter last name" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Email">
                                    {getFieldDecorator('email', {
                                        rules: [{ required: true, message: 'Please enter email' }],
                                    })(<Input placeholder="Please enter email" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Date of Birth">
                                    {getFieldDecorator('dateOfBirth')(
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            getPopupContainer={trigger => trigger.parentNode}
                                            format={dateFormat}
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="Address">
                                    {getFieldDecorator('address')
                                        (<Input.TextArea rows={4} placeholder="please enter url description" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onDrawerClose} style={{ marginRight: 8 }}>
                            Cancel
                         </Button>
                        <Button onClick={this.handleSubmit} type="primary">
                            Submit
                        </Button>
                    </div>
                </Drawer>
                <EditableContext.Provider value={this.props.form}>
                    <Table
                        components={components}
                        pagination={false}
                        columns={columns}
                        rowClassName="editable-row"
                        rowKey={record => record.id}
                        dataSource={this.state.usersFiltered}
                    />
                </EditableContext.Provider>
            </div>
        )
    }
}

const WrappedApp = Form.create()(ListUsersComponent);

export default connect()(WrappedApp);