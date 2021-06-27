//CSS
import { Form, Input, Button } from 'antd';
//REACT REDUX
import { useDispatch } from "react-redux";
import { updatePasswordAction } from '../redux/actions';

export default function ResetPWD(props) {
    const { email, setIsModalVisible } = props
    const dispatch = useDispatch();
    const [newForm] = Form.useForm();
    return (
        <>
            <Form
                onFinish={ (values) => {dispatch(updatePasswordAction(values.oldPass, values.newPass, email));setIsModalVisible(false);newForm.resetFields()} }
                form = {newForm}
            >
                <Form.Item
                    name="oldPass"
                    className="form-in"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu cũ!',
                        },
                        {
                            whitespace: false,
                            message: 'Vui lòng không dùng khoảng trắng để đặt mật khẩu!'
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Nhập mật khẩu cũ..." />
                </Form.Item>
                <Form.Item
                    name="newPass"
                    className="form-in"
                    dependencies={['oldPass']}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu mới!',
                        },
                        {
                            min: 8,
                            message: 'Mật khẩu của bạn phải dài ít nhất 8 ký tự!'
                        },
                        {
                            whitespace: false,
                            message: 'Vui lòng không dùng khoảng trắng để đặt mật khẩu!'
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('oldPass') !== value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu mới phải khác mật khẩu cũ'));
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Nhập mật khẩu mới..." />
                </Form.Item>

                <Form.Item
                    name="re-new-pass"
                    className="form-in"
                    dependencies={['new-pass']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu mới!',
                        },
                        {
                            min: 8,
                            message: 'Mật khẩu của bạn phải dài ít nhất 8 ký tự!'
                        },
                        {
                            whitespace: false,
                            message: 'Vui lòng không dùng khoảng trắng để đặt mật khẩu!'
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPass') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu bạn vừa nhập không khớp với mật khẩu trước đó!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Xác nhận mật khẩu mới..." />
                </Form.Item>
                <Form.Item>
                    <Button style={{ marginRight: '10px' }} className="btn-signin" type="primary" htmlType="submit">Đổi Mật Khẩu</Button>
                </Form.Item>
            </Form>
        </>
    )
}